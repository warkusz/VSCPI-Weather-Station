// vscpi_weather_mobileApp.swift
// App entry point — injects WeatherViewModel as @Observable environment object

import SwiftUI

@main
struct vscpi_weather_mobileApp: App {
    @State private var vm = WeatherViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(vm)
                .onAppear { vm.connect() }
        }
    }
}
