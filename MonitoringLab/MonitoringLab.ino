#include <ArduinoJson.h>

#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

// #include "CTBot.h"
// CTBot myBot;

#define DHTPIN D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char *ssid = "oppodea";
const char *password = "dea101010";
const char *host = "http://192.168.43.137/Monitoring/kirim.php";
// String token = "6444150259:AAFkK0IUQ8D7qvJ4ercfovUMuno_eAXm6ho"; // token bot telegram yang telah dibuat


const int Mq2 = A0;
const int pinBuzzer = D6;

LiquidCrystal_I2C lcd(0x27, 16, 2);



void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  pinMode(Mq2, INPUT);
  pinMode(pinBuzzer, OUTPUT);

  dht.begin();

  // Initialize LCD display
  lcd.begin();
  lcd.backlight();


}

void loop() {

  String temperature, humidity, postData, gas;

  int h = dht.readHumidity();
  int t = dht.readTemperature();
  int g = analogRead(Mq2);
  temperature = String(t);
  humidity = String(h);
  gas = String(g);

  // Print gas data on line 1, column 0
  lcd.setCursor(0, 0);
  lcd.print("ASAP : " + gas);

  // Print temperature data on line 2, column 0
  lcd.setCursor(0, 1);
  lcd.print("SUHU : " + temperature + " C");
  delay(1000);

   
    


  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, host);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String httpRequestData = "temperatur=" + temperature + "&kelembapan=" + humidity + "&gas=" + gas;
    int httpResponseCode = http.POST(httpRequestData);
  

    if (httpResponseCode == 200) {

      Serial.print("Asap : ");
      Serial.println(g);
      Serial.print("Temperatur : ");
      Serial.println(t);
      Serial.print("Kelembapan : ");
      Serial.println(h);

    

      if ((g > 150) || (t > 40)) {
        digitalWrite(pinBuzzer, HIGH);
    
      } else {
        digitalWrite(pinBuzzer, LOW);
      }
    } else {
      Serial.println("Kirim data Gagal");
    }

    http.end();
  }

  delay(3000);
}