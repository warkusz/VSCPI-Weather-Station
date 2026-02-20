// ContentView.swift
// Root TabView — 4 tabs with iOS 26 floating Liquid Glass tab bar

import SwiftUI

struct ContentView: View {
    @Environment(WeatherViewModel.self) var vm

    var body: some View {
        TabView {
            LiveView()
                .tabItem {
                    Label("Live", systemImage: "dot.radiowaves.left.and.right")
                }

            HistoryView()
                .tabItem {
                    Label("History", systemImage: "chart.xyaxis.line")
                }

            StationMapView()
                .tabItem {
                    Label("Map", systemImage: "map.fill")
                }

            InfoView()
                .tabItem {
                    Label("Info", systemImage: "info.circle.fill")
                }
        }
        .preferredColorScheme(.dark)
    }
}

#Preview {
    ContentView()
        .environment(WeatherViewModel())
}
