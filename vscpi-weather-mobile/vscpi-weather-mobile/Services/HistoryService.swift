// Services/HistoryService.swift
// Fetches last 50 readings from the Next.js /api/readings endpoint

import Foundation

class HistoryService {
    static func fetchReadings() async throws -> [HistoryReading] {
        guard let url = URL(string: SSEClient.baseURL + "/api/readings") else {
            throw URLError(.badURL)
        }
        let (data, _) = try await URLSession.shared.data(from: url)
        let decoder = JSONDecoder()
        // /api/readings returns ISO8601 dates
        decoder.dateDecodingStrategy = .custom { decoder in
            let str = try decoder.singleValueContainer().decode(String.self)
            let iso = ISO8601DateFormatter()
            iso.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
            if let d = iso.date(from: str) { return d }
            iso.formatOptions = [.withInternetDateTime]
            if let d = iso.date(from: str) { return d }
            throw DecodingError.dataCorrupted(.init(codingPath: decoder.codingPath, debugDescription: "Bad date: \(str)"))
        }
        return try decoder.decode([HistoryReading].self, from: data)
    }
}
