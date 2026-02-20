// Views/Map/StationMapView.swift
// Satellite map with station marker and live wind overlay (EU units)

import SwiftUI
import MapKit

struct StationMapView: View {
    @Environment(WeatherViewModel.self) var vm

    private let stationCoord = CLLocationCoordinate2D(latitude: 42.456417, longitude: 27.401583)

    var body: some View {
        ZStack {
            Color.weatherBg.ignoresSafeArea()

            Map(initialPosition: .region(
                MKCoordinateRegion(
                    center: CLLocationCoordinate2D(latitude: 42.456417, longitude: 27.401583),
                    span: MKCoordinateSpan(latitudeDelta: 0.012, longitudeDelta: 0.012)
                )
            )) {
                Annotation("VSCPI Weather Station", coordinate: stationCoord) {
                    ZStack {
                        Circle()
                            .fill(Color.accentBlue.opacity(0.2))
                            .frame(width: 48, height: 48)
                        Circle()
                            .fill(Color.accentBlue)
                            .frame(width: 34, height: 34)
                        Image(systemName: "antenna.radiowaves.left.and.right")
                            .foregroundStyle(.white)
                            .font(.system(size: 15, weight: .bold))
                    }
                    .shadow(color: Color.accentBlue.opacity(0.5), radius: 10)
                }
            }
            .mapStyle(.imagery(elevation: .realistic))
            .ignoresSafeArea()

            // Bottom info overlay
            VStack {
                Spacer()
                if let w = vm.currentWeather {
                    VStack(spacing: 0) {
                        HStack(spacing: 14) {
                            VStack(alignment: .leading, spacing: 3) {
                                Text("ПГКПИ - Бургас")
                                    .font(.system(size: 15, weight: .bold))
                                    .foregroundStyle(Color.textPrimary)
                                Text("42.456417°N, 27.401583°E")
                                    .font(.system(size: 11))
                                    .foregroundStyle(Color.textMuted)
                            }
                            Spacer()
                            // Wind direction arrow + speed
                            VStack(alignment: .trailing, spacing: 3) {
                                HStack(spacing: 5) {
                                    Image(systemName: "arrow.up.circle.fill")
                                        .rotationEffect(.degrees(Double(w.windDirection)))
                                        .foregroundStyle(Color.accentBlue)
                                        .font(.system(size: 16))
                                    Text("\(w.windDirectionLabel)")
                                        .font(.system(size: 13, weight: .semibold))
                                        .foregroundStyle(Color.textPrimary)
                                }
                                Text(String(format: "%.1f km/h  •  %.1f°C", w.windSpeedKPH, w.tempC))
                                    .font(.system(size: 11))
                                    .foregroundStyle(Color.textSecondary)
                            }
                        }
                    }
                    .padding(16)
                    .background(Color.weatherBg.opacity(0.88))
                    .clipShape(RoundedRectangle(cornerRadius: 18))
                    .overlay(
                        RoundedRectangle(cornerRadius: 18)
                            .stroke(Color.white.opacity(0.12), lineWidth: 1)
                    )
                    .padding(.horizontal, 16)
                    .padding(.bottom, 16)
                } else {
                    HStack {
                        Image(systemName: "antenna.radiowaves.left.and.right")
                            .foregroundStyle(Color.accentBlue)
                        Text("ПГКПИ Weather Station — Burgas")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(Color.textPrimary)
                    }
                    .padding(14)
                    .glassCard()
                    .padding(.horizontal, 16)
                    .padding(.bottom, 16)
                }
            }
        }
    }
}
