import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow serialport native module to work in API routes (Node.js only)
  serverExternalPackages: ['serialport', '@serialport/parser-readline', 'bcryptjs'],
  // Empty turbopack config silences the "no turbopack config" warning
  turbopack: {},
  // Allow access from local network (phone, tablet on same WiFi)
  allowedDevOrigins: ['192.168.1.*', '172.20.10.*', '10.*.*.*'],
}

export default nextConfig
