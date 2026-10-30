import { BoardPinout } from '../types';

export const pinoutsData: BoardPinout[] = [
  {
    id: 'uno',
    name: 'Arduino Uno R3',
    chip: 'ATmega328P (8-bit AVR)',
    voltage: '5.0V Logic (VIN: 7-12V)',
    clockSpeed: '16.0 MHz',
    flashMemory: '32 KB (0.5 KB Bootloader)',
    sram: '2 KB',
    pins: [
      // Right header / Digital
      {
        pin: 'D0',
        name: 'Digital Pin 0 / RX',
        type: 'communication',
        voltage: '5V',
        protocols: ['UART RX'],
        description: 'Receives serial data from computer USB / ATmega16U2. Connected directly to Pin 0.',
        descriptionKu: 'وەرگرتنی داتای زنجیرەیی لە کۆمپیوتەر لەڕێگەی پۆڕتی USB.',
        exampleCode: 'Serial.begin(9600); // Uses D0 (RX) and D1 (TX)',
        side: 'right',
        y: 40
      },
      {
        pin: 'D1',
        name: 'Digital Pin 1 / TX',
        type: 'communication',
        voltage: '5V',
        protocols: ['UART TX'],
        description: 'Transmits serial data to computer USB. Do not use for general I/O when printing to Serial.',
        descriptionKu: 'ناردنی داتای زنجیرەیی بۆ کۆمپیوتەر بە هێڵی TX.',
        exampleCode: 'Serial.println("Hello UART");',
        side: 'right',
        y: 65
      },
      {
        pin: 'D2',
        name: 'Digital Pin 2 / INT0',
        type: 'digital',
        voltage: '5V',
        protocols: ['External Interrupt 0'],
        description: 'Standard 5V digital I/O with Hardware External Interrupt 0 support.',
        descriptionKu: 'پینی دیجیتال بە پشتیوانی دەستبەجێی پچڕانی هاردوێر (Interrupt).',
        exampleCode: 'attachInterrupt(digitalPinToInterrupt(2), isrHandler, RISING);',
        side: 'right',
        y: 90
      },
      {
        pin: 'D3',
        name: 'Digital Pin 3 / PWM / INT1',
        type: 'pwm',
        voltage: '5V',
        protocols: ['PWM 490Hz', 'External Interrupt 1'],
        description: '8-bit Pulse Width Modulation output (analogWrite) and External Interrupt 1.',
        descriptionKu: 'دەرچەی ترپەی ٨ بیتی PWM بە فریکوێنسی ٤٩٠ هێرتز.',
        exampleCode: 'analogWrite(3, 180); // 70% Duty cycle brightness',
        side: 'right',
        y: 115
      },
      {
        pin: 'D4',
        name: 'Digital Pin 4',
        type: 'digital',
        voltage: '5V',
        description: 'General purpose 5V digital input/output pin (max 20mA).',
        descriptionKu: 'پینی ئاسایی دیجیتال بە ڤۆڵتیەی ٥ ڤۆڵت.',
        exampleCode: 'pinMode(4, OUTPUT); digitalWrite(4, HIGH);',
        side: 'right',
        y: 140
      },
      {
        pin: 'D5',
        name: 'Digital Pin 5 / PWM',
        type: 'pwm',
        voltage: '5V',
        protocols: ['PWM 980Hz (Timer 0)'],
        description: 'High-frequency 8-bit PWM driven by internal 8-bit Timer 0.',
        descriptionKu: 'دەرچەی ترپەی PWM بە فریکوێنسی ٩٨٠ هێرتز.',
        exampleCode: 'analogWrite(5, 128); // 50% PWM',
        side: 'right',
        y: 165
      },
      {
        pin: 'D6',
        name: 'Digital Pin 6 / PWM',
        type: 'pwm',
        voltage: '5V',
        protocols: ['PWM 980Hz (Timer 0)'],
        description: '8-bit PWM pin driven by Timer 0.',
        descriptionKu: 'پینی ترپەی PWM بۆ کۆنترۆڵی خێرایی مۆتۆڕ و ڕۆشنایی.',
        exampleCode: 'analogWrite(6, 255);',
        side: 'right',
        y: 190
      },
      {
        pin: 'D9',
        name: 'Digital Pin 9 / PWM',
        type: 'pwm',
        voltage: '5V',
        protocols: ['PWM 490Hz (Timer 1)'],
        description: '16-bit Timer 1 PWM output pin. Default pin used by Servo.h library.',
        descriptionKu: 'دەرچەی ترپەی Timer 1 کە گونجاوترینە بۆ کۆنترۆڵی سێرڤۆ مۆتۆڕ.',
        exampleCode: 'myServo.attach(9);',
        side: 'right',
        y: 215
      },
      {
        pin: 'D10',
        name: 'Digital Pin 10 / PWM / SS',
        type: 'communication',
        voltage: '5V',
        protocols: ['PWM 490Hz', 'SPI SS (Slave Select)'],
        description: 'SPI hardware bus Slave Select pin and PWM output.',
        descriptionKu: 'پینی هەڵبژاردنی ئامێر لە پەیوەندی خێرای پرۆتۆکۆلی SPI.',
        exampleCode: 'pinMode(10, OUTPUT); // Master SPI Select',
        side: 'right',
        y: 240
      },
      {
        pin: 'D11',
        name: 'Digital Pin 11 / PWM / MOSI',
        type: 'communication',
        voltage: '5V',
        protocols: ['PWM 490Hz', 'SPI MOSI'],
        description: 'Master Out Slave In hardware SPI line.',
        descriptionKu: 'هێڵی ناردنی داتای سەرەکی لە پرۆتۆکۆلی SPI.',
        exampleCode: 'SPI.transfer(0xAA);',
        side: 'right',
        y: 265
      },
      {
        pin: 'D12',
        name: 'Digital Pin 12 / MISO',
        type: 'communication',
        voltage: '5V',
        protocols: ['SPI MISO'],
        description: 'Master In Slave Out hardware line for SPI sensors and SD cards.',
        descriptionKu: 'هێڵی وەرگرتنی داتا لە هەستەوەرەکانەوە بە SPI.',
        exampleCode: 'byte data = SPI.transfer(0x00);',
        side: 'right',
        y: 290
      },
      {
        pin: 'D13',
        name: 'Digital Pin 13 / SCK / LED',
        type: 'communication',
        voltage: '5V',
        protocols: ['SPI Clock', 'Onboard LED Indicator'],
        description: 'SPI Clock (SCK) and connected to the onboard surface-mount amber LED marked "L".',
        descriptionKu: 'کاتژمێری پرۆتۆکۆلی SPI و لیدی ناوەکی ئاردوینۆ.',
        exampleCode: 'pinMode(LED_BUILTIN, OUTPUT);',
        side: 'right',
        y: 315
      },

      // Left header / Power & Analog
      {
        pin: '5V',
        name: 'Regulated +5V Output',
        type: 'power',
        voltage: '5.0V',
        description: 'Regulated 5.0V power rail from onboard linear regulator (NCP1117ST50T3G) or USB.',
        descriptionKu: 'سەرچاوەی دابینکردنی کارەبای ٥ ڤۆڵتی ڕێکخراو بۆ هەستەوەرەکان.',
        side: 'left',
        y: 40
      },
      {
        pin: '3.3V',
        name: 'Regulated +3.3V Output',
        type: 'power',
        voltage: '3.3V',
        description: 'Provides clean 3.3V power (up to 150mA max) for sensitive RF and 3.3V sensors.',
        descriptionKu: 'کارەبای ٣.٣ ڤۆڵت بۆ ئەو هەستەوەرانەی بەرگەی ٥ ڤۆڵت ناگرن.',
        side: 'left',
        y: 65
      },
      {
        pin: 'GND',
        name: 'Ground Rail',
        type: 'ground',
        voltage: '0.0V',
        description: '0V electrical reference potential. All connected sensors must share common GND.',
        descriptionKu: 'هێڵی گراوند (٠ ڤۆڵت) بۆ تەواوکردنی بازنەی کارەبایی.',
        side: 'left',
        y: 90
      },
      {
        pin: 'VIN',
        name: 'Voltage Input Rail',
        type: 'power',
        voltage: '7-12V',
        description: 'Direct DC input pin fed prior to the onboard regulator. Use 7V-12V external power.',
        descriptionKu: 'دەرچەی پێدانی کارەبای ٧ تا ١٢ ڤۆڵت لە پاترییەوە پێش ڕێکخەر.',
        side: 'left',
        y: 115
      },
      {
        pin: 'A0',
        name: 'Analog Input A0',
        type: 'analog',
        voltage: '0-5V',
        protocols: ['10-bit ADC Channel 0'],
        description: 'Converts analog voltages (0-5V) to integer values (0 to 1023) in ~100 µs.',
        descriptionKu: 'دەرچەی ئانالۆگ کە ڤۆڵتیە دەگۆڕێت بۆ ژمارەی ٠ تا ١٠٢٣.',
        exampleCode: 'int val = analogRead(A0);',
        side: 'left',
        y: 165
      },
      {
        pin: 'A4',
        name: 'Analog A4 / I2C SDA',
        type: 'communication',
        voltage: '5V',
        protocols: ['I2C SDA (Data)', 'Analog ADC 4'],
        description: 'Hardware I2C Serial Data bus line used for LCD, RTC, and gyro communication.',
        descriptionKu: 'هێڵی داتای I2C کە بە دوو وایەر چەندین ئامێر کۆنترۆڵ دەکات.',
        exampleCode: 'Wire.begin(); // Initializes A4 and A5',
        side: 'left',
        y: 265
      },
      {
        pin: 'A5',
        name: 'Analog A5 / I2C SCL',
        type: 'communication',
        voltage: '5V',
        protocols: ['I2C SCL (Clock)', 'Analog ADC 5'],
        description: 'Hardware I2C Serial Clock line synchronized at 100 kHz or 400 kHz.',
        descriptionKu: 'هێڵی کاتژمێری هاوکاتی پرۆتۆکۆلی I2C.',
        exampleCode: 'Wire.setClock(400000); // 400kHz fast mode',
        side: 'left',
        y: 290
      }
    ]
  },
  {
    id: 'esp32',
    name: 'ESP32 NodeMCU DevKit (30-Pin)',
    chip: 'Espressif ESP32-WROOM-32 (Xtensa Dual-Core)',
    voltage: '3.3V Logic (5V USB input)',
    clockSpeed: '240.0 MHz',
    flashMemory: '4 MB Flash',
    sram: '520 KB',
    pins: [
      {
        pin: 'GPIO 2',
        name: 'GPIO 2 / Built-in LED',
        type: 'digital',
        voltage: '3.3V',
        protocols: ['PWM', 'ADC2_CH2', 'Touch 2'],
        description: 'Controls onboard blue LED; connected to internal strapping circuit.',
        descriptionKu: 'لیدی شینی ناوەکی بۆرد بە پشتگیری ترپە و هەستەوەری لەمسکردن.',
        exampleCode: 'pinMode(2, OUTPUT); digitalWrite(2, HIGH);',
        side: 'left',
        y: 50
      },
      {
        pin: 'GPIO 4',
        name: 'GPIO 4 / Touch 0',
        type: 'analog',
        voltage: '3.3V',
        protocols: ['Capacitive Touch 0', 'ADC2_CH0'],
        description: 'Capacitive touch pin and analog input. Can sense human touch through plastic.',
        descriptionKu: 'پینی هەستەوەری تاچ بەبێ پێویستی بە دوگمەی میکانیکی.',
        exampleCode: 'int touchVal = touchRead(4);',
        side: 'left',
        y: 90
      },
      {
        pin: 'GPIO 21',
        name: 'GPIO 21 / I2C SDA',
        type: 'communication',
        voltage: '3.3V',
        protocols: ['I2C SDA'],
        description: 'Default hardware I2C data pin on ESP32 Arduino core.',
        descriptionKu: 'هێڵی سەرەکی داتای I2C لە چیپی ESP32.',
        exampleCode: 'Wire.begin(21, 22);',
        side: 'right',
        y: 130
      },
      {
        pin: 'GPIO 22',
        name: 'GPIO 22 / I2C SCL',
        type: 'communication',
        voltage: '3.3V',
        protocols: ['I2C SCL'],
        description: 'Default hardware I2C clock pin on ESP32 Arduino core.',
        descriptionKu: 'هێڵی سەرەکی کاتژمێری I2C لە چیپی ESP32.',
        exampleCode: 'Wire.begin(21, 22);',
        side: 'right',
        y: 170
      },
      {
        pin: 'GPIO 34',
        name: 'GPIO 34 / ADC1_CH6',
        type: 'analog',
        voltage: '3.3V',
        protocols: ['Input Only', 'ADC1 Channel 6'],
        description: 'Input-only analog pin with no internal pull-up or pull-down capability.',
        descriptionKu: 'تەنها بۆ خوێندنەوەی ئانالۆگ بەکاردێت و ناتوانرێت وەک دەرچەی کارەبا بەکاربێت.',
        exampleCode: 'analogRead(34);',
        side: 'left',
        y: 210
      }
    ]
  }
];
