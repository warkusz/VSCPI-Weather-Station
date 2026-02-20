// Views/History/HistoryView.swift
// History tab — Swift Charts line chart + reading list, EU units throughout

import SwiftUI
import Charts

struct HistoryView: View {
    @Environment(WeatherViewModel.self) var vm

    enum Metric: String, CaseIterable {
        case temp     = "Temp"
        case humidity = "Humidity"
        case wind     = "Wind"
        case pressure = "Pressure"
        case rain     = "Rain"

        var unit: String {
            switch self {
            case .temp:     return "°C"
            case .humidity: return "%"
            case .wind:     return "km/h"
            case .pressure: return "mbar"
            case .rain:     return "mm"
            }
        }

        var accentColor: Color {
            switch self {
            case .temp:     return .accentOrange
            case .humidity: return .accentCyan
            case .wind:     return .accentBlue
            case .pressure: return .accentEmerald
            case .rain:     return .accentIndigo
            }
        }
    }

    @State private var selectedMetric: Metric = .temp

    private var sorted: [HistoryReading] {
        vm.history.sorted { $0.recordedAt < $1.recordedAt }
    }

    private func value(for r: HistoryReading) -> Double {
        switch selectedMetric {
        case .temp:     return r.tempC
        case .humidity: return Double(r.humidity)
        case .wind:     return r.windSpeedKph
        case .pressure: return r.pressureMbar
        case .rain:     return r.rain1hMm
        }
    }

    var body: some View {
        ZStack {
            Color.weatherBg.ignoresSafeArea()
            ScrollView {
                VStack(spacing: 14) {
                    // Header
                    Text("History")
                        .font(.system(size: 22, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal, 16)

                    // Metric selector pills
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(Metric.allCases, id: \.self) { m in
                                Button {
                                    withAnimation(.spring(duration: 0.3)) { selectedMetric = m }
                                } label: {
                                    Text(m.rawValue)
                                        .font(.system(size: 13, weight: .semibold))
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 7)
                                        .background(
                                            selectedMetric == m
                                                ? m.accentColor.opacity(0.2)
                                                : Color.white.opacity(0.06)
                                        )
                                        .clipShape(Capsule())
                                        .overlay(
                                            Capsule().stroke(
                                                selectedMetric == m
                                                    ? m.accentColor.opacity(0.6)
                                                    : Color.white.opacity(0.12),
                                                lineWidth: 1
                                            )
                                        )
                                        .foregroundStyle(
                                            selectedMetric == m
                                                ? m.accentColor
                                                : Color.textSecondary
                                        )
                                }
                            }
                        }
                        .padding(.horizontal, 16)
                    }

                    // Chart
                    Group {
                        if sorted.isEmpty {
                            Text(vm.historyError ?? "No data yet")
                                .foregroundStyle(Color.textMuted)
                                .frame(height: 200)
                                .frame(maxWidth: .infinity)
                                .glassCard()
                                .padding(.horizontal, 16)
                        } else {
                            Chart(sorted, id: \.id) { r in
                                AreaMark(
                                    x: .value("Time", r.recordedAt),
                                    y: .value(selectedMetric.rawValue, value(for: r))
                                )
                                .foregroundStyle(
                                    .linearGradient(
                                        colors: [selectedMetric.accentColor.opacity(0.25), .clear],
                                        startPoint: .top, endPoint: .bottom
                                    )
                                )
                                LineMark(
                                    x: .value("Time", r.recordedAt),
                                    y: .value(selectedMetric.rawValue, value(for: r))
                                )
                                .foregroundStyle(selectedMetric.accentColor)
                                .lineStyle(StrokeStyle(lineWidth: 2))
                                .interpolationMethod(.catmullRom)
                            }
                            .chartXAxis {
                                AxisMarks(values: .stride(by: .hour)) {
                                    AxisGridLine().foregroundStyle(.white.opacity(0.08))
                                    AxisValueLabel(format: .dateTime.hour())
                                        .foregroundStyle(Color.textMuted)
                                }
                            }
                            .chartYAxis {
                                AxisMarks { v in
                                    AxisGridLine().foregroundStyle(.white.opacity(0.08))
                                    AxisValueLabel {
                                        if let d = v.as(Double.self) {
                                            Text(String(format: "%.0f\(selectedMetric.unit)", d))
                                                .font(.system(size: 10))
                                                .foregroundStyle(Color.textMuted)
                                        }
                                    }
                                }
                            }
                            .frame(height: 220)
                            .padding()
                            .glassCard()
                            .padding(.horizontal, 16)
                        }
                    }

                    // Readings table
                    if !vm.history.isEmpty {
                        VStack(spacing: 6) {
                            // Column headers
                            HStack {
                                Text("Time").frame(width: 52, alignment: .leading)
                                Spacer()
                                Text("Temp").frame(width: 52, alignment: .trailing)
                                Text("Hum").frame(width: 40, alignment: .trailing)
                                Text("Wind").frame(width: 52, alignment: .trailing)
                                Text("Press").frame(width: 52, alignment: .trailing)
                            }
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundStyle(Color.textMuted)
                            .padding(.horizontal, 12)

                            ForEach(vm.history.prefix(50)) { r in
                                HStack {
                                    Text(r.recordedAt, style: .time)
                                        .frame(width: 52, alignment: .leading)
                                    Spacer()
                                    Text(String(format: "%.1f°C", r.tempC))
                                        .foregroundStyle(Color.accentOrange)
                                        .frame(width: 52, alignment: .trailing)
                                    Text("\(r.humidity)%")
                                        .foregroundStyle(Color.accentCyan)
                                        .frame(width: 40, alignment: .trailing)
                                    Text(String(format: "%.0f km/h", r.windSpeedKph))
                                        .foregroundStyle(Color.accentBlue)
                                        .frame(width: 52, alignment: .trailing)
                                    Text(String(format: "%.0f", r.pressureMbar))
                                        .foregroundStyle(Color.accentEmerald)
                                        .frame(width: 52, alignment: .trailing)
                                }
                                .font(.system(size: 12, weight: .medium))
                                .foregroundStyle(Color.textPrimary)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 8)
                                .background(Color.white.opacity(0.04))
                                .clipShape(RoundedRectangle(cornerRadius: 8))
                            }
                        }
                        .padding(.horizontal, 16)
                    }

                    Spacer(minLength: 20)
                }
                .padding(.top, 12)
            }
        }
        .task { await vm.loadHistory() }
    }
}
