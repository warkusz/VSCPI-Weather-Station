// Services/ForecastService.swift
// Fetches 7-day forecast from Open-Meteo and city name from BigDataCloud

import Foundation

class ForecastService {
    // VSCPI Burgas coordinates (nonisolated: plain Double constants, safe from any context)
    nonisolated static let lat = 42.5048
    nonisolated static let lon = 27.4626

    static func fetchForecast(lat: Double = lat, lon: Double = lon) async throws -> [ForecastDay] {
        var comps = URLComponents(string: "https://api.open-meteo.com/v1/forecast")!
        comps.queryItems = [
            .init(name: "latitude",    value: String(lat)),
            .init(name: "longitude",   value: String(lon)),
            .init(name: "daily",       value: "weather_code,temperature_2m_max"),
            .init(name: "timezone",    value: "auto"),
            .init(name: "forecast_days", value: "7"),
        ]
        let (data, _) = try await URLSession.shared.data(from: comps.url!)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        guard let daily = json?["daily"] as? [String: Any],
              let codes = daily["weather_code"] as? [Int],
              let maxTemps = daily["temperature_2m_max"] as? [Double],
              let dateStrings = daily["time"] as? [String]
        else { throw URLError(.cannotParseResponse) }

        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        fmt.locale = Locale(identifier: "en_US_POSIX")

        return zip(codes.indices, zip(codes, zip(maxTemps, dateStrings))).map { idx, pair in
            let (code, (temp, dateStr)) = pair
            let date = fmt.date(from: dateStr) ?? Date()
            return ForecastDay(id: idx, date: date, maxTempC: temp, weatherCode: code)
        }
    }

    static func fetchCityName(lat: Double = lat, lon: Double = lon) async throws -> String {
        var comps = URLComponents(string: "https://api.bigdatacloud.net/data/reverse-geocode-client")!
        comps.queryItems = [
            .init(name: "latitude",    value: String(lat)),
            .init(name: "longitude",   value: String(lon)),
            .init(name: "localityLanguage", value: "en"),
        ]
        let (data, _) = try await URLSession.shared.data(from: comps.url!)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        if let city = json?["city"] as? String, !city.isEmpty { return city }
        if let locality = json?["locality"] as? String, !locality.isEmpty { return locality }
        return "Burgas"
    }
}
