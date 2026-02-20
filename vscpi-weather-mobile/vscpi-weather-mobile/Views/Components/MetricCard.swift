// Views/Components/MetricCard.swift
// Glassmorphism metric card matching web app design
// accent color per metric: orange=temp, cyan=humidity, blue=wind, emerald=pressure, indigo=rain

import SwiftUI

struct MetricCard: View {
    var icon: String
    var label: String
    var value: String
    var unit: String
    var accentColor: Color = .accentBlue
    var subtitle: String? = nil   // optional status line e.g. "Normal" for pressure

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            // Icon + label row
            HStack(spacing: 6) {
                Image(systemName: icon)
                    .foregroundStyle(accentColor)
                    .font(.system(size: 13, weight: .semibold))
                Text(label)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundStyle(Color.textSecondary)
                Spacer()
            }

            // Value + unit on same line
            HStack(alignment: .lastTextBaseline, spacing: 3) {
                Text(value)
                    .font(.system(size: 22, weight: .bold, design: .rounded))
                    .monospacedDigit()
                    .foregroundStyle(Color.textPrimary)
                    .contentTransition(.numericText())
                Text(unit)
                    .font(.system(size: 12, weight: .regular))
                    .foregroundStyle(Color.textMuted)
            }

            if let sub = subtitle {
                Text(sub)
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(accentColor.opacity(0.8))
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .glassCard()
    }
}
