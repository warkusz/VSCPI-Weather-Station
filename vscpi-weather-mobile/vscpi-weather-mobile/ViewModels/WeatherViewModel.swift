// ViewModels/WeatherViewModel.swift
// @Observable class owning all app state and service calls

import Foundation
import Observation
import SwiftUI

@Observable
class WeatherViewModel {
    var currentWeather: WeatherData? = nil
    var isConnected: Bool = false
    var detectedPort: String = ""
    var baudRate: Int = 9600
    var forecast: [ForecastDay] = []
    var history: [HistoryReading] = []
    var cityName: String = "Burgas"
    var trendHistory: [Double] = []     // last 20 tempC readings
    var lastUpdate: Date? = nil
    var sseTask: Task<Void, Never>? = nil
    var historyError: String? = nil
    var forecastError: String? = nil

    // How often the UI refreshes from the SSE stream (seconds).
    // The stream still runs continuously so the connection stays alive.
    static let updateInterval: TimeInterval = 60   // 1 minute
    private var lastUIUpdate: Date = .distantPast

    func connect() {
        sseTask?.cancel()
        sseTask = Task {
            for await event in SSEClient.stream(path: "/api/serial") {
                if Task.isCancelled { break }
                self.handleSSEEvent(event)
            }
        }
        Task { await loadForecast() }
        Task { await loadHistory() }
    }

    func disconnect() {
        sseTask?.cancel()
        sseTask = nil
    }

    func loadForecast() async {
        do {
            let days = try await ForecastService.fetchForecast()
            let city = try await ForecastService.fetchCityName()
            forecast = days
            cityName = city
            forecastError = nil
        } catch {
            forecastError = error.localizedDescription
        }
    }

    func loadHistory() async {
        do {
            let readings = try await HistoryService.fetchReadings()
            history = readings
            historyError = nil
        } catch {
            historyError = error.localizedDescription
        }
    }

    // MARK: - Private

    func handleSSEEvent(_ event: SSEEvent) {
        switch event.event {
        case "weather":
            guard let data = event.data.data(using: .utf8),
                  let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let weather = WeatherData.parse(from: json)
            else { return }

            // Always mark as connected — keeps the LIVE badge green without re-rendering
            isConnected = true

            // Throttle UI updates so SwiftUI doesn't re-render every 5 seconds
            let now = Date()
            guard now.timeIntervalSince(lastUIUpdate) >= Self.updateInterval else { return }
            lastUIUpdate = now

            withAnimation(.spring(duration: 0.5, bounce: 0.3)) {
                currentWeather = weather
                lastUpdate = now
                trendHistory.append(weather.tempC)
                if trendHistory.count > 20 { trendHistory.removeFirst() }
            }

        case "status":
            guard let data = event.data.data(using: .utf8),
                  let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
            else { return }
            isConnected  = json["portOpen"]     as? Bool   ?? false
            detectedPort = json["detectedPort"] as? String ?? ""
            baudRate     = json["baudRate"]     as? Int    ?? 9600

        default:
            break
        }
    }
}
