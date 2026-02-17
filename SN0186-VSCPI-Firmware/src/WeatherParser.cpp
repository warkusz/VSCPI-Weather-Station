#include "WeatherParser.h"

int WeatherParser::extractInt(String data, int start, int length) {
  if (start + length > data.length()) {
    return -1;
  }
  String substr = data.substring(start, start + length);
  return substr.toInt();
}

WeatherData WeatherParser::parse(String data) {
  WeatherData weather;
  weather.isValid = false;
  weather.rainfallValid = true;

  data.trim();

  if (data.length() < 36) {
    Serial.println("Invalid data length: " + String(data.length()));
    return weather;
  }

  if (data.charAt(0) != 'c' || data.indexOf('*') == -1) {
    Serial.println("Invalid data format");
    return weather;
  }

  // ========== PARSE RAW VALUES ==========
  // Format: c000s000g000t075r453p453h45b09830*3A
  // Index:  0123456789012345678901234567890123456
  //                   1111111111222222222233333333

  // c000 - Wind Direction (0-360 degrees) — chars 1,2,3
  weather.windDirection = extractInt(data, 1, 3);

  // s000 - Wind Speed Average (mph, 1-min avg) — chars 5,6,7
  weather.windSpeedAvg = extractInt(data, 5, 3);

  // g000 - Wind Gust (mph, max over 5 min) — chars 9,10,11
  weather.windGust = extractInt(data, 9, 3);

  // t075 - Temperature (°F) — chars 13,14,15
  weather.temperature = extractInt(data, 13, 3);

  // r453 - Rainfall last 1 hour (0.01 inches) — chars 17,18,19
  weather.rainfall1h = extractInt(data, 17, 3);

  // p453 - Rainfall last 24 hours (0.01 inches) — chars 21,22,23
  weather.rainfall24h = extractInt(data, 21, 3);

  // h45 - Humidity (percentage) — chars 25,26
  weather.humidity = extractInt(data, 25, 2);

  // b09830 - Barometric Pressure (0.1 mbar) — chars 28,29,30,31,32
  weather.pressure = extractInt(data, 28, 5);

  // *3A - Checksum
  int checksumPos = data.indexOf('*');
  if (checksumPos != -1) {
    weather.checksum = data.substring(checksumPos + 1);
  }

  // ========== CONVERT TO USEFUL UNITS ==========

  // Temperature conversions (raw value is °F)
  weather.tempF = (float)weather.temperature;
  weather.tempC = (weather.tempF - 32.0f) * 5.0f / 9.0f;

  // Wind speed conversions (raw values are mph)
  weather.windSpeedMPH = (float)weather.windSpeedAvg;
  weather.windSpeedMS = weather.windSpeedMPH * 0.44704f; // MPH to m/s

  weather.windGustMPH = (float)weather.windGust;
  weather.windGustMS = weather.windGustMPH * 0.44704f;

  // Rainfall conversions
  // Special handling: 453 means rain sensor error/not connected
  if (weather.rainfall1h == 453 || weather.rainfall24h == 453) {
    weather.rainfallValid = false;
    weather.rainfallInch1h = 0;
    weather.rainfallMM1h = 0;
    weather.rainfallInch24h = 0;
    weather.rainfallMM24h = 0;
  } else {
    weather.rainfallInch1h = weather.rainfall1h * 0.01;   // 0.01" units
    weather.rainfallMM1h = weather.rainfallInch1h * 25.4; // Inches to mm

    weather.rainfallInch24h = weather.rainfall24h * 0.01;
    weather.rainfallMM24h = weather.rainfallInch24h * 25.4;
  }

  weather.humidityPercent = weather.humidity;

  weather.pressureMbar = weather.pressure / 10.0;        // 0.1 mbar units
  weather.pressureInHg = weather.pressureMbar * 0.02953; // mbar to inHg

  weather.isValid = true;

  return weather;
}

bool WeatherParser::validateChecksum(String data) {
  // TODO
  return true;
}

void WeatherParser::printData(WeatherData &weather) {
  if (!weather.isValid) {
    Serial.println("Invalid weather data");
    return;
  }

  Serial.println("\n╔════════════════════════════════════════╗");
  Serial.println("║        WEATHER STATION DATA            ║");
  Serial.println("╠════════════════════════════════════════╣");

  Serial.printf("║ 🌡️  Temperature:  %.1f°F / %.1f°C\n", weather.tempF,
                weather.tempC);

  Serial.printf("║ 💧 Humidity:      %d%%\n", weather.humidity);

  Serial.printf("║ 🔽 Pressure:      %.1f mbar / %.2f inHg\n",
                weather.pressureMbar, weather.pressureInHg);

  String windDir = "";
  if (weather.windDirection >= 0 && weather.windDirection < 23)
    windDir = "N";
  else if (weather.windDirection < 68)
    windDir = "NE";
  else if (weather.windDirection < 113)
    windDir = "E";
  else if (weather.windDirection < 158)
    windDir = "SE";
  else if (weather.windDirection < 203)
    windDir = "S";
  else if (weather.windDirection < 248)
    windDir = "SW";
  else if (weather.windDirection < 293)
    windDir = "W";
  else if (weather.windDirection < 338)
    windDir = "NW";
  else
    windDir = "N";

  Serial.printf("║ 🧭 Wind Dir:      %d° (%s)\n", weather.windDirection,
                windDir.c_str());

  Serial.printf("║ 💨 Wind Speed:    %.1f mph / %.1f m/s\n",
                weather.windSpeedMPH, weather.windSpeedMS);

  Serial.printf("║ 🌪️  Wind Gust:     %.1f mph / %.1f m/s\n",
                weather.windGustMPH, weather.windGustMS);

  if (weather.rainfallValid) {
    Serial.printf("║ ☔ Rain (1h):     %.2f\" / %.1f mm\n",
                  weather.rainfallInch1h, weather.rainfallMM1h);
    Serial.printf("║ ☔ Rain (24h):    %.2f\" / %.1f mm\n",
                  weather.rainfallInch24h, weather.rainfallMM24h);
  } else {
    Serial.println("║ ☔ Rain:          SENSOR ERROR (453)");
  }

  Serial.printf("║ 📝 Checksum:     *%s\n", weather.checksum.c_str());
  Serial.println("╚════════════════════════════════════════╝\n");
}
