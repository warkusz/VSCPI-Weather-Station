// Models/WeatherData.swift
// Mirrors the TypeScript WeatherData interface from app/api/serial/route.ts

import Foundation

struct WeatherData {
    var windDirection: Int          // 0-360 degrees
    var windSpeedMPH: Double
    var windSpeedMS: Double
    var windGustMPH: Double
    var windGustMS: Double
    var tempF: Double
    var tempC: Double
    var rain1hIn: Double
    var rain1hMm: Double
    var rain24hIn: Double
    var rain24hMm: Double
    var humidity: Int
    var pressureMbar: Double
    var pressureInhg: Double
    var rawString: String
    var checksum: String
    var timestamp: Date

    // EU unit conversions (km/h from mph)
    var windSpeedKPH: Double { (windSpeedMPH * 1.60934 * 10).rounded() / 10 }
    var windGustKPH: Double  { (windGustMPH  * 1.60934 * 10).rounded() / 10 }

    // Pressure status label matching web app logic
    var pressureStatus: String {
        if pressureMbar < 980 { return "Low" }
        if pressureMbar > 1020 { return "High" }
        return "Normal"
    }

    // Chance of rain % (mirrors web app calculation)
    var chanceOfRain: Int { min(99, Int(rain1hMm * 20)) }

    // Computed cardinal direction label
    var windDirectionLabel: String {
        let dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE",
                    "S","SSW","SW","WSW","W","WNW","NW","NNW"]
        let idx = Int((Double(windDirection) / 22.5).rounded()) % 16
        return dirs[idx]
    }

    // Parse from SSE JSON dictionary (keys match TypeScript output)
    static func parse(from json: [String: Any]) -> WeatherData? {
        guard
            let windDir   = json["windDirection"] as? Int ?? (json["windDirection"] as? Double).map(Int.init),
            let wsMph     = json["windSpeedMph"]  as? Double ?? (json["windSpeedMph"]  as? Int).map(Double.init),
            let wsMs      = json["windSpeedMs"]   as? Double ?? (json["windSpeedMs"]   as? Int).map(Double.init),
            let wgMph     = json["windGustMph"]   as? Double ?? (json["windGustMph"]   as? Int).map(Double.init),
            let wgMs      = json["windGustMs"]    as? Double ?? (json["windGustMs"]    as? Int).map(Double.init),
            let tF        = json["tempF"]          as? Double ?? (json["tempF"]          as? Int).map(Double.init),
            let tC        = json["tempC"]          as? Double ?? (json["tempC"]          as? Int).map(Double.init),
            let r1In      = json["rain1hIn"]       as? Double ?? (json["rain1hIn"]       as? Int).map(Double.init),
            let r1Mm      = json["rain1hMm"]       as? Double ?? (json["rain1hMm"]       as? Int).map(Double.init),
            let r24In     = json["rain24hIn"]      as? Double ?? (json["rain24hIn"]      as? Int).map(Double.init),
            let r24Mm     = json["rain24hMm"]      as? Double ?? (json["rain24hMm"]      as? Int).map(Double.init),
            let hum       = json["humidity"]       as? Int ?? (json["humidity"]       as? Double).map(Int.init),
            let pMbar     = json["pressureMbar"]   as? Double ?? (json["pressureMbar"]   as? Int).map(Double.init),
            let pInhg     = json["pressureInhg"]   as? Double ?? (json["pressureInhg"]   as? Int).map(Double.init)
        else { return nil }

        let tsString = json["timestamp"] as? String ?? ""
        let ts = ISO8601DateFormatter().date(from: tsString) ?? Date()

        return WeatherData(
            windDirection: windDir,
            windSpeedMPH:  wsMph,
            windSpeedMS:   wsMs,
            windGustMPH:   wgMph,
            windGustMS:    wgMs,
            tempF:         tF,
            tempC:         tC,
            rain1hIn:      r1In,
            rain1hMm:      r1Mm,
            rain24hIn:     r24In,
            rain24hMm:     r24Mm,
            humidity:      hum,
            pressureMbar:  pMbar,
            pressureInhg:  pInhg,
            rawString:     json["rawString"] as? String ?? "",
            checksum:      json["checksum"]  as? String ?? "",
            timestamp:     ts
        )
    }
}
