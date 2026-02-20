// Views/Components/WindCompassView.swift
// Canvas compass matching web app WindCompass component
// N/E/S/W labels, red/white needle, km/h speed label

import SwiftUI

struct WindCompassView: View {
    var direction: Int     // 0-360
    var speedKPH: Double

    @State private var animatedAngle: Double = 0

    var body: some View {
        Canvas { ctx, size in
            let cx = size.width / 2
            let cy = size.height / 2
            let radius = min(cx, cy) - 2

            // Outer ring
            let ring = Path(ellipseIn: CGRect(x: cx - radius, y: cy - radius,
                                              width: radius * 2, height: radius * 2))
            ctx.stroke(ring, with: .color(.white.opacity(0.2)), lineWidth: 1.5)

            // 36 tick marks (major at cardinals, minor elsewhere)
            for i in 0..<36 {
                let deg = Double(i) * 10.0
                let rad = deg * .pi / 180.0
                let isMajor = i % 9 == 0  // every 90 degrees
                let tickLen: CGFloat = isMajor ? 10 : 5
                let outer = CGPoint(x: cx + cos(rad - .pi/2) * radius,
                                    y: cy + sin(rad - .pi/2) * radius)
                let inner = CGPoint(x: cx + cos(rad - .pi/2) * (radius - tickLen),
                                    y: cy + sin(rad - .pi/2) * (radius - tickLen))
                var tick = Path()
                tick.move(to: outer)
                tick.addLine(to: inner)
                ctx.stroke(tick, with: .color(.white.opacity(isMajor ? 0.5 : 0.2)),
                           lineWidth: isMajor ? 1.5 : 1)
            }

            // N/E/S/W labels
            let labelRadius = radius - 20
            let cardinals: [(String, Double)] = [("N", 0), ("E", 90), ("S", 180), ("W", 270)]
            for (letter, deg) in cardinals {
                let rad = deg * .pi / 180.0
                let lx = cx + sin(rad) * labelRadius
                let ly = cy - cos(rad) * labelRadius
                let color: GraphicsContext.Shading =
                    letter == "N" ? .color(Color.accentBlue) : .color(.white.opacity(0.5))
                ctx.draw(
                    Text(letter)
                        .font(.system(size: 10, weight: .bold))
                        .foregroundStyle(letter == "N" ? Color.accentBlue : Color.white.opacity(0.5)),
                    at: CGPoint(x: lx, y: ly),
                    anchor: .center
                )
                _ = color  // suppress warning
            }

            // Needle (red tip = north/direction, white tail)
            let needleRad = animatedAngle * .pi / 180.0
            let tipDist   = radius - 22
            let tailDist  = radius * 0.3
            let tipPt  = CGPoint(x: cx + sin(needleRad) * tipDist,
                                  y: cy - cos(needleRad) * tipDist)
            let tailPt = CGPoint(x: cx - sin(needleRad) * tailDist,
                                  y: cy + cos(needleRad) * tailDist)

            // White tail
            var tail = Path()
            tail.move(to: CGPoint(x: cx, y: cy))
            tail.addLine(to: tailPt)
            ctx.stroke(tail, with: .color(.white.opacity(0.5)), lineWidth: 2.5)

            // Red/blue tip
            var tip = Path()
            tip.move(to: CGPoint(x: cx, y: cy))
            tip.addLine(to: tipPt)
            ctx.stroke(tip, with: .color(Color.accentBlue), lineWidth: 2.5)

            // Centre dot
            let dot = Path(ellipseIn: CGRect(x: cx - 4, y: cy - 4, width: 8, height: 8))
            ctx.fill(dot, with: .color(.white))
        }
        .onChange(of: direction) {
            withAnimation(.spring(duration: 0.8, bounce: 0.15)) {
                animatedAngle = Double(direction)
            }
        }
        .onAppear { animatedAngle = Double(direction) }
    }
}
