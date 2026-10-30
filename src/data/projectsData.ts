import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-blink',
    title: 'Precision Multi-Pattern LED Beacon',
    titleKu: 'لیدی ئاگادارکەرەوەی فرە-شێواز بە ئاردوینۆ',
    level: 'beginner',
    category: 'Beginner Projects',
    categoryKu: 'پڕۆژە سەرەتاییەکان',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    summary: 'Master electronic current limitation, timing logic without delay(), and multi-LED sequencing for emergency vehicles.',
    summaryKu: 'فێربوونی کۆنترۆڵی لیدەکان، دیاریکردنی کاتی دروست بەبێ وەستاندنی پرۆسێسەر، و زنجیرەی ڕووناکی.',
    difficultyRating: 1,
    estimatedCost: '$3 - $5 USD',
    timeNeeded: '20 mins',
    components: [
      { name: 'Arduino Uno or Nano', quantity: 1 },
      { name: '5mm Red Diffused LEDs', quantity: 3 },
      { name: '220 Ohm 1/4W Resistors', quantity: 3 },
      { name: 'Breadboard & Jumper Wires', quantity: 1 }
    ],
    circuitSummary: 'Connect each LED anode through an independent 220Ω resistor to digital pins 11, 12, and 13. Tie all cathodes to common Arduino GND.',
    circuitSummaryKu: 'هەر لیدێک لەڕێگەی بەرگرییەکی ٢٢٠ ئۆم دەبەسترێت بە پینەکانی ١١، ١٢، و ١٣. هەموو بەشە سالبەکانیش بە گراوندی ئاردوینۆ دەبەسترێن.',
    wiringSteps: [
      'Insert the 3 LEDs onto the breadboard with proper spacing.',
      'Connect a 220Ω resistor from Pin 11 to the anode (+) of LED 1.',
      'Connect a 220Ω resistor from Pin 12 to the anode (+) of LED 2.',
      'Connect a 220Ω resistor from Pin 13 to the anode (+) of LED 3.',
      'Connect a black jumper wire from the negative rail of the breadboard to an Arduino GND pin.'
    ],
    wiringStepsKu: [
      'لیدەکان لەسەر برێدبۆردەکە جێگیر بکە بە مەودای گونجاو.',
      'بەرگرییەکی ٢٢٠ ئۆم لە پینی ١١ـەوە ببەستە بە قۆڵی موجەبی لیدی یەکەم.',
      'بەرگرییەکی ٢٢٠ ئۆم لە پینی ١٢ـەوە ببەستە بە قۆڵی موجەبی لیدی دووەم.',
      'بەرگرییەکی ٢٢٠ ئۆم لە پینی ١٣ـەوە ببەستە بە قۆڵی موجەبی لیدی سێیەم.',
      'وایەرێکی ڕەش لە هێڵی سالبی برێدبۆردەوە ببەستە بە پینی GND لەسەر ئاردوینۆکە.'
    ],
    code: `// KRD Arduino Universe - Multi-LED Pattern Controller
const int leds[] = {11, 12, 13};
const int numLeds = 3;

void setup() {
  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
  }
}

void loop() {
  // Pattern 1: Knight Rider Chase
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], HIGH);
    delay(120);
    digitalWrite(leds[i], LOW);
  }
  for (int i = numLeds - 2; i > 0; i--) {
    digitalWrite(leds[i], HIGH);
    delay(120);
    digitalWrite(leds[i], LOW);
  }
}`,
    testingSteps: [
      'Connect Arduino to your computer via USB.',
      'In Arduino IDE or Code Studio, select Arduino Uno and correct COM port.',
      'Upload sketch and observe smooth chaser light bouncing left and right.'
    ],
    testingStepsKu: [
      'ئاردوینۆکە بە کێبڵی USB ببەستە بە کۆمپیوتەرەکەت.',
      'کۆدەکە ئەپڵۆد بکە و بڕوانە ترووکە و جوڵەی نەرمی لیدەکان بەدوای یەکدا.'
    ],
    troubleshootingTips: [
      'If an LED is not lighting, check polarity: the flat edge and shorter leg must connect to GND.',
      'If the lights are dim, verify you used 220Ω (Red-Red-Brown) rather than 220kΩ.'
    ],
    troubleshootingTipsKu: [
      'ئەگەر لیدێک داگیرسان نەکرد، جەمسەری موجەب و سالبی پێچەوانە بکەرەوە.',
      'ئەگەر ڕووناکییەکە زۆر کز بوو، دڵنیابە بەرگری ٢٢٠ ئۆمت بەکارهێناوە نەک ٢٢٠ کیلۆ ئۆم.'
    ]
  },
  {
    id: 'proj-ultrasonic-radar',
    title: 'Interactive Sonar Radar with SG90 & HC-SR04',
    titleKu: 'سیستەمی ڕاداری ئەڵتراسۆنیک بە مۆتۆڕی سێرڤۆ و دەنگدانەوە',
    level: 'intermediate',
    category: 'Robotics',
    categoryKu: 'ڕۆبۆتیک (Robotics)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    summary: 'Build a 180° scanning acoustic radar that maps spatial obstacles in real-time, outputting angular telemetry to Serial.',
    summaryKu: 'دروستکردنی ڕادارێکی چاودێری ١٨٠ پلەیی کە تەنەکان لە دەوروبەردا دەستنیشان دەکات لەڕێگەی شەپۆلی دەنگ.',
    difficultyRating: 3,
    estimatedCost: '$12 - $16 USD',
    timeNeeded: '45 mins',
    components: [
      { name: 'Arduino Uno R3', quantity: 1 },
      { name: 'HC-SR04 Ultrasonic Sensor', quantity: 1 },
      { name: 'SG90 9g Micro Servo', quantity: 1 },
      { name: 'Mounting bracket / Hot glue', quantity: 1 },
      { name: 'Jumper Wires & Breadboard', quantity: 1 }
    ],
    circuitSummary: 'Servo PWM signal connected to Pin 9. HC-SR04 Trig to Pin 10, Echo to Pin 11. Sensor is mounted directly atop the servo horn.',
    circuitSummaryKu: 'سیگناڵی سێرڤۆ لە پین ٩، تریگەری ئەڵتراسۆنیک لە پین ١٠، و ئیكۆ لە پین ١١. حەساسەکە لەسەر سەری مۆتۆڕی سێرڤۆکە دادەنرێت.',
    wiringSteps: [
      'Attach the HC-SR04 sensor firmly to the horn of the SG90 servo.',
      'Connect Servo Red wire to 5V, Brown wire to GND, Orange wire to Arduino Pin 9.',
      'Connect HC-SR04 VCC to 5V, GND to GND.',
      'Connect Trig to Arduino Pin 10, Echo to Arduino Pin 11.'
    ],
    wiringStepsKu: [
      'هەستەوەری HC-SR04 بە سەری مۆتۆڕی سێرڤۆکەوە ببەستە بە شێوەیەکی توند.',
      'وایەری سووری سێرڤۆ بە ٥ ڤۆڵت، قاوەیی بە گراوند، و پرتەقاڵی بە پینی ٩ ببەستە.',
      'پینی VCC و GNDی هەستەوەرەکە بە کارەبا و گراوندی بۆردەکە ببەستە.',
      'پینی Trig بە پین ١٠ و پینی Echo بە پین ١١ ببەستە.'
    ],
    code: `// KRD Arduino Universe - Ultrasonic Sweep Radar
#include <Servo.h>

const int trigPin = 10;
const int echoPin = 11;
const int servoPin = 9;

Servo radarServo;

long calculateDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 25000); // 25ms timeout
  if (duration == 0) return 400; // max distance
  return (duration * 0.0343) / 2;
}

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  radarServo.attach(servoPin);
}

void loop() {
  // Sweep left to right (15° to 165°)
  for (int angle = 15; angle <= 165; angle += 2) {
    radarServo.write(angle);
    delay(30);
    long dist = calculateDistance();
    Serial.print(angle);
    Serial.print(",");
    Serial.println(dist);
  }
  // Sweep right to left
  for (int angle = 165; angle >= 15; angle -= 2) {
    radarServo.write(angle);
    delay(30);
    long dist = calculateDistance();
    Serial.print(angle);
    Serial.print(",");
    Serial.println(dist);
  }
}`,
    testingSteps: [
      'Upload sketch and open Arduino Serial Monitor at 115200 baud.',
      'Observe continuous streaming output in format: "angle,distance".',
      'Place a cardboard box 25cm away and verify that angle dips to 25cm.'
    ],
    testingStepsKu: [
      'کۆدەکە ئەپڵۆد بکە و پەنجەرەی Serial Monitor بکەرەوە بە خێرایی 115200.',
      'داتاکان دەردەکەون بە شێوازی (زاویە، دووری). کارتۆنێک لە بەردەمی دانێ و وردی پێوانەکە ببینە.'
    ],
    troubleshootingTips: [
      'If servo jitter causes Arduino to reset, add a 470µF electrolytic capacitor across 5V and GND.',
      'Ensure baud rate is set to 115200 in Serial Monitor, otherwise output will show gibberish.'
    ],
    troubleshootingTipsKu: [
      'ئەگەر سێرڤۆکە لەکاتی جوڵەدا بۆردەکەی ڕیسێت کرد، خازنێک لە نێوان ٥ ڤۆڵت و گراوند دانێ.',
      'دڵنیابە خێرایی سیریەڵ مۆنیتەر لەسەر 115200 دانراوە تا پیتەکان تێک نەچن.'
    ]
  },
  {
    id: 'proj-smart-lock',
    title: 'RFID & Keypad Dual-Authentication Security Door Lock',
    titleKu: 'سیستەمی قوفڵی زیرەک بە کارتی RFID و ژمارەی نهێنی Keypad',
    level: 'intermediate',
    category: 'Security Systems',
    categoryKu: 'سیستەمەکانی پاراستن و ئاسایش',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    summary: 'Build an access-control security door lock that checks authorized 13.56MHz Mifare RFID tags and 4-digit PIN passwords.',
    summaryKu: 'دروستکردنی سیستەمی دەرگای ئەمنی کە بە کارتی زیرەکی RFID و کۆدی ژمارەیی دەرگاکە دەکاتەوە بە لێدانی سێرڤۆ.',
    difficultyRating: 4,
    estimatedCost: '$22 - $28 USD',
    timeNeeded: '1 hour 15 mins',
    components: [
      { name: 'Arduino Uno or Mega', quantity: 1 },
      { name: 'RC522 13.56MHz RFID Reader + Tag', quantity: 1 },
      { name: '4x4 Matrix Membrane Keypad', quantity: 1 },
      { name: 'SG90 or MG996R Metal Gear Servo', quantity: 1 },
      { name: '1602 LCD I2C Display', quantity: 1 },
      { name: 'Buzzer & Indicator LEDs', quantity: 2 }
    ],
    circuitSummary: 'RC522 communicates over hardware SPI (Pins 10, 11, 12, 13, 9). LCD over I2C (A4, A5). Keypad on digital pins 2-8.',
    circuitSummaryKu: 'هەستەوەری RC522 بە پرۆتۆکۆلی SPI دەبەسترێت، شاشەی LCD بە پرۆتۆکۆلی I2C دەبەسترێت، و کیپاد بە پینە دیجیتالەکان.',
    wiringSteps: [
      'Wire RC522 RFID: SDA->D10, SCK->D13, MOSI->D11, MISO->D12, RST->D9, 3.3V power (DO NOT CONNECT TO 5V!).',
      'Wire 1602 LCD: SDA->A4, SCL->A5, VCC->5V, GND->GND.',
      'Connect Servo on Pin 6 (Actuates the mechanical deadbolt).',
      'Connect Keypad row/col headers to pins 2 through 8.'
    ],
    wiringStepsKu: [
      'بەستنی RFID: SDA->10, SCK->13, MOSI->11, MISO->12, RST->9، کارەباکەی ٣.٣ ڤۆڵتە (بە ٥ ڤۆڵتی مەبەستە!).',
      'شاشەی LCD: پینی SDA بۆ A4 و پینی SCL بۆ A5.',
      'مۆتۆڕی سێرڤۆ لەسەر پینی ٦ دادەنرێت بۆ کێشانی قوفڵەکە.'
    ],
    code: `// KRD Arduino Universe - Smart Lock Core
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);
Servo lockServo;
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Replace with your authorized RFID UID hex bytes
byte authorizedUID[4] = {0xDE, 0xAD, 0xBE, 0xEF};

void setup() {
  SPI.begin();
  mfrc522.PCD_Init();
  lockServo.attach(6);
  lockServo.write(0); // Locked position
  lcd.init();
  lcd.backlight();
  lcd.print("Scan RFID Card..");
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  
  bool match = true;
  for (byte i = 0; i < 4; i++) {
    if (mfrc522.uid.uidByte[i] != authorizedUID[i]) match = false;
  }

  if (match) {
    lcd.clear();
    lcd.print("ACCESS GRANTED!");
    lockServo.write(90); // Unlock deadbolt
    delay(4000);
    lockServo.write(0);  // Re-lock
    lcd.clear();
    lcd.print("Scan RFID Card..");
  } else {
    lcd.clear();
    lcd.print("ACCESS DENIED!");
    delay(2000);
    lcd.clear();
    lcd.print("Scan RFID Card..");
  }
  mfrc522.PICC_HaltA();
}`,
    testingSteps: [
      'Upload sketch and read your card UID from the Serial monitor on first run.',
      'Paste the 4 hex bytes into the authorizedUID array in code and re-upload.',
      'Swipe the card within 2 cm of the antenna to open the servo latch.'
    ],
    testingStepsKu: [
      'لە یەکەم جاردا کۆدەکە لێبدە و ژمارەی کارتی تایبەتی خۆت لە Serial monitor کۆپی بکە.',
      'ژمارەی کارتەکە لەناو کۆدەکە دابنێ و دەستکاری بکە، ئینجا کارتەکە لە حەساسەکە نزیک بکەرەوە.'
    ],
    troubleshootingTips: [
      'RC522 operates strictly on 3.3V! Connecting it to 5V will permanently burn the RFID frontend transceiver.',
      'Ensure SPI pins are matched to your specific board: Uno uses 11, 12, 13; Mega uses 50, 51, 52.'
    ],
    troubleshootingTipsKu: [
      'مۆدیولی RC522 تەنها ٣.٣ ڤۆڵت وەردەگرێت، دانانی ٥ ڤۆڵت چیپەکە دەسوتێنێت.',
      'دڵنیابە لە پینەکانی پرۆتۆکۆلی SPI بەپێی جۆری بۆردەکەت.'
    ]
  },
  {
    id: 'proj-esp32-weather',
    title: 'ESP32 IoT Cloud Weather Station with OLED & Web Dashboard',
    titleKu: 'وێستگەی کەشناسی ئینتەرنێتی ESP32 بە شاشەی گرافیکی و داشبۆردی وێب',
    level: 'advanced',
    category: 'IoT',
    categoryKu: 'ئینتەرنێتی شتەکان (IoT)',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&auto=format&fit=crop&q=80',
    summary: 'Stream live ambient temperature, humidity, and heat index to an integrated web dashboard and crisp SSD1306 OLED screen.',
    summaryKu: 'ناردنی زانیاری پلەی گەرمی و شێداری لە کاتی ڕاستەقینەدا بۆ سەر وێبسایت و نیشاندانی لەسەر شاشەی OLED.',
    difficultyRating: 4,
    estimatedCost: '$18 - $24 USD',
    timeNeeded: '1 hour',
    components: [
      { name: 'ESP32 NodeMCU DevKit', quantity: 1 },
      { name: 'DHT22 High-Precision Sensor', quantity: 1 },
      { name: '0.96" I2C OLED SSD1306', quantity: 1 },
      { name: 'Breadboard & Jumpers', quantity: 1 }
    ],
    circuitSummary: 'DHT22 Data pin connected to ESP32 GPIO 4 with a 10k pullup. OLED connected to default I2C pins GPIO 21 (SDA) and GPIO 22 (SCL).',
    circuitSummaryKu: 'هەستەوەری DHT22 لەسەر پینی GPIO 4 و شاشەی OLED لەسەر پینەکانی I2C ٢١ بۆ SDA و ٢٢ بۆ SCL دەبەسترێن.',
    wiringSteps: [
      'Power rails: Connect ESP32 3V3 and GND to the breadboard rails.',
      'OLED: VCC->3.3V, GND->GND, SDA->GPIO 21, SCL->GPIO 22.',
      'DHT22: Pin 1 (VCC)->3.3V, Pin 2 (Data)->GPIO 4, Pin 4 (GND)->GND.',
      'Place a 10k resistor between DHT22 VCC and Data pin.'
    ],
    wiringStepsKu: [
      'هێڵی کارەبا: پینی ٣.٣ ڤۆڵت و گراوندی ESP32 ببەستە بە برێدبۆردەکە.',
      'شاشەی OLED: ڤۆڵتیە بە ٣.٣ ڤۆڵت، گراوند بە گراوند، SDA بە GPIO 21 و SCL بە GPIO 22.',
      'هەستەوەری DHT22: پینی داتا بە GPIO 4 ببەستە لەگەڵ بەرگری ١٠ کیلۆ ئۆم.'
    ],
    code: `// KRD Arduino Universe - ESP32 IoT Weather Node
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>
#include <Adafruit_SSD1306.h>

#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);
Adafruit_SSD1306 display(128, 64, &Wire, -1);
WebServer server(80);

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASS";

void handleRoot() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  String html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1'><meta http-equiv='refresh' content='3'>";
  html += "<style>body{background:#070b14;color:#00d9ff;font-family:sans-serif;text-align:center;padding:40px;}</style></head><body>";
  html += "<h1>KRD Weather Station</h1>";
  html += "<div style='font-size:2rem;margin:20px;'>Temperature: <b>" + String(t, 1) + " &deg;C</b></div>";
  html += "<div style='font-size:2rem;margin:20px;color:#8057ff;'>Humidity: <b>" + String(h, 1) + " %</b></div>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(0, 10);
  display.println("Connecting WiFi...");
  display.display();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("WiFi Online!");
  display.println(WiFi.localIP());
  display.display();

  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
}`,
    testingSteps: [
      'Enter your WiFi credentials in the code.',
      'Upload sketch with ESP32 board selected.',
      'Check OLED for the assigned local IP address (e.g. 192.168.1.45).',
      'Open that IP in your phone browser to see real-time graphs and readings.'
    ],
    testingStepsKu: [
      'ناوو کۆدی وایفای ماڵەوەتان لە کۆدەکە بنووسە.',
      'کۆدەکە ئەپڵۆد بکە بۆ ناو ESP32.',
      'سەیری شاشەی OLED بکە تا ئایپی (IP) دەرکەوێت.',
      'ئەو ئایپییە لە وێبگەڕی مۆبایلەکەت بکەرەوە تا پلەی گەرمی و شێداری ببینیت.'
    ],
    troubleshootingTips: [
      'If OLED does not initialize, scan I2C addresses using the scanner utility to check if it responds on 0x3C or 0x3D.',
      'ESP32 requires a stable 2.4 GHz Wi-Fi band; it cannot connect to 5 GHz only routers.'
    ],
    troubleshootingTipsKu: [
      'ئەگەر شاشەکە کاری نەکرد، دڵنیابە لە ئەدرێسی 0x3C یان 0x3D لەڕێگەی I2C scanner.',
      'مایکرۆکۆنترۆلەری ESP32 تەنها کار بە فریکوێنسی وایفای ٢.٤ گێگاهێرتز دەکات نەک ٥ گێگاهێرتز.'
    ]
  }
];
