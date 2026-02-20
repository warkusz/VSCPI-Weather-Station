// Theme.swift
// Color palette + glass card helper matching the web dashboard design system

import SwiftUI

// MARK: - Colors (matching web app CSS variables)
extension Color {
    static let weatherBg    = Color(red: 0.027, green: 0.051, blue: 0.102)  // #070d1a
    static let accentBlue   = Color(red: 0.231, green: 0.510, blue: 0.965)  // #3b82f6 - wind
    static let accentCyan   = Color(red: 0.024, green: 0.714, blue: 0.831)  // #06b6d4 - humidity
    static let accentOrange = Color(red: 0.976, green: 0.451, blue: 0.086)  // #f97316 - temperature
    static let accentEmerald = Color(red: 0.204, green: 0.827, blue: 0.600) // #34d399 - pressure
    static let accentIndigo = Color(red: 0.506, green: 0.549, blue: 0.976)  // #818cf8 - rain
    static let accentGold   = Color(red: 0.980, green: 0.824, blue: 0.384)  // #FAD262 - trend
    static let accentPurple = Color(red: 0.545, green: 0.361, blue: 0.965)  // #8b5cf6
}

// MARK: - Text opacity helpers (matching CSS --text-secondary / --text-muted)
extension Color {
    static let textPrimary   = Color.white.opacity(0.95)
    static let textSecondary = Color.white.opacity(0.55)
    static let textMuted     = Color.white.opacity(0.35)
}

// MARK: - Glass card modifier
// Matches web app: background rgba(255,255,255,0.06) + 1px rgba(255,255,255,0.12) border
extension View {
    func glassCard(cornerRadius: CGFloat = 18) -> some View {
        self
            .background(Color.white.opacity(0.06))
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius)
                    .stroke(Color.white.opacity(0.12), lineWidth: 1)
            )
    }
}
