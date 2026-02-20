// Models/HistoryReading.swift
// Codable struct matching /api/readings JSON (Prisma WeatherReading model)
//
// NOTE: Prisma serializes Decimal columns as JSON strings ("5.00"), not numbers.
// The custom init(from:) handles both string and number representations.

import Foundation

struct HistoryReading: Decodable, Identifiable {
    var id: Int
    var windDirection: Int
    var windSpeedMph: Double
    var windSpeedMs: Double
    var windGustMph: Double
    var windGustMs: Double
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
    var recordedAt: Date

    // EU unit conversions
    var windSpeedKph: Double { (windSpeedMph * 1.60934 * 10).rounded() / 10 }
    var windGustKph:  Double { (windGustMph  * 1.60934 * 10).rounded() / 10 }

    enum CodingKeys: String, CodingKey {
        case id, windDirection, windSpeedMph, windSpeedMs
        case windGustMph, windGustMs, tempF, tempC
        case rain1hIn, rain1hMm, rain24hIn, rain24hMm
        case humidity, pressureMbar, pressureInhg
        case rawString, checksum, recordedAt
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)

        // Plain integer / string fields
        id            = try c.decode(Int.self, forKey: .id)
        windDirection = try c.decode(Int.self, forKey: .windDirection)
        humidity      = try c.decode(Int.self, forKey: .humidity)
        rawString     = try c.decode(String.self, forKey: .rawString)
        checksum      = try c.decode(String.self, forKey: .checksum)
        recordedAt    = try c.decode(Date.self, forKey: .recordedAt)

        // Prisma Decimal columns come through JSON as strings — decode flexibly
        windSpeedMph = try Self.decimal(c, .windSpeedMph)
        windSpeedMs  = try Self.decimal(c, .windSpeedMs)
        windGustMph  = try Self.decimal(c, .windGustMph)
        windGustMs   = try Self.decimal(c, .windGustMs)
        tempF        = try Self.decimal(c, .tempF)
        tempC        = try Self.decimal(c, .tempC)
        rain1hIn     = try Self.decimal(c, .rain1hIn)
        rain1hMm     = try Self.decimal(c, .rain1hMm)
        rain24hIn    = try Self.decimal(c, .rain24hIn)
        rain24hMm    = try Self.decimal(c, .rain24hMm)
        pressureMbar = try Self.decimal(c, .pressureMbar)
        pressureInhg = try Self.decimal(c, .pressureInhg)
    }

    // Decodes a field that Prisma may send as either a JSON string ("5.00") or number (5.0)
    private static func decimal(
        _ c: KeyedDecodingContainer<CodingKeys>,
        _ key: CodingKeys
    ) throws -> Double {
        if let d = try? c.decode(Double.self, forKey: key) { return d }
        let s = try c.decode(String.self, forKey: key)
        guard let d = Double(s) else {
            throw DecodingError.dataCorruptedError(
                forKey: key, in: c,
                debugDescription: "Cannot convert '\(s)' to Double"
            )
        }
        return d
    }
}
