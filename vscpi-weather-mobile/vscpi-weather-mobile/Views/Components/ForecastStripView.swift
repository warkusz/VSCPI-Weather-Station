// Views/Components/ForecastStripView.swift
// 7-day forecast horizontal strip matching web app forecast column

import SwiftUI

struct ForecastStripView: View {
    var forecast: [ForecastDay]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(forecast) { day in
                    VStack(spacing: 5) {
                        Text(day.id == 0 ? "Today" : day.dayLabel)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundStyle(day.id == 0 ? Color.accentBlue : Color.textSecondary)

                        Image(systemName: day.iconName)
                            .font(.system(size: 20))
                            .symbolRenderingMode(.multicolor)
                            .frame(height: 24)

                        Text(String(format: "%.0f°", day.maxTempC))
                            .font(.system(size: 15, weight: .semibold, design: .rounded))
                            .monospacedDigit()
                            .foregroundStyle(Color.textPrimary)
                    }
                    .frame(width: 56)
                    .padding(.vertical, 10)
                    .glassCard(cornerRadius: 12)
                }
            }
            .padding(.horizontal, 2)
        }
    }
}
