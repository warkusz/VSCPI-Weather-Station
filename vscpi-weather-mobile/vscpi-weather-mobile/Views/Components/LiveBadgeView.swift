// Views/Components/LiveBadgeView.swift
// Pulsing LIVE indicator matching web app live-badge style

import SwiftUI

struct LiveBadgeView: View {
    var isLive: Bool
    var lastUpdate: Date?

    @State private var pulse = false

    private let liveGreen = Color(red: 0.290, green: 0.871, blue: 0.502)  // #4ade80

    var body: some View {
        HStack(spacing: 6) {
            Circle()
                .fill(isLive ? liveGreen : Color.gray)
                .frame(width: 7, height: 7)
                .scaleEffect(pulse ? 1.5 : 1.0)
                .opacity(pulse ? 0.5 : 1.0)
                .animation(
                    isLive
                        ? .easeInOut(duration: 1.0).repeatForever(autoreverses: true)
                        : .default,
                    value: pulse
                )
                .onAppear { if isLive { pulse = true } }
                .onChange(of: isLive) { pulse = isLive }

            Text(isLive ? "LIVE" : "OFFLINE")
                .font(.system(size: 11, weight: .bold))
                .foregroundStyle(isLive ? liveGreen : Color.textMuted)

            if !isLive, let update = lastUpdate {
                Text(update, style: .relative)
                    .font(.system(size: 10))
                    .foregroundStyle(Color.textMuted)
            }
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .background(
            isLive
                ? Color(red: 0.133, green: 0.773, blue: 0.369).opacity(0.15)
                : Color.white.opacity(0.06)
        )
        .clipShape(Capsule())
        .overlay(Capsule().stroke(Color.white.opacity(0.12), lineWidth: 1))
    }
}
