// Services/SSEClient.swift
// Server-Sent Events streaming via URLSession async bytes

import Foundation

struct SSEEvent {
    var event: String
    var data: String
}

class SSEClient {
    // Base URL — use localhost for Simulator
    // For a physical device replace with your Mac's LAN IP, e.g. http://192.168.1.100:3000
    static let baseURL = "http://localhost:3000"

    /// Returns an AsyncStream of SSEEvents.
    /// Reconnects automatically on error with a 3-second delay.
    static func stream(path: String) -> AsyncStream<SSEEvent> {
        AsyncStream { continuation in
            // Detached so network I/O does not run on @MainActor
            Task.detached {
                while !Task.isCancelled {
                    guard let url = URL(string: baseURL + path) else { break }
                    do {
                        var request = URLRequest(url: url, timeoutInterval: .infinity)
                        request.cachePolicy = .reloadIgnoringLocalAndRemoteCacheData
                        request.setValue("text/event-stream", forHTTPHeaderField: "Accept")
                        request.setValue("no-cache",          forHTTPHeaderField: "Cache-Control")
                        // Disable gzip — compressed SSE buffers until stream closes in Turbopack
                        request.setValue("identity",          forHTTPHeaderField: "Accept-Encoding")

                        let (asyncBytes, response) = try await URLSession.shared.bytes(for: request)
                        guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
                            throw URLError(.badServerResponse)
                        }

                        var eventType  = ""
                        var dataLines: [String] = []
                        var lineBuffer = Data()

                        // Read byte-by-byte — avoids AsyncLineSequence buffering stall
                        // that occurs with Next.js Turbopack dev server streaming
                        for try await byte in asyncBytes {
                            if Task.isCancelled { break }

                            if byte == UInt8(ascii: "\n") {
                                // Strip optional trailing \r (CRLF tolerance)
                                var line = String(data: lineBuffer, encoding: .utf8) ?? ""
                                if line.hasSuffix("\r") { line = String(line.dropLast()) }
                                lineBuffer = Data()

                                if line.hasPrefix(":") {
                                    // Heartbeat comment — ignore
                                } else if line.hasPrefix("event:") {
                                    eventType = String(line.dropFirst(6)).trimmingCharacters(in: .whitespaces)
                                } else if line.hasPrefix("data:") {
                                    dataLines.append(String(line.dropFirst(5)).trimmingCharacters(in: .whitespaces))
                                } else if line.isEmpty {
                                    // Blank line = end of event block
                                    if !eventType.isEmpty && !dataLines.isEmpty {
                                        let joined = dataLines.joined(separator: "\n")
                                        continuation.yield(SSEEvent(event: eventType, data: joined))
                                    }
                                    eventType = ""
                                    dataLines = []
                                }
                            } else {
                                lineBuffer.append(byte)
                            }
                        }
                    } catch {
                        if Task.isCancelled { break }
                        // Reconnect after 3 seconds
                        try? await Task.sleep(nanoseconds: 3_000_000_000)
                    }
                }
                continuation.finish()
            }
        }
    }
}
