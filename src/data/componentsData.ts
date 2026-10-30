import { ComponentItem } from '../types';

export const componentsData: ComponentItem[] = [
  // ARDUINO BOARDS
  {
    id: 'comp-uno',
    name: 'Arduino Uno R3',
    category: 'Arduino Boards',
    categoryKu: 'بۆردەکانی ئاردوینۆ',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    description: 'The world\'s most popular microcontroller prototyping board, powered by the Microchip ATmega328P 8-bit AVR processor.',
    descriptionKu: 'بەناوبانگترین بۆردی فێربوون و پڕۆگرامسازی لە جیهاندا، بە چیپی بەهێزی ATmega328P.',
    operatingVoltage: '5V (Input VIN: 7-12V DC)',
    currentDraw: '45 mA nominal (Max 200 mA total across all pins)',
    workingPrinciple: 'Executes instructions sequentially at 16 MHz from 32 KB Flash memory with 14 digital I/O pins and 6 10-bit analog inputs.',
    workingPrincipleKu: 'جێبەجێکردنی فەرمانەکان بە خێرایی ١٦ مێگاهێرتز لە یادگەی Flash بە ١٤ پینی دیجیتال و ٦ پینی ئانالۆگ.',
    pinout: [
      { pin: 'D0 (RX) / D1 (TX)', function: 'Hardware Serial UART', functionKu: 'پەیوەندی زنجیرەیی یو ئارت' },
      { pin: 'D3, D5, D6, D9, D10, D11', function: '8-bit PWM Output (~)', functionKu: 'دەرچەی ترپەی PWM' },
      { pin: 'A0 - A5', function: '10-bit Analog Inputs (0-1023)', functionKu: 'دەرچەی خوێندنەوەی ئانالۆگ' },
      { pin: 'A4 (SDA) / A5 (SCL)', function: 'I2C Bus Communication', functionKu: 'پەیوەندی پرۆتۆکۆلی I2C' },
      { pin: '5V / 3.3V / GND / VIN', function: 'Power Distribution Rails', functionKu: 'پینەکانی دابەشکردنی کارەبا' }
    ],
    wiringTip: 'Limit current on any single GPIO pin to under 20 mA (absolute max 40 mA). Always power motors via external batteries rather than 5V pin.',
    wiringTipKu: 'تەزووی هیچ پینێک لە ٢٠ میلی ئەمپێر زیاتر نەبێت. مۆتۆڕەکان هەمیشە بە پاتری سەربەخۆ کارپێبکە نەک ڕاستەوخۆ بە پینی ٥ ڤۆڵت.',
    exampleCode: `// Arduino Uno - Built-in LED Blink
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
    relatedProjects: ['proj-blink', 'proj-ultrasonic-radar', 'proj-home-auto'],
    datasheetUrl: 'https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf'
  },
  {
    id: 'comp-esp32',
    name: 'ESP32 DevKit V1 (30-Pin)',
    category: 'Arduino Boards',
    categoryKu: 'بۆردەکانی ئاردوینۆ',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80',
    description: 'High performance dual-core 32-bit SoC with integrated 2.4 GHz Wi-Fi and Bluetooth v4.2 BLE.',
    descriptionKu: 'مایکرۆکۆنترۆلەری دوو ناووکی پێشکەوتوو بە پرۆسێسەری ٣٢ بیتی و وایفای و بلوتوثی ناوەکی.',
    operatingVoltage: '3.3V Logic (5V input via Micro-USB)',
    currentDraw: '80 - 240 mA depending on Wi-Fi TX state',
    workingPrinciple: 'Xtensa Dual-Core 32-bit LX6 running at up to 240 MHz with capacitive touch sensors, Hall sensor, and hardware crypto acceleration.',
    workingPrincipleKu: 'پرۆسێسەری دوو ناووک بە خێرایی تا ٢٤٠ مێگاهێرتز بە هەستەوەری تاچ و ئەپڵیکەیشنی IoT.',
    pinout: [
      { pin: 'GPIO 2', function: 'Built-in Blue LED / Boot strapping', functionKu: 'لیدی شینی ناوەکی بۆرد' },
      { pin: 'GPIO 21 (SDA) / 22 (SCL)', function: 'Default I2C Pins', functionKu: 'پینەکانی پرۆتۆکۆلی I2C' },
      { pin: 'GPIO 34, 35, 36, 39', function: 'Input-Only ADC Pins (No Pullup)', functionKu: 'تەنها بۆ خوێندنەوەی ئانالۆگ' }
    ],
    wiringTip: 'NEVER apply 5V logic signals to ESP32 pins! Use a logic level shifter or 2:1 resistor voltage divider to step down 5V to 3.3V.',
    wiringTipKu: 'هەرگیز ڤۆڵتیەی ٥ ڤۆڵت مەدە بە پینەکانی ESP32 چونکە دەسوتێن، هەمیشە شیفتەر یان دابەشکەر بەکاربهێنە.',
    exampleCode: `// ESP32 Wi-Fi Scanner Sketch
#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.println("ESP32 Wi-Fi Initialized!");
}

void loop() {
  Serial.println("Scanning available networks...");
  int n = WiFi.scanNetworks();
  if (n == 0) {
    Serial.println("No networks found.");
  } else {
    Serial.printf("%d networks found:\\n", n);
    for (int i = 0; i < n; ++i) {
      Serial.printf("%d: %s (%d dBm)\\n", i + 1, WiFi.SSID(i).c_str(), WiFi.RSSI(i));
    }
  }
  delay(5000);
}`,
    relatedProjects: ['proj-esp32-weather', 'proj-iot-door'],
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf'
  },

  // SENSORS
  {
    id: 'comp-hcsr04',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    category: 'Sensors',
    categoryKu: 'هەستەوەرەکان (Sensors)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    description: 'Precision non-contact sonar module measuring distances from 2 cm up to 400 cm with 3mm accuracy.',
    descriptionKu: 'هەستەوەری پێوانەکردنی دووری بە شەپۆلی دەنگ لە نێوان ٢ سم تا ٤٠٠ سم بە وردی بەرز.',
    operatingVoltage: '5V DC',
    currentDraw: '15 mA active',
    workingPrinciple: 'Piezoelectric transmitter sends 40kHz sonic bursts; echo duration reflects roundtrip transit time.',
    workingPrincipleKu: 'ناردنی ترپەی دەنگی ٤٠ کیلۆهێرتز و ئەژمارکردنی کاتی گەڕانەوەی دەنگ بۆ زانینی دووری تەنەکان.',
    pinout: [
      { pin: 'VCC', function: '+5V Power Supply', functionKu: 'کارەبای ٥ ڤۆڵت' },
      { pin: 'Trig', function: 'Trigger Input (10µs TTL pulse)', functionKu: 'پینی ناردنی سیگناڵ' },
      { pin: 'Echo', function: 'Echo Pulse Output (Width = time)', functionKu: 'پینی وەرگرتنەوەی دەنگدانەوە' },
      { pin: 'GND', function: 'Ground (0V)', functionKu: 'گراوند' }
    ],
    wiringTip: 'If using with 3.3V boards (ESP32/Raspberry Pi), put a 1kΩ / 2kΩ resistor divider on the Echo output pin.',
    wiringTipKu: 'ئەگەر لەگەڵ بۆردی ٣.٣ ڤۆڵت بەکارهات، دابەشکەری بەرگری لەسەر Echo دانێ تا زیان بە بۆردەکە نەگات.',
    exampleCode: `// HC-SR04 Sonar Distance Measurement
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distanceCm = (duration * 0.0343) / 2.0;

  Serial.print("Measured Distance: ");
  Serial.print(distanceCm);
  Serial.println(" cm");
  delay(150);
}`,
    relatedProjects: ['proj-ultrasonic-radar', 'proj-obstacle-robot'],
    datasheetUrl: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf'
  },
  {
    id: 'comp-dht11',
    name: 'DHT11 Temperature & Humidity Sensor',
    category: 'Sensors',
    categoryKu: 'هەستەوەرەکان (Sensors)',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    description: 'Calibrated digital output composite sensor providing temperature (0-50°C) and relative humidity (20-90% RH).',
    descriptionKu: 'هەستەوەری دیجیتال بۆ پێوانی پلەی گەرمی و ڕێژەی شێداری هەوا بە وردی و نرخی گونجاو.',
    operatingVoltage: '3.3V to 5.5V DC',
    currentDraw: '0.5 - 2.5 mA during conversion (100 µA standby)',
    workingPrinciple: 'Capacitive humidity sensing element and NTC thermistor connected to an onboard 8-bit microcontroller serializing 40-bit data packets.',
    workingPrincipleKu: 'پێکهاتەی خازنی بۆ شێداری و بەرگری گەرمی NTC بۆ پلەی گەرمی کە داتاکان بە پۆلی ٤٠ بیتی دەنێرێت.',
    pinout: [
      { pin: 'Pin 1 (VCC)', function: 'Power 3.3V - 5V', functionKu: 'کارەبا' },
      { pin: 'Pin 2 (Data)', function: 'Single-bus Serial Data', functionKu: 'پینی ناردنی داتا' },
      { pin: 'Pin 3 (NC)', function: 'No Connection', functionKu: 'بەستراو نییە' },
      { pin: 'Pin 4 (GND)', function: 'Ground (0V)', functionKu: 'گراوند' }
    ],
    wiringTip: 'Connect a 5kΩ - 10kΩ pull-up resistor between the Data pin and VCC for reliable communication on long wires.',
    wiringTipKu: 'بەرگرییەکی ٥ تا ١٠ کیلۆ ئۆم لە نێوان داتا و ڤۆڵتیە دابنێ بۆ ڕێگریکردن لە بچڕانی داتا.',
    exampleCode: `// DHT11 Ambient Temperature & Humidity Readout
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("DHT11 Sensor Online!");
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\\t Temperature: ");
  Serial.print(t);
  Serial.println(" *C");

  delay(2000);
}`,
    relatedProjects: ['proj-greenhouse', 'proj-esp32-weather'],
    datasheetUrl: 'https://www.mouser.com/datasheet/2/758/DHT11-Technical-Data-Sheet-Translated_Version-1277665.pdf'
  },
  {
    id: 'comp-pir',
    name: 'HC-SR501 PIR Motion Sensor',
    category: 'Sensors',
    categoryKu: 'هەستەوەرەکان (Sensors)',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&auto=format&fit=crop&q=80',
    description: 'Pyroelectric infrared motion detector sensing human body heat movement within 7 meters and 120° field of view.',
    descriptionKu: 'هەستەوەری تیشکی ژێرسوور بۆ هەستکردن بە جوڵەی مرۆڤ و گیانداران تا مەودای ٧ مەتر بە گۆشەی ١٢٠ پلە.',
    operatingVoltage: '4.5V - 20V DC (Internal 3.3V regulator)',
    currentDraw: '65 µA quiescent',
    workingPrinciple: 'Dual pyroelectric elements detect infrared temperature gradients focusing through a Fresnel lens array.',
    workingPrincipleKu: 'دۆزینەوەی جیاوازی پلەی گەرمی تیشکی ژێرسووری لەشی مرۆڤ لەڕێگەی هاوێنەی فرێسنێل.',
    pinout: [
      { pin: 'VCC', function: 'Power Input (5V)', functionKu: 'کارەبا' },
      { pin: 'OUT', function: '3.3V TTL High logic when motion detected', functionKu: 'دەرچەی سیگناڵ' },
      { pin: 'GND', function: 'Ground (0V)', functionKu: 'گراوند' }
    ],
    wiringTip: 'Wait 30-60 seconds after powering on for the internal infrared calibration to settle before reading output.',
    wiringTipKu: 'دوای کارپێکردن ٣٠ تا ٦٠ چرکە چاوەڕێ بکە تا هەستەوەرەکە لەگەڵ دەوروبەر دەگونجێت ئینجا داتا بخوێنەوە.',
    exampleCode: `// PIR Motion Detector
const int pirPin = 7;
const int ledPin = 13;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int motion = digitalRead(pirPin);
  if (motion == HIGH) {
    digitalWrite(ledPin, HIGH);
    Serial.println("ALERT: Motion Detected!");
  } else {
    digitalWrite(ledPin, LOW);
  }
  delay(100);
}`,
    relatedProjects: ['proj-security-alarm', 'proj-smart-light'],
    datasheetUrl: 'https://www.mpja.com/download/31227sc.pdf'
  },

  // MOTORS & ACTUATORS
  {
    id: 'comp-sg90',
    name: 'SG90 9g Micro Servo Motor',
    category: 'Motors',
    categoryKu: 'مۆتۆڕ و بزوێنەرەکان',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&auto=format&fit=crop&q=80',
    description: 'Lightweight high-torque geared micro servo providing precise 0° to 180° rotation control.',
    descriptionKu: 'مۆتۆڕی سێرڤۆی کێش سووک بە کۆنترۆڵی وردی زاویە لە نێوان ٠ تا ١٨٠ پلە بە گێڕی بەهێز.',
    operatingVoltage: '4.8V to 6.0V DC',
    currentDraw: '100-250 mA moving (Stall current: ~650 mA)',
    workingPrinciple: 'Internal potentiometer and comparator circuit align gear position to the incoming 50Hz PWM pulse width.',
    workingPrincipleKu: 'بەراوردکردنی ترپەی PWM لەگەڵ بەرگری ناوەکی بۆ ڕاگرتنی وردی زاویەی مۆتۆڕەکە لەژێر باردا.',
    pinout: [
      { pin: 'Brown / Black', function: 'Ground (GND)', functionKu: 'گراوند' },
      { pin: 'Red', function: 'Power VCC (5V)', functionKu: 'کارەبای ٥ ڤۆڵت' },
      { pin: 'Orange / Yellow', function: 'PWM Signal (Pin 9)', functionKu: 'سیگناڵی کۆنترۆڵ' }
    ],
    wiringTip: 'If moving heavy loads or multiple servos, use a separate 5V power supply with a shared common ground to avoid Arduino brownout resets.',
    wiringTipKu: 'ئەگەر کێشی قورسی پێ بەستراوە، سەرچاوەی کارەبای ٥ ڤۆڵتی دەرەکی بەکاربهێنە بە گراوندی هاوبەش.',
    exampleCode: `// SG90 Servo Sweep Controller
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15);
  }
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
}`,
    relatedProjects: ['proj-smart-lock', 'proj-ultrasonic-radar'],
    datasheetUrl: 'http://www.ee.ic.ac.uk/pcheung/teaching/DE1_EE/stores/sg90_datasheet.pdf'
  },
  {
    id: 'comp-l298n',
    name: 'L298N Dual H-Bridge Motor Driver Module',
    category: 'Motors',
    categoryKu: 'مۆتۆڕ و بزوێنەرەکان',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&auto=format&fit=crop&q=80',
    description: 'High-power dual H-bridge motor driver capable of controlling speed and direction of two DC motors or one stepper.',
    descriptionKu: 'مۆدیولی بەهێزی لێخوڕینی دوو مۆتۆڕی DC یان یەک مۆتۆڕی هەنگاوی Stepper بە کۆنترۆڵی ئاڕاستە و خێرایی.',
    operatingVoltage: '5V - 35V DC Motor Power (VMS)',
    currentDraw: 'Up to 2A per channel peak',
    workingPrinciple: 'Four high-power bipolar transistor switches form an H-bridge, allowing current to reverse direction through motor windings.',
    workingPrincipleKu: 'چوار ترانزستەری بەهێز کە تەزوو بە هەردوو ئاڕاستەی پێچەوانە دەجوڵێنن بۆ سوڕانەوە بەرەو پێش و پاش.',
    pinout: [
      { pin: 'IN1, IN2', function: 'Motor A Direction Control', functionKu: 'کۆنترۆڵی ئاڕاستەی مۆتۆڕی یەکەم' },
      { pin: 'ENA / ENB', function: 'Speed PWM Enable Jumpers', functionKu: 'کۆنترۆڵی خێرایی بە PWM' },
      { pin: 'IN3, IN4', function: 'Motor B Direction Control', functionKu: 'کۆنترۆڵی ئاڕاستەی مۆتۆڕی دووەم' },
      { pin: '12V / GND / 5V', function: 'Power Terminals', functionKu: 'تێرمیناڵەکانی کارەبا' }
    ],
    wiringTip: 'Keep Arduino GND and the external motor battery negative terminal connected together (Common Ground).',
    wiringTipKu: 'هەمیشە گراوندی ئاردوینۆ و گراوندی پاتری مۆتۆڕەکان بەیەکەوە ببەستە (Common Ground).',
    exampleCode: `// L298N Dual DC Motor Direction & PWM Speed
const int in1 = 8;
const int in2 = 9;
const int ena = 10;

void setup() {
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(ena, OUTPUT);
}

void loop() {
  // Rotate Forward at 80% speed
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  analogWrite(ena, 200);
  delay(2000);

  // Stop
  analogWrite(ena, 0);
  delay(500);

  // Rotate Backward
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  analogWrite(ena, 200);
  delay(2000);
}`,
    relatedProjects: ['proj-obstacle-robot', 'proj-bluetooth-car'],
    datasheetUrl: 'https://www.sparkfun.com/datasheets/Robotics/L298_H_Bridge.pdf'
  },

  // DISPLAYS
  {
    id: 'comp-lcd1602',
    name: '1602 LCD with I2C Backpack',
    category: 'Displays',
    categoryKu: 'شاشە و پیشاندەرەکان',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&auto=format&fit=crop&q=80',
    description: '16-character by 2-line alphanumeric liquid crystal display driven via only 2 I2C wires (PCF8574 IO expander).',
    descriptionKu: 'شاشەی نووسینی ١٦ پیت لە ٢ دێڕدا کە تەنها بە دوو وایەری پرۆتۆکۆلی I2C کاردەکات بەڕێگەی چیپی PCF8574.',
    operatingVoltage: '5V DC',
    currentDraw: '20 mA with LED backlight ON',
    workingPrinciple: 'PCF8574 translates 2-wire serial I2C commands into 4-bit parallel data lines connected to HD44780 LCD controller.',
    workingPrincipleKu: 'گۆڕینی داتای دوو وایەری I2C بۆ داتای موازی ٤ بیتی بۆ کۆنترۆڵەری HD44780.',
    pinout: [
      { pin: 'GND', function: 'Ground (0V)', functionKu: 'گراوند' },
      { pin: 'VCC', function: '+5V Power', functionKu: 'کارەبای ٥ ڤۆڵت' },
      { pin: 'SDA', function: 'Serial Data (A4 on Uno)', functionKu: 'هێڵی داتای I2C' },
      { pin: 'SCL', function: 'Serial Clock (A5 on Uno)', functionKu: 'هێڵی کاتژمێری I2C' }
    ],
    wiringTip: 'Adjust the blue potentiometer screw on the back backpack board to set contrast; if text is invisible, turn this screw.',
    wiringTipKu: 'بەرگرییە شینەکەی پشت شاشەکە بە دەست دەستکاری بکە بۆ ڕێکخستنی کۆنتراست ئەگەر پیتەکان دەرنەکەوتن.',
    exampleCode: `// 1602 I2C Character LCD Setup
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("KRD Arduino Univ");
  lcd.setCursor(0, 1);
  lcd.print("System Ready!");
}

void loop() {}`,
    relatedProjects: ['proj-greenhouse', 'proj-smart-lock', 'proj-weather-station'],
    datasheetUrl: 'https://www.nxp.com/docs/en/data-sheet/PCF8574_PCF8574A.pdf'
  },
  {
    id: 'comp-oled',
    name: '0.96 inch I2C OLED Display (SSD1306)',
    category: 'Displays',
    categoryKu: 'شاشە و پیشاندەرەکان',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    description: '128x64 self-illuminating monochromatic graphic OLED display with incredible contrast and wide viewing angles.',
    descriptionKu: 'شاشەی گرافیکی پێشکەوتووی ١٢٨ بە ٦٤ پێکسڵ بە ڕووناکی خۆکار و ڕوونی تەواو بۆ هێڵکار و وێنە.',
    operatingVoltage: '3.3V to 5V DC',
    currentDraw: '20 mA average',
    workingPrinciple: 'Individual organic LEDs emit light when electrified, rendering crisp pixels without needing a bulky backlight panel.',
    workingPrincipleKu: 'لیدی ئۆرگانیکی ناوەکی لە هەموو پێکسڵێکدا کە ڕووناکی تایبەت بە خۆی دەردەدات بەبێ پێویستی بە بەکلایت.',
    pinout: [
      { pin: 'GND', function: 'Ground', functionKu: 'گراوند' },
      { pin: 'VCC', function: '3.3V or 5V Power', functionKu: 'کارەبا' },
      { pin: 'SCL', function: 'I2C Clock line', functionKu: 'کاتژمێر' },
      { pin: 'SDA', function: 'I2C Data line', functionKu: 'داتا' }
    ],
    wiringTip: 'Default I2C address is usually 0x3C. Use Adafruit_SSD1306 and Adafruit_GFX libraries for easy graphic rendering.',
    wiringTipKu: 'ئەدرێسی فەرمی بە زۆری 0x3C یە. کتێبخانەی فەرمی Adafruit SSD1306 بەکاربهێنە بۆ کێشانی شێوە و هێڵەکان.',
    exampleCode: `// SSD1306 OLED Graphic Display
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    for (;;); // Halt if initialization failed
  }
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(10, 20);
  display.println("KRD Arduino Lab");
  display.display();
}

void loop() {}`,
    relatedProjects: ['proj-esp32-weather', 'proj-smart-lock'],
    datasheetUrl: 'https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf'
  },

  // RELAYS & POWER
  {
    id: 'comp-relay',
    name: '5V Single Channel Relay Module',
    category: 'Relays',
    categoryKu: 'ڕیلەی و کۆنترۆڵی کارەبا',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80',
    description: 'Optocoupler-isolated electromechanical switch allowing 5V Arduino to safely toggle 250V AC home appliances.',
    descriptionKu: 'سوچی کارۆموگناتیسی پارێزراو کە ڕێگە دەدات ئاردوینۆ کۆنترۆڵی ئامێرە کارەباییەکانی ٢٢٠ ڤۆڵتی ماڵەوە بکات.',
    operatingVoltage: '5V DC trigger coil',
    currentDraw: '70 mA when energized',
    workingPrinciple: 'Energizing the electromagnet coil pulls mechanical contact from NC (Normally Closed) to NO (Normally Open).',
    workingPrincipleKu: 'پەیدابوونی کێڵگەی موگناتیسی لەناو کۆیلەکەدا پەڕەیەکی ئاسن ڕادەکێشێت و بازنەکە دادەخات.',
    pinout: [
      { pin: 'VCC', function: '+5V Power', functionKu: 'کارەبای ٥ ڤۆڵت' },
      { pin: 'IN', function: 'Trigger Input (Active LOW or HIGH)', functionKu: 'سیگناڵی کۆنترۆڵ' },
      { pin: 'GND', function: 'Ground (0V)', functionKu: 'گراوند' },
      { pin: 'COM / NO / NC', function: 'High Voltage Screw Terminals', functionKu: 'تێرمیناڵەکانی کارەبای بەرز' }
    ],
    wiringTip: 'SAFETY WARNING: Mains electricity (110V/220V AC) is lethal! Never touch open terminals while power is connected. Insulate everything in an electrical enclosure.',
    wiringTipKu: 'ئاگاداری مەترسی: کارەبای ٢٢٠ ڤۆڵت مەترسیدارە! هەرگیز دەست لە بەشە ڕووتەکان مەدە لەکاتی کارپێکردندا.',
    exampleCode: `// 5V Relay Control (Active LOW)
const int relayPin = 7;

void setup() {
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Relay off initially
}

void loop() {
  digitalWrite(relayPin, LOW);  // Turn relay ON
  delay(5000);
  digitalWrite(relayPin, HIGH); // Turn relay OFF
  delay(5000);
}`,
    relatedProjects: ['proj-home-auto', 'proj-greenhouse'],
    datasheetUrl: 'https://www.songle.com/en/product/detail.aspx?id=12'
  },

  // LEDS & LIGHTING
  {
    id: 'comp-ws2812b',
    name: 'WS2812B Addressable RGB NeoPixel',
    category: 'LEDs and Lighting',
    categoryKu: 'لید و ڕووناکی (LEDs)',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    description: 'Intelligent digital RGB LED containing an integrated driver IC allowing control of millions of colors via a single data wire.',
    descriptionKu: 'لیدی زیرەکی ناونیشاندراو کە لەڕێگەی تەنها یەک وایەرەوە دەتوانرێت ملیۆنان ڕەنگی جیاواز لەسەر سەدان لید دابنرێت.',
    operatingVoltage: '5V DC (Strict ±0.5V)',
    currentDraw: 'Up to 60 mA per pixel at full white brightness',
    workingPrinciple: 'High-speed 800kHz single-wire NZR communication protocol clocking 24-bit GRB data sequentially through cascaded shift registers.',
    workingPrincipleKu: 'پرۆتۆکۆلی خێرای ٨٠٠ کیلۆهێرتز کە داتای ٢٤ بیتی ڕەنگەکان بە زنجیرەیەک لە لیدێکەوە بۆ لیدێکی تر دەگوازێتەوە.',
    pinout: [
      { pin: '5V (VCC)', function: 'Power (5V)', functionKu: 'کارەبای ٥ ڤۆڵت' },
      { pin: 'DIN', function: 'Data Input from Arduino', functionKu: 'هاتنەژووری داتا' },
      { pin: 'GND', function: 'Ground (0V)', functionKu: 'گراوند' },
      { pin: 'DOUT', function: 'Data Output to Next LED', functionKu: 'چوونەدەر بۆ لیدی دواتر' }
    ],
    wiringTip: 'Place a 1000 µF capacitor across 5V and GND power rails, and insert a 300Ω-500Ω resistor between Arduino pin and DIN to prevent voltage spikes.',
    wiringTipKu: 'خازنێکی ١٠٠٠ مایکرۆفاراد لە نێوان ٥ ڤۆڵت و گراوند دابنێ بۆ پاراستنی لیدەکان لە هەڵچوونی کتوپڕی کارەبا.',
    exampleCode: `// WS2812B Addressable RGB NeoPixel Ring
#include <Adafruit_NeoPixel.h>

#define LED_PIN 6
#define LED_COUNT 16

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
  strip.setBrightness(50);
}

void loop() {
  // Cycle Cyan color through the ring
  for (int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(0, 217, 255));
    strip.show();
    delay(50);
    strip.setPixelColor(i, strip.Color(0, 0, 0));
  }
}`,
    relatedProjects: ['proj-rgb-lamp', 'proj-traffic-light'],
    datasheetUrl: 'https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf'
  }
];
