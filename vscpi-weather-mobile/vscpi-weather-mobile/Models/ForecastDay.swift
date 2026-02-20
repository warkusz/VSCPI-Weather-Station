// Models/ForecastDay.swift
// Open-Meteo daily forecast entry

import Foundation

struct ForecastDay: Identifiable {
    var id: Int         // day index (0 = today)
    var date: Date
    var maxTempC: Double
    var weatherCode: Int

    // SF Symbol name derived from WMO weather interpretation code
    var iconName: String {
        switch weatherCode {
        case 0:            return "sun.max.fill"
        case 1:            return "sun.max.fill"
        case 2:            return "cloud.sun.fill"
        case 3:            return "cloud.fill"
        case 45, 48:       return "cloud.fog.fill"
        case 51, 53, 55:   return "cloud.drizzle.fill"
        case 61, 63, 65:   return "cloud.rain.fill"
        case 66, 67:       return "cloud.sleet.fill"
        case 71, 73, 75:   return "snowflake"
        case 77:           return "cloud.snow.fill"
        case 80, 81, 82:   return "cloud.heavyrain.fill"
        case 85, 86:       return "cloud.snow.fill"
        case 95:           return "cloud.bolt.fill"
        case 96, 99:       return "cloud.bolt.rain.fill"
        default:           return "cloud.fill"
        }
    }

    // Short day label e.g. "Mon"
    var dayLabel: String {
        let fmt = DateFormatter()
        fmt.dateFormat = "EEE"
        return fmt.string(from: date)
    }
}
