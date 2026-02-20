// Views/Info/InfoView.swift
// Project info: team, schools, connection status, sensor specs, Erasmus+

import SwiftUI

struct InfoView: View {
    @Environment(WeatherViewModel.self) var vm

    var body: some View {
        ZStack {
            Color.weatherBg.ignoresSafeArea()
            ScrollView {
                VStack(spacing: 14) {
                    // Title
                    VStack(spacing: 4) {
                        Text("VSCPI Weather Station")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        Text("Erasmus+ IoT Project")
                            .font(.system(size: 13))
                            .foregroundStyle(Color.accentBlue)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .glassCard()

                    // Partner schools
                    HStack(spacing: 10) {
                        schoolCard(
                            imageName: "vscpi",
                            shortName: "VSCPI",
                            fullName: "Проф. Гимназия по КПИ",
                            city: "Burgas, Bulgaria",
                            accentColor: .accentBlue
                        )
                        schoolCard(
                            imageName: "esja-logo",
                            shortName: "ESJA",
                            fullName: "Esc. Sec. Dr. José Afonso",
                            city: "Seixal, Portugal",
                            accentColor: .accentCyan
                        )
                    }

                    // Team
                    sectionCard(title: "Development Team") {
                        VStack(alignment: .leading, spacing: 10) {
                            teamRow(name: "Boris Milev",
                                    role: "Lead firmware engineer & full-stack developer",
                                    school: "VSCPI",
                                    github: nil,
                                    color: .accentBlue)
                            Divider().background(Color.white.opacity(0.08))
                            teamRow(name: "Plamen Petkov",
                                    role: "UI/UX designer & front-end contributor",
                                    school: "VSCPI",
                                    github: "@PRPetkov22",
                                    color: .accentPurple)
                            Divider().background(Color.white.opacity(0.08))
                            teamRow(name: "Marcos Costa",
                                    role: "Software developer & systems tester",
                                    school: "ESJA",
                                    github: "@warkusz",
                                    color: .accentCyan)
                            Divider().background(Color.white.opacity(0.08))
                            teamRow(name: "Rodrigo Costa",
                                    role: "Software developer & dashboard contributor",
                                    school: "ESJA",
                                    github: "@Rodri47",
                                    color: .accentCyan)
                        }
                    }

                    // Connection status
                    sectionCard(title: "Connection Status") {
                        VStack(spacing: 8) {
                            statusRow(label: "Status",
                                      value: vm.isConnected ? "Connected" : "Disconnected",
                                      valueColor: vm.isConnected ? Color(red: 0.290, green: 0.871, blue: 0.502) : .red)
                            if !vm.detectedPort.isEmpty {
                                statusRow(label: "Port", value: vm.detectedPort)
                            }
                            statusRow(label: "Baud Rate", value: "\(vm.baudRate)")
                            statusRow(label: "Server", value: SSEClient.baseURL)
                            statusRow(label: "Sensor", value: "DFRobot SEN0186")
                            statusRow(label: "MCU", value: "ESP32-S3")
                        }
                    }

                    // Sensor specs
                    sectionCard(title: "Sensor Specifications") {
                        VStack(spacing: 8) {
                            specRow(label: "Wind Speed", value: "0 – 180 km/h")
                            specRow(label: "Wind Direction", value: "0 – 360° (8 points)")
                            specRow(label: "Temperature", value: "-40 – +65°C")
                            specRow(label: "Humidity", value: "1 – 99% RH")
                            specRow(label: "Pressure", value: "10 – 1100 mbar")
                            specRow(label: "Rain Resolution", value: "0.2794 mm/tip")
                            specRow(label: "Update Interval", value: "~5 seconds")
                            specRow(label: "Protocol", value: "APRS-style string")
                        }
                    }

                    // Erasmus+
                    sectionCard(title: "About Erasmus+") {
                        Text("The European Union's programme for education, training, youth and sport — enabling students, teachers, and schools across Europe to collaborate on real-world projects.\n\nThis weather station was designed and built during the Erasmus+ student exchange visit between VSCPI (Burgas, Bulgaria) and ESJA (Seixal, Portugal).")
                            .font(.system(size: 13))
                            .foregroundStyle(Color.textSecondary)
                            .lineSpacing(4)
                    }

                    Spacer(minLength: 30)
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
            }
        }
    }

    // MARK: - Helpers

    @ViewBuilder
    private func sectionCard<Content: View>(title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(Color.textMuted)
                .textCase(.uppercase)
                .kerning(0.5)
            content()
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .glassCard()
    }

    private func schoolCard(imageName: String, shortName: String, fullName: String,
                            city: String, accentColor: Color) -> some View {
        VStack(spacing: 8) {
            if UIImage(named: imageName) != nil {
                Image(imageName)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 44)
            } else {
                Image(systemName: "building.columns.fill")
                    .font(.system(size: 30))
                    .foregroundStyle(accentColor)
                    .frame(height: 44)
            }
            Text(shortName)
                .font(.system(size: 14, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(fullName)
                .font(.system(size: 10))
                .foregroundStyle(Color.textSecondary)
                .multilineTextAlignment(.center)
                .lineLimit(2)
            Text(city)
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(accentColor)
        }
        .padding(12)
        .frame(maxWidth: .infinity)
        .glassCard()
    }

    private func teamRow(name: String, role: String, school: String,
                         github: String?, color: Color) -> some View {
        HStack(alignment: .top, spacing: 10) {
            // explicit .frame keeps all avatar circles at the same left edge
            Circle()
                .fill(color.opacity(0.2))
                .frame(width: 36, height: 36)
                .overlay(
                    Text(String(name.prefix(1)))
                        .font(.system(size: 15, weight: .bold))
                        .foregroundStyle(color)
                )
            VStack(alignment: .leading, spacing: 2) {
                HStack {
                    Text(name)
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(Color.textPrimary)
                    Text(school)
                        .font(.system(size: 10, weight: .medium))
                        .foregroundStyle(color)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(color.opacity(0.15))
                        .clipShape(Capsule())
                }
                Text(role)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.textSecondary)
                    .lineLimit(2)
                if let gh = github {
                    Text(gh)
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundStyle(Color.accentBlue)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func statusRow(label: String, value: String, valueColor: Color = .init(white: 0.75)) -> some View {
        HStack {
            Text(label)
                .font(.system(size: 13))
                .foregroundStyle(Color.textSecondary)
            Spacer()
            Text(value)
                .font(.system(size: 13, weight: .medium, design: .monospaced))
                .foregroundStyle(valueColor)
                .lineLimit(1)
        }
    }

    private func specRow(label: String, value: String) -> some View {
        HStack {
            Text(label)
                .font(.system(size: 13))
                .foregroundStyle(Color.textSecondary)
            Spacer()
            Text(value)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(Color.textPrimary)
        }
    }
}
