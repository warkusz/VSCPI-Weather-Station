// Views/Live/LiveView.swift
// Main live weather tab — matches web app layout and design language

import SwiftUI

struct LiveView: View {
    @Environment(WeatherViewModel.self) var vm

    private var w: WeatherData? { vm.currentWeather }

    var body: some View {
        ZStack {
            Color.weatherBg.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 14) {
                    topBar
                    heroCard
                    metricsGrid
                    compassAndTrendRow
                    forecastSection
                    Spacer(minLength: 20)
                }
                .padding(.top, 12)
                .padding(.horizontal, 16)
            }
        }
        .onAppear {
            if vm.sseTask == nil { vm.connect() }
        }
    }

    // MARK: - Top bar

    private var topBar: some View {
        HStack {
            LiveBadgeView(isLive: vm.isConnected, lastUpdate: vm.lastUpdate)
            Spacer()
            HStack(spacing: 4) {
                Image(systemName: "location.fill")
                    .font(.system(size: 11))
                    .foregroundStyle(Color.textMuted)
                Text(vm.cityName)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(Color.textSecondary)
            }
        }
    }

    // MARK: - Hero card

    private var heroCard: some View {
        VStack(spacing: 10) {
            // Weather icon
            Image(systemName: currentWeatherIcon)
                .font(.system(size: 44))
                .symbolRenderingMode(.multicolor)
                .symbolEffect(.bounce, value: vm.currentWeather?.timestamp)

            // Temperature — big °C, tiny °F secondary
            VStack(spacing: 2) {
                HStack(alignment: .top, spacing: 0) {
                    Text(w != nil ? String(format: "%.1f", w!.tempC) : "--")
                        .font(.system(size: 72, weight: .bold, design: .rounded))
                        .monospacedDigit()
                        .foregroundStyle(Color.textPrimary)
                        .contentTransition(.numericText())
                    Text("°C")
                        .font(.system(size: 32, weight: .semibold))
                        .foregroundStyle(Color.textPrimary)
                        .padding(.top, 10)
                }
                if let wt = w {
                    Text(String(format: "%.0f°F", wt.tempF))
                        .font(.system(size: 13, weight: .regular))
                        .foregroundStyle(Color.textMuted)
                }
            }

            // Humidity + chance of rain row
            HStack(spacing: 16) {
                HStack(spacing: 5) {
                    Image(systemName: "humidity.fill")
                        .foregroundStyle(Color.accentCyan)
                        .font(.system(size: 13))
                    Text(w != nil ? "\(w!.humidity)%" : "--%")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Color.textSecondary)
                }
                if let wt = w, wt.chanceOfRain > 0 {
                    HStack(spacing: 5) {
                        Image(systemName: "cloud.rain.fill")
                            .foregroundStyle(Color.accentIndigo)
                            .font(.system(size: 13))
                        Text("\(wt.chanceOfRain)% rain")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(Color.textSecondary)
                    }
                }
                if let wt = w {
                    HStack(spacing: 5) {
                        Image(systemName: "wind")
                            .foregroundStyle(Color.accentBlue)
                            .font(.system(size: 13))
                        Text("\(wt.windDirectionLabel) \(String(format: "%.0f", wt.windSpeedKPH)) km/h")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(Color.textSecondary)
                    }
                }
            }
        }
        .padding(.vertical, 22)
        .padding(.horizontal, 16)
        .frame(maxWidth: .infinity)
        .glassCard(cornerRadius: 22)
    }

    // MARK: - Metrics grid (2 columns)

    private var metricsGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
            MetricCard(
                icon: "thermometer.medium",
                label: "Temperature",
                value: w != nil ? String(format: "%.1f", w!.tempC) : "--",
                unit: "°C",
                accentColor: .accentOrange
            )
            MetricCard(
                icon: "humidity.fill",
                label: "Humidity",
                value: w != nil ? "\(w!.humidity)" : "--",
                unit: "%",
                accentColor: .accentCyan
            )
            MetricCard(
                icon: "gauge.with.needle",
                label: "Pressure",
                value: w != nil ? String(format: "%.1f", w!.pressureMbar) : "--",
                unit: "mbar",
                accentColor: .accentEmerald,
                subtitle: w?.pressureStatus
            )
            MetricCard(
                icon: "wind",
                label: "Wind Speed",
                value: w != nil ? String(format: "%.1f", w!.windSpeedKPH) : "--",
                unit: "km/h",
                accentColor: .accentBlue
            )
            MetricCard(
                icon: "wind",
                label: "Wind Gust",
                value: w != nil ? String(format: "%.1f", w!.windGustKPH) : "--",
                unit: "km/h",
                accentColor: .accentBlue
            )
            MetricCard(
                icon: "cloud.rain.fill",
                label: "Rain 1h",
                value: w != nil ? String(format: "%.1f", w!.rain1hMm) : "--",
                unit: "mm",
                accentColor: .accentIndigo
            )
        }
    }

    // MARK: - Wind compass + trend sparkline

    private var compassAndTrendRow: some View {
        HStack(spacing: 10) {
            // Compass card
            VStack(spacing: 6) {
                Text("Wind Direction")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(Color.textSecondary)

                WindCompassView(
                    direction: w?.windDirection ?? 0,
                    speedKPH: w?.windSpeedKPH ?? 0.0
                )
                .frame(width: 100, height: 100)

                VStack(spacing: 2) {
                    if let wt = w {
                        Text(String(format: "%.1f km/h", wt.windSpeedKPH))
                            .font(.system(size: 13, weight: .semibold, design: .rounded))
                            .monospacedDigit()
                            .foregroundStyle(Color.textPrimary)
                        Text(wt.windDirectionLabel)
                            .font(.system(size: 12, weight: .bold))
                            .foregroundStyle(Color.accentBlue)
                    } else {
                        Text("--")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(Color.textMuted)
                        Text("--")
                            .font(.system(size: 12))
                            .foregroundStyle(Color.textMuted)
                    }
                }
            }
            .frame(maxWidth: .infinity)
            .frame(height: 190)
            .glassCard()

            // Trend sparkline card
            VStack(alignment: .leading, spacing: 8) {
                Text("Temp Trend")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(Color.textSecondary)

                if vm.trendHistory.isEmpty {
                    Spacer()
                    Text("Waiting for data...")
                        .font(.system(size: 12))
                        .foregroundStyle(Color.textMuted)
                        .frame(maxWidth: .infinity, alignment: .center)
                    Spacer()
                } else {
                    trendSparkline
                        .frame(maxWidth: .infinity)
                        .frame(maxHeight: .infinity)

                    // Min/Max labels
                    let pts = vm.trendHistory
                    HStack {
                        Text(String(format: "%.1f°", pts.min()!))
                            .font(.system(size: 10))
                            .foregroundStyle(Color.textMuted)
                        Spacer()
                        Text(String(format: "%.1f°", pts.max()!))
                            .font(.system(size: 10))
                            .foregroundStyle(Color.textMuted)
                    }
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity)
            .frame(height: 190)
            .glassCard()
        }
    }

    // MARK: - Trend sparkline (matching web app SVG sparkline)

    private var trendSparkline: some View {
        GeometryReader { geo in
            Canvas { ctx, size in
                let pts = vm.trendHistory
                guard pts.count > 1 else { return }
                let minV = pts.min()! - 0.5
                let maxV = pts.max()! + 0.5
                let range = max(maxV - minV, 1)

                func xp(_ i: Int) -> CGFloat {
                    CGFloat(i) / CGFloat(pts.count - 1) * size.width
                }
                func yp(_ v: Double) -> CGFloat {
                    size.height - CGFloat((v - minV) / range) * (size.height - 4) - 2
                }

                // Gradient area fill (gold 30% → transparent)
                var area = Path()
                area.move(to: CGPoint(x: xp(0), y: size.height))
                area.addLine(to: CGPoint(x: xp(0), y: yp(pts[0])))
                for i in 1..<pts.count {
                    area.addLine(to: CGPoint(x: xp(i), y: yp(pts[i])))
                }
                area.addLine(to: CGPoint(x: xp(pts.count - 1), y: size.height))
                area.closeSubpath()
                ctx.fill(area, with: .color(Color.accentGold.opacity(0.2)))

                // Dashed midline
                let midY = size.height / 2
                var dash = Path()
                dash.move(to: CGPoint(x: 0, y: midY))
                dash.addLine(to: CGPoint(x: size.width, y: midY))
                ctx.stroke(dash, with: .color(.white.opacity(0.1)),
                           style: StrokeStyle(lineWidth: 1, dash: [4, 4]))

                // Gold line
                var line = Path()
                line.move(to: CGPoint(x: xp(0), y: yp(pts[0])))
                for i in 1..<pts.count {
                    line.addLine(to: CGPoint(x: xp(i), y: yp(pts[i])))
                }
                ctx.stroke(line, with: .color(Color.accentGold),
                           style: StrokeStyle(lineWidth: 2, lineJoin: .round))

                // Dots on each point
                for i in pts.indices {
                    let pt = CGPoint(x: xp(i), y: yp(pts[i]))
                    let dotR: CGFloat = i == pts.count - 1 ? 3.5 : 2.5
                    let dot = Path(ellipseIn: CGRect(x: pt.x - dotR, y: pt.y - dotR,
                                                     width: dotR * 2, height: dotR * 2))
                    ctx.fill(dot, with: .color(Color.accentGold))
                    if i < pts.count - 1 {
                        ctx.stroke(dot, with: .color(Color.weatherBg), lineWidth: 1)
                    }
                }
            }
        }
    }

    // MARK: - Forecast section

    private var forecastSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("7-Day Forecast")
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(Color.textSecondary)
            ForecastStripView(forecast: vm.forecast)
        }
    }

    // MARK: - Weather icon

    private var currentWeatherIcon: String {
        guard let w else { return "thermometer.medium" }
        if w.rain1hMm > 2  { return "cloud.heavyrain.fill" }
        if w.rain1hMm > 0  { return "cloud.drizzle.fill" }
        if w.windSpeedKPH > 40 { return "wind" }
        switch w.tempC {
        case ..<0:    return "snowflake"
        case 0..<8:   return "cloud.fill"
        case 8..<18:  return "cloud.sun.fill"
        default:      return "sun.max.fill"
        }
    }
}
