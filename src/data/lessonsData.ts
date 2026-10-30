import { Lesson } from '../types';

export const lessonsData: Lesson[] = [
  // BEGINNER
  {
    id: 'l-beg-1',
    level: 'beginner',
    title: 'Introduction to Arduino & Microcontrollers',
    titleKu: 'دەستپێکێک لەسەر ئاردوینۆ و مایکرۆکۆنترۆلەرەکان',
    shortDesc: 'Discover what Arduino is, how microcontrollers work, and the difference between microprocessors and microcontrollers.',
    shortDescKu: 'ئاشنابوون بە ئاردوینۆ، چۆنیەتی کارکردنی مایکرۆکۆنترۆلەر، و جیاوازی نێوان مایکرۆپرۆسێسەر و مایکرۆکۆنترۆلەر.',
    duration: '15 mins',
    objectives: [
      'Understand what an embedded microcontroller does',
      'Learn the physical architecture of the ATmega328P',
      'Identify power, reset, USB, and I/O domains on the board'
    ],
    objectivesKu: [
      'تێگەیشتن لەوەی مایکرۆکۆنترۆلەر چی دەکات لە سیستەمە چێنراوەکاندا',
      'فێربوونی پێکهاتەی فیزیایی چیپی ATmega328P',
      'ناسینەوەی بەشەکانی وزە، دوگمەی ڕیسێت، پۆڕتی USB، و پینەکانی هاتن و چوون'
    ],
    content: `An Arduino is an open-source electronics platform based on easy-to-use hardware and software. At its heart lies a microcontroller—a self-contained microcomputer on a single integrated circuit chip containing a processor core, memory (Flash, SRAM, EEPROM), and programmable input/output peripherals.

Unlike a computer microprocessor (like Intel Core or AMD Ryzen) that requires external RAM, storage, and graphics to boot an operating system, a microcontroller runs a single dedicated firmware program instantaneously upon receiving 5V power.

Key Hardware Domains of Arduino Uno:
1. Microcontroller: ATmega328P (8-bit AVR architecture, 16 MHz quartz crystal).
2. Operating Voltage: 5V regulated logic.
3. Recommended Input Voltage (VIN / Barrel Jack): 7V to 12V DC.
4. Flash Memory: 32 KB (0.5 KB occupied by bootloader).
5. SRAM: 2 KB (stores volatile variables during runtime).
6. EEPROM: 1 KB (non-volatile permanent parameter storage).`,
    contentKu: `ئاردوینۆ پلاتفۆرمێکی ئەلیکترۆنی سەرچاوەکراوەیە کە لەسەر ڕەقەکاڵا و نەرمەکاڵای ئاسان بنیادنراوە. لە ناوجەرگەی بۆردەکەدا مایکرۆکۆنترۆلەر هەیە—کە بریتییە لە کۆمپیوتەرێکی تەواوی بچووککراوە لەسەر یەک چیپ کە پێکهاتووە لە پرۆسێسەر، یادگە (Flash, SRAM, EEPROM)، و دەرچە بەرنامەبۆکراوەکانی هاتنەژوور و چوونەدەر.

بە پێچەوانەی مایکرۆپرۆسێسەری کۆمپیوتەر (وەک Intel یان AMD) کە پێویستی بە ڕامی دەرەکی، هارد و کارتی شاشەیە بۆ هەڵکردنی سیستەمی کارپێکردن، مایکرۆکۆنترۆلەر تەنها یەک بەرنامەی کۆدکراو ڕاستەوخۆ بەبێ دواکەوتن بەگەڕدەخات هەر کە ڤۆڵتیەی ٥ ڤۆڵتی پێگەیشت.

بەشە سەرەکییەکانی ئاردوینۆ ئۆنۆ:
١. چیپی سەرەکی: ATmega328P بە فریکوێنسی ١٦ مێگاهێرتز.
٢. ڤۆڵتیەی کارکردنی ناوەکی: ٥ ڤۆڵت.
٣. ڤۆڵتیەی پێشنیارکراو لە جاکەکەوە: ٧ تا ١٢ ڤۆڵت.
٤. بیرگەی Flash: قەبارەی ٣٢ کیلۆبایت.
٥. بیرگەی SRAM: قەبارەی ٢ کیلۆبایت بۆ داتاکان لەکاتی کارکردندا.
٦. بیرگەی EEPROM: قەبارەی ١ کیلۆبایت بۆ پاراستنی داتا تەنانەت دوای کوژاندنەوەش.`,
    exercisePrompt: 'Inspect your Arduino board or simulator: identify the 16MHz crystal oscillator silver cylinder and the reset pushbutton.',
    exercisePromptKu: 'سەیری بۆردی ئاردوینۆکەت یان سیمولەیتەر بکە: کریستاڵی ١٦ مێگاهێرتزی زیوی و دوگمەی ڕیسێت دەستنیشان بکە.',
    miniQuiz: {
      question: 'What is the primary microcontroller chip powering the standard Arduino Uno R3?',
      questionKu: 'چیپی سەرەکی مایکرۆکۆنترۆلەر کە لەسەر ئاردوینۆ ئۆنۆ R3 بەکارهاتووە چییە؟',
      options: ['ESP32-WROOM', 'ATmega328P', 'STM32F103', 'PIC16F877A'],
      optionsKu: ['ESP32-WROOM', 'ATmega328P', 'STM32F103', 'PIC16F877A'],
      correctIndex: 1,
      explanation: 'The standard Arduino Uno R3 is based on the 8-bit Microchip (Atmel) ATmega328P microcontroller running at 16 MHz.',
      explanationKu: 'بۆردی ئاردوینۆ ئۆنۆ کار بە چیپی بەناوبانگی ATmega328P دەکات بە خێرایی ١٦ مێگاهێرتز.'
    }
  },
  {
    id: 'l-beg-2',
    level: 'beginner',
    title: 'First Arduino Program: LED Blinking & Digital Output',
    titleKu: 'یەکەم بەرنامەی ئاردوینۆ: ترووکاندنی لید و دەرچەی دیجیتال',
    shortDesc: 'Understand setup(), loop(), pinMode(), digitalWrite(), and delay() with circuit safety.',
    shortDescKu: 'تێگەیشتن لە فەنکشنەکانی setup و loop و فەرمانەکانی pinMode و digitalWrite و مەترسی نەبەستنی بەرگری.',
    duration: '20 mins',
    objectives: [
      'Master the structure of an Arduino sketch (.ino)',
      'Learn why current-limiting resistors are required for LEDs',
      'Write and compile your first flashing LED routine'
    ],
    objectivesKu: [
      'فێربوونی بنەمای داڕشتنی کۆد لە ئاردوینۆ (setup و loop)',
      'تێگەیشتن لەوەی بۆچی دەبێت بەرگری (Resistor) ببەسترێت لەگەڵ LED بۆ پاراستنی',
      'نوسین و کارپێکردنی یەکەم کۆدی ترووکاندنی لید'
    ],
    content: `Every Arduino program consists of two mandatory functions:

1. \`setup()\`: Executes exactly once when the microcontroller powers on or is reset. Used to set pin modes, initialize serial communication, or start hardware libraries.
2. \`loop()\`: Runs continuously in an infinite cycle for as long as power remains connected.

LED Basics & Current Protection:
An LED (Light Emitting Diode) is polarized:
- Anode (Longer leg, +): Connects to digital pin through a 220Ω - 330Ω resistor.
- Cathode (Shorter leg, Flat side, -): Connects to GND.
Never connect an LED directly between 5V and GND without a resistor! Without resistance to limit the current, excess current (>40mA) will permanently burn out the microcontroller pin and fry the LED.`,
    contentKu: `هەموو بەرنامەیەکی ئاردوینۆ لە دوو بەشی سەرەکی و بنەڕەتی پێکدێت:

١. فەنکشنی \`setup()\`: تەنها یەک جار لەگەڵ پێکردن یان ڕیسێتکردنی بۆردەکە جێبەجێ دەبێت. بەکاردێت بۆ ناساندنی پینەکان، دەستپێکردنی پەیوەندی Serial یان کتێبخانەکان.
٢. فەنکشنی \`loop()\`: بە شێوەیەکی بەردەوام و بێ کۆتایی خۆی دووبارە دەکاتەوە تا ئەو کاتەی کارەبا لەسەر بۆردەکە هەبێت.

پاراستنی لید بە بەرگری (Resistor):
لید (LED) جەمسەری هەیە:
- ئەنۆد (قۆڵی درێژتر، موجەب +): دەبەسترێت بە پینی دیجیتال بە دانانی بەرگرییەکی ٢٢٠ ئۆم.
- کاسۆد (قۆڵی کورتتر، بەشی تەخت، سالب -): دەبەسترێت بە گراوند (GND).
هەرگیز لید ڕاستەوخۆ بەبێ بەرگری مەبەستە بە ٥ ڤۆڵت! چونکە تەزووی زۆر (>40mA) زیان بە پینی ئاردوینۆکە و لیدەکە دەگەیەنێت و دەیسوتێنێت.`,
    circuitInfo: {
      board: 'Arduino Uno R3',
      parts: ['1x Red 5mm LED', '1x 220 Ohm Resistor (Red-Red-Brown)', 'Breadboard', '2x Jumper Wires'],
      wiring: [
        { from: 'Arduino Pin 13', to: '220Ω Resistor leg 1', note: 'Current limiting' },
        { from: '220Ω Resistor leg 2', to: 'LED Anode (+)' },
        { from: 'LED Cathode (-)', to: 'Arduino GND' }
      ]
    },
    codeSnippet: `// KRD Arduino Universe - Lesson 2: Classic Blink
const int ledPin = 13; // Built-in LED on pin 13

void setup() {
  // Configure pin 13 as a digital output
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH); // Supply 5V to turn on LED
  delay(1000);                // Wait 1000 ms (1 second)
  digitalWrite(ledPin, LOW);  // Supply 0V to turn off LED
  delay(1000);                // Wait 1000 ms (1 second)
}`,
    exercisePrompt: 'Modify the code so the LED blinks rapidly like an emergency beacon: 100ms ON, 100ms OFF.',
    exercisePromptKu: 'کۆدەکە دەستکاری بکە تا لیدەکە بە خێرایی ترووکە بکات هاوشێوەی ئاگادارکەرەوە: ١٠٠ میلی چرکە داگیرساو، ١٠٠ میلی چرکە کوژاوە.',
    miniQuiz: {
      question: 'Which Arduino function executes repeatedly in an infinite loop as long as the board has power?',
      questionKu: 'کامیان لە فەنکشنەکانی ئاردوینۆ بەردەوام بە شێوەی خولەی بێ کۆتایی دووبارە دەبێتەوە؟',
      options: ['setup()', 'loop()', 'main()', 'run()'],
      optionsKu: ['setup()', 'loop()', 'main()', 'run()'],
      correctIndex: 1,
      explanation: 'loop() runs repeatedly forever after setup() has finished its single execution.',
      explanationKu: 'فەنکشنی loop() بەردەوام کاردەکات دوای ئەوەی setup() تەنها یەک جار جێبەجێ دەبێت.'
    }
  },
  {
    id: 'l-beg-3',
    level: 'beginner',
    title: 'Digital Inputs & Pushbuttons: Pull-Up vs Pull-Down',
    titleKu: 'دەرچە دیجیتالەکان و دوگمە: فێربوونی بەرگری Pull-Up و کێشەی Floating',
    shortDesc: 'Read pushbuttons cleanly without floating noise using pinMode(pin, INPUT_PULLUP).',
    shortDescKu: 'خوێندنەوەی دوگمە بەبێ ژاوەژاو و هەڵە لەڕێگەی بەرگری ناوەکی INPUT_PULLUP.',
    duration: '25 mins',
    objectives: [
      'Understand the electrical concept of a floating input pin',
      'Learn how pull-up resistors guarantee stable HIGH logic',
      'Use the internal pull-up resistor built into ATmega328P pins'
    ],
    objectivesKu: [
      'تێگەیشتن لە چەمکی پینی سەرئاوکەوتوو (Floating Pin) کە توشی ژاوەژاو دەبێت',
      'چۆنیەتی بەکارهێنانی بەرگری Pull-Up بۆ ڕاگرتنی دۆخی سەقامگیری HIGH',
      'بەکارهێنانی بەرگری ناوەکی ئاردوینۆ INPUT_PULLUP بەبێ پێویستی بە بەرگری دەرەکی'
    ],
    content: `When a microcontroller pin is set to INPUT, it acts like a high-impedance probe. If nothing is connected to it, atmospheric electromagnetic radiation will cause the pin to randomly oscillate between 0 and 1—this is called a "Floating Pin".

To solve this, we connect a resistor (typically 10kΩ) to tie the pin either to 5V (Pull-Up) or to GND (Pull-Down).

Better yet, Arduino chips feature internal 20kΩ - 50kΩ pull-up resistors on all digital pins!
By calling:
\`pinMode(buttonPin, INPUT_PULLUP);\`
The pin defaults to HIGH (1). When the user presses the button connected to GND, the pin reads LOW (0). This inverted logic is industry standard for robustness.`,
    contentKu: `کاتێک پینێکی ئاردوینۆ دەخەیتە سەر دۆخی INPUT، هاوشێوەی وایەرێکی هەستیار کاردەکات. ئەگەر هیچ شتێکی پێوە نەبەسترابێت، شەپۆلە موگناتیسییەکانی دەوروبەر وا دەکەن پینەکە بە ڕەمەکی لە نێوان ٠ و ١ بجوڵێت—ئەمەش پێی دەوترێت Floating Pin.

بۆ چارەسەری ئەمە، بەرگرییەکی ١٠ کیلۆ ئۆم دەبەسترێت بۆ ئەوەی هەمیشە بە ٥ ڤۆڵت (Pull-Up) یان بە گراوند (Pull-Down) ببەسترێتەوە.

خۆشبەختانە، چیپی ئاردوینۆ خۆی بەرگری ناوەکی تێدایە لە نێوان ٢٠ تا ٥٠ کیلۆ ئۆم.
بە نوسینی:
\`pinMode(buttonPin, INPUT_PULLUP);\`
پینەکە بە بەردەوامی لەسەر HIGH دەمێنێتەوە. کاتێک دوگمەکە دادەگریت کە بە GND بەستراوە، پینەکە دەبێتە LOW (0). ئەمە ستانداردی پیشەسازییە چونکە زۆر پارێزراوترە.`,
    circuitInfo: {
      board: 'Arduino Uno R3',
      parts: ['1x Pushbutton', 'Breadboard', '2x Jumper Wires'],
      wiring: [
        { from: 'Button Pin 1', to: 'Arduino Pin 2', note: 'Input with internal pullup' },
        { from: 'Button Pin 2', to: 'Arduino GND', note: 'Direct connection' }
      ]
    },
    codeSnippet: `const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
  // Enable internal pull-up resistor
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  // Reads LOW when button is pressed!
  int buttonState = digitalRead(buttonPin);

  if (buttonState == LOW) {
    digitalWrite(ledPin, HIGH); // Turn LED on
  } else {
    digitalWrite(ledPin, LOW);  // Turn LED off
  }
}`,
    exercisePrompt: 'Invert the behavior: make the LED stay ON continuously and turn OFF only while the button is held pressed.',
    exercisePromptKu: 'کارکردنی پڕۆگرامەکە پێچەوانە بکەرەوە: وا بکە لیدەکە بە بەردەوامی پێبێت و تەنها کاتێک بکوژێتەوە کە دەست لەسەر دوگمەکە دادەنێیت.',
    miniQuiz: {
      question: 'When using pinMode(pin, INPUT_PULLUP), what logic level does digitalRead(pin) return when the button is NOT pressed?',
      questionKu: 'کاتێک INPUT_PULLUP بەکاردەهێنیت، پینەکە چی دەخوێنێتەوە کاتێک دەستت لەسەر دوگمەکە نییە؟',
      options: ['LOW (0)', 'HIGH (1)', 'Floating / Random', 'Analog 512'],
      optionsKu: ['LOW (0)', 'HIGH (1)', 'ڕەمەکی / نەزانراو', 'ئانالۆگ 512'],
      correctIndex: 1,
      explanation: 'With INPUT_PULLUP, the internal resistor holds the pin at 5V (HIGH) until external contact pulls it to GND.',
      explanationKu: 'لە دۆخی INPUT_PULLUP پینەکە بە ڕاکێشانی ناوەکی لەسەر ڤۆڵتیەی ٥ ڤۆڵت (HIGH) ڕادەگیرێت تا داگرتنی دوگمەکە.'
    }
  },

  // INTERMEDIATE
  {
    id: 'l-int-1',
    level: 'intermediate',
    title: 'Ultrasonic Distance Measurement with HC-SR04',
    titleKu: 'پێوانەکردنی دووری بە هەستەوەری ئەڵتراسۆنیک HC-SR04',
    shortDesc: 'Calculate distance in centimeters using 40kHz acoustic pulses and speed of sound physics.',
    shortDescKu: 'ئەژمارکردنی دووری بە سانتیمەتر لەڕێگەی ترپەی دەنگی ٤٠ کیلۆهێرتز و فیزیکی خێرایی دەنگ.',
    duration: '30 mins',
    objectives: [
      'Understand piezoelectric acoustic pulse transmission and echo reception',
      'Calculate distance using the speed of sound formula: d = (t * 0.0343) / 2',
      'Use pulseIn() microseconds timing function'
    ],
    objectivesKu: [
      'تێگەیشتن لە چۆنیەتی ناردنی ترپەی دەنگی و وەرگرتنەوەی دەنگدانەوە',
      'ئەژمارکردنی دووری بەپێی هاوکێشەی خێرایی دەنگ: (کات * ٠.٠٣٤٣) / ٢',
      'بەکارهێنانی فەنکشنی pulseIn() بۆ پێوانی وردی مایکرۆچرکەکان'
    ],
    content: `The HC-SR04 ultrasonic distance sensor uses sonar to determine distance to an object, functioning reliably between 2 cm and 400 cm with 3mm precision.

Operating Principle:
1. Trigger Pin: Arduino sends a 10 microsecond HIGH pulse to the Trig pin.
2. Acoustic Transmission: The transmitter emits 8 ultrasonic sonic bursts at 40 kHz.
3. Reflection: The sound wave travels through air, bounces off an obstacle, and returns to the receiver.
4. Echo Pin: The Echo pin goes HIGH for the exact duration it took the sound wave to travel to the object and return.

Formula:
Speed of sound in dry air at 20°C = 343 m/s = 0.0343 cm/µs.
Since sound travels round-trip (to obstacle and back), distance is:
Distance (cm) = (Echo Time in µs × 0.0343) / 2`,
    contentKu: `هەستەوەری ئەڵتراسۆنیک HC-SR04 شەپۆلی دەنگ بەکاردەهێنێت بۆ پێوانی دووری تەنەکان لە مەودای نێوان ٢ سم تا ٤٠٠ سم بە جیاوازی ٣ میلیمەتر.

چۆنیەتی کارکردن:
١. پینی Trig: ئاردوینۆ بۆ ماوەی ١٠ مایکرۆچرکە سیگناڵی HIGH دەنێرێت.
٢. دەردانی شەپۆل: لە هەستەوەرەکەوە ٨ ترپەی دەنگی سەروو بیستن بە ٤٠ کیلۆهێرتز دەنێردرێت بۆ هەوا.
٣. بەرکەوتن و گەڕانەوە: دەنگەکە بە تەنەکە دەکەوێت و دەگەڕێتەوە.
٤. پینی Echo: بۆ ئەو ماوەیەی شەپۆلەکە ڕۆیشتووە و گەڕاوەتەوە، سیگناڵی HIGH دەمێنێتەوە.

هاوکێشەی زانستی:
خێرایی دەنگ لە هەوادا = ٣٤٣ مەتر/چرکە = ٠.٠٣٤٣ سم/مایکرۆچرکە.
چونکە دەنگەکە چوون و گەڕانەوەیە، دووری ڕاستەقینە یەکسانە بە:
دووری (سم) = (کاتی Echo بە مایکرۆچرکە × ٠.٠٣٤٣) / ٢`,
    circuitInfo: {
      board: 'Arduino Uno R3',
      parts: ['HC-SR04 Module', 'Breadboard', '4x Jumper Wires'],
      wiring: [
        { from: 'HC-SR04 VCC', to: 'Arduino 5V' },
        { from: 'HC-SR04 GND', to: 'Arduino GND' },
        { from: 'HC-SR04 Trig', to: 'Arduino Pin 9' },
        { from: 'HC-SR04 Echo', to: 'Arduino Pin 10' }
      ]
    },
    codeSnippet: `const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clear the trigger
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Send 10µs HIGH pulse
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read travel duration in microseconds
  long duration = pulseIn(echoPin, HIGH, 30000); // 30ms timeout

  // Calculate distance in cm
  float distanceCm = (duration * 0.0343) / 2.0;

  if (duration == 0) {
    Serial.println("Out of range!");
  } else {
    Serial.print("Distance: ");
    Serial.print(distanceCm);
    Serial.println(" cm");
  }

  delay(200); // Delay between measurements
}`,
    exercisePrompt: 'Add a piezo buzzer on Pin 8 that beeps faster as an obstacle gets closer, creating a car reverse parking sensor.',
    exercisePromptKu: 'زەنگێک (Buzzer) لەسەر پینی ٨ زیاد بکە بە جۆرێک تا تەنەکە نزیکتر بێتەوە دەنگی زەنگەکە خێراتر بێت، هاوشێوەی حەساسی ئۆتۆمبێل لەکاتی بەگدا.',
    miniQuiz: {
      question: 'Why do we divide the calculated distance by 2 in the HC-SR04 distance formula?',
      questionKu: 'بۆچی لە هاوکێشەی پێوانی دووری ئەڵتراسۆنیکدا ئەنجامەکە دابەشی ٢ دەکەین؟',
      options: [
        'Because the sensor has 2 transducers',
        'Because the sound wave travels both to the object and back to the receiver',
        'Because Arduino operates at half voltage',
        'To convert from inches to centimeters'
      ],
      optionsKu: [
        'چونکە حەساسەکە دوو چاوی هەیە',
        'چونکە دەنگەکە چوون و گەڕانەوەیە (دوو هێندەی دووری ڕاستەقینە)',
        'چونکە ڤۆڵتیەی بۆردەکە دەبێتە نیوە',
        'بۆ گۆڕینی ئینچ بۆ سانتیمەتر'
      ],
      correctIndex: 1,
      explanation: 'The echo duration accounts for the sound wave traveling out to the object AND echoing back, so distance = speed * time / 2.',
      explanationKu: 'کاتی گەشتنی دەنگەکە چوون و هاتنەوە لەخۆدەگرێت، بۆیە دووری تەنەکە یەکسانە بە نیوەی ئەو ماوەیە.'
    }
  },
  {
    id: 'l-int-2',
    level: 'intermediate',
    title: 'Precision Angle Control with Servo Motors (SG90)',
    titleKu: 'کۆنترۆڵی وردی زاویە لەڕێگەی مۆتۆڕی سێرڤۆ (SG90)',
    shortDesc: 'Control robotic joints and mechanisms using 50Hz PWM pulse widths and the Servo.h library.',
    shortDescKu: 'کۆنترۆڵکردنی جومگەی ڕۆبۆت و دەرگای زیرەک بە ترپەی ٥٠ هێرتز و کتێبخانەی فەرمی Servo.h.',
    duration: '25 mins',
    objectives: [
      'Learn how internal potentiometer feedback creates closed-loop servo positioning',
      'Understand 50 Hz PWM signals (1.0 ms = 0°, 1.5 ms = 90°, 2.0 ms = 180°)',
      'Program smooth sweeping motions using the Servo library'
    ],
    objectivesKu: [
      'تێگەیشتن لە سیستەمی فیدباک لە مۆتۆڕی سێرڤۆدا بۆ جێگیرکردنی زاویە',
      'تێگەیشتن لە ترپەی ٥٠ هێرتزی PWM (کاتی ١ میلی چرکە = ٠ پلە، ٢ میلی چرکە = ١٨٠ پلە)',
      'کۆدکردنی جوڵەی نەرم لە نێوان زاویەکان بە کتێبخانەی Servo.h'
    ],
    content: `A servo motor is an actuator consisting of a DC motor, reduction gear train, internal potentiometer feedback sensor, and control circuit. Unlike standard DC motors that spin continuously, a positional servo rotates its horn to a commanded angle (typically 0° to 180°) and holds that exact position under load.

PWM Pulse Specifications:
- Signal Frequency: 50 Hz (period = 20 milliseconds).
- 1.0 ms pulse width -> 0 degrees.
- 1.5 ms pulse width -> 90 degrees (center).
- 2.0 ms pulse width -> 180 degrees.

Wire Color Coding (SG90):
- Brown / Black: GND
- Red: VCC (+5V)
- Orange / Yellow: PWM Signal Pin (e.g. Pin 9)`,
    contentKu: `مۆتۆڕی سێرڤۆ (Servo Motor) پێکدێت لە مۆتۆڕێکی بچووک، گێڕی کەمکەرەوەی خێرایی، بەرگری گۆڕاو (Potentiometer) بۆ زانینی شوێن، و بازنەی کۆنترۆڵ. بە پێچەوانەی مۆتۆڕی ئاسایی کە بەردەوام دەسوڕێتەوە، سێرڤۆ دەتوانیت دیاریبکەیت لە چ زاویەیەکدا بوەستێت (لە ٠ تا ١٨٠ پلە) و بەرگری لە بەرامبەر هێزی دەرەکی دەکات بۆ پاراستنی ئەو شوێنە.

ترپەکانی کۆنترۆڵ (PWM):
- فریکوێنسی سیگناڵ: ٥٠ هێرتز (ماوەی ٢٠ میلی چرکە).
- ترپەی ١ میلی چرکە -> دەچێتە سەر زاویەی ٠ پلە.
- ترپەی ١.٥ میلی چرکە -> دەچێتە سەر ٩٠ پلە (ناوەڕاست).
- ترپەی ٢ میلی چرکە -> دەچێتە سەر ١٨٠ پلە.

ڕەنگی وایەرەکانی سێرڤۆ:
- قاوەیی یان ڕەش: گراوند (GND).
- سوور: کارەبای ٥ ڤۆڵت (+5V).
- پرتەقاڵی یان زەرد: سیگناڵی کۆنترۆڵ (بەستران بە پینی PWM وەک پین ٩).`,
    circuitInfo: {
      board: 'Arduino Uno R3',
      parts: ['SG90 Micro Servo', 'Breadboard or Direct Jumpers', '3x Jumper Wires'],
      wiring: [
        { from: 'Servo Brown Wire', to: 'Arduino GND' },
        { from: 'Servo Red Wire', to: 'Arduino 5V' },
        { from: 'Servo Orange Wire', to: 'Arduino Pin 9', note: 'Timer 1 PWM' }
      ]
    },
    codeSnippet: `#include <Servo.h>

Servo myServo; // Create servo object

void setup() {
  myServo.attach(9); // Attach servo to pin 9
}

void loop() {
  // Sweep from 0 degrees to 180 degrees
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15); // Wait 15ms for servo to reach position
  }

  // Sweep back from 180 degrees to 0 degrees
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
}`,
    exercisePrompt: 'Attach an analog potentiometer to Pin A0 and use map(val, 0, 1023, 0, 180) to steer the servo angle manually.',
    exercisePromptKu: 'بەرگرییەکی گۆڕاو (Potentiometer) بە پینی ئانالۆگ A0 ببەستە و بە بەکارهێنانی فەنکشنی map زاویەی سێرڤۆکە بە دەست کۆنترۆڵ بکە.',
    miniQuiz: {
      question: 'What is the typical pulse period and frequency used to communicate with standard hobby servos?',
      questionKu: 'ماوە و فریکوێنسی ئاسایی سیگناڵ بۆ کۆنترۆڵی سێرڤۆ چەندە؟',
      options: ['50 Hz (20 ms period)', '1 kHz (1 ms period)', '490 Hz (2 ms period)', '100 kHz (10 µs period)'],
      optionsKu: ['٥٠ هێرتز (ماوەی ٢٠ میلی چرکە)', '١ کیلۆهێرتز (١ میلی چرکە)', '٤٩٠ هێرتز (٢ میلی چرکە)', '١٠٠ کیلۆهێرتز (١٠ مایکرۆچرکە)'],
      correctIndex: 0,
      explanation: 'Hobby RC servos expect a PWM signal refreshed every 20ms (50Hz) with high pulse width between 1ms and 2ms.',
      explanationKu: 'سێرڤۆکان پێویستیان بە فریکوێنسی ٥٠ هێرتزە بە درێژی ترپەی ١ تا ٢ میلی چرکە.'
    }
  },

  // ADVANCED
  {
    id: 'l-adv-1',
    level: 'advanced',
    title: 'ESP32 Dual-Core Architecture, Wi-Fi & Web Servers',
    titleKu: 'مایکرۆکۆنترۆلەری دوو ناووکی ESP32، تۆڕی وایفای و ڕاژەی وێب',
    shortDesc: 'Harness the power of 240MHz dual 32-bit Xtensa cores, Wi-Fi connectivity, and web sockets.',
    shortDescKu: 'سودوەرگرتن لە پرۆسێسەری دوو ناووکی ٢٤٠ مێگاهێرتز، توانای پەیوەندی وایفای، و ڕاژەی وێب.',
    duration: '35 mins',
    objectives: [
      'Compare ESP32 vs ATmega328P specifications (RAM, Flash, CPU, 3.3V logic)',
      'Connect ESP32 to home Wi-Fi station mode',
      'Host an embedded HTML web server to toggle LEDs from a mobile phone browser'
    ],
    objectivesKu: [
      'بەراوردکردنی تواناکانی چیپی ESP32 لەگەڵ ئاردوینۆ ئۆنۆ (فریکوێنسی، ڕام، ڤۆڵتیەی ٣.٣ ڤۆڵت)',
      'بەستنەوەی ESP32 بە مۆدێمی ماڵەوە لەڕێگەی وایفای',
      'دروستکردنی لاپەڕەیەکی کۆنترۆڵ (Web Server) بۆ کوژاندنەوە و هەڵکردنی گلۆپ لە مۆبایلەوە'
    ],
    content: `The ESP32 (designed by Espressif) represents a monumental leap over traditional 8-bit AVR microcontrollers.
Specifications:
- CPU: Dual-core Tensilica Xtensa 32-bit LX6 running up to 240 MHz.
- SRAM: 520 KB (260x more than Arduino Uno!).
- Flash Memory: 4 MB to 16 MB SPI Flash.
- Wireless: 802.11 b/g/n Wi-Fi + Bluetooth v4.2 BR/EDR and BLE.
- Operating Logic Voltage: 3.3V (Pins are NOT 5V tolerant!).

WARNING: Never connect a 5V sensor output directly to an ESP32 GPIO pin without a resistor voltage divider or logic level shifter, as this will destroy the silicon input gate.`,
    contentKu: `چیپی بەناوبانگی ESP32 جیاوازییەکی زۆر گەورەی هەیە بەراورد بە ئاردوینۆ ئۆنۆی کلاسیک:
تایبەتمەندییەکان:
- پرۆسێسەر: دوو ناووکی ٣٢ بیتی Xtensa بە خێرایی تا ٢٤٠ مێگاهێرتز.
- یادگەی SRAM: ٥٢٠ کیلۆبایت (٢٦٠ هێندەی ئاردوینۆ ئۆنۆ!).
- بیرگەی Flash: ٤ مێگابایت تا ١٦ مێگابایت.
- پەیوەندی بێتەل: وایفای ناوەکی + بلوتوث v4.2 BLE.
- ڤۆڵتیەی ناوەکی: ٣.٣ ڤۆڵت (پینەکان بەرگەی ٥ ڤۆڵت ناگرن!).

ئاگاداری: هەرگیز وایەری پێوانەی هەستەوەری ٥ ڤۆڵت ڕاستەوخۆ بە پینی ESP32 مەبەستە بەبێ دابەشکەری ڤۆڵتیە یان شیفتەری لۆجیک، چونکە چیپەکە دەسوتێت.`,
    circuitInfo: {
      board: 'ESP32 DevKit V1 (30-pin)',
      parts: ['1x LED', '1x 220 Ohm Resistor', 'Breadboard'],
      wiring: [
        { from: 'ESP32 GPIO 2 (Built-in LED)', to: '220Ω Resistor' },
        { from: 'Resistor', to: 'LED Anode' },
        { from: 'LED Cathode', to: 'ESP32 GND' }
      ]
    },
    codeSnippet: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2; // Built-in blue LED

void handleRoot() {
  String html = "<html><body style='background:#070b14;color:#00d9ff;font-family:sans-serif;text-align:center;'>";
  html += "<h1>KRD Arduino Universe - ESP32 IoT Node</h1>";
  html += "<p><a href='/on'><button style='padding:15px;background:#00d9ff;border:none;border-radius:8px;'>TURN LED ON</button></a></p>";
  html += "<p><a href='/off'><button style='padding:15px;background:#334155;color:white;border:none;border-radius:8px;'>TURN LED OFF</button></a></p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\\nWiFi connected! IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/on", []() {
    digitalWrite(ledPin, HIGH);
    server.sendHeader("Location", "/");
    server.send(303);
  });
  server.on("/off", []() {
    digitalWrite(ledPin, LOW);
    server.sendHeader("Location", "/");
    server.send(303);
  });

  server.begin();
}

void loop() {
  server.handleClient();
}`,
    exercisePrompt: 'Expand the web server to read a DHT22 temperature and humidity sensor and update the readings dynamically on the web page.',
    exercisePromptKu: 'ڕاژەی وێبەکە فراوان بکە تا زانیاری پلەی گەرمی و شێداری لە هەستەوەری DHT22 بخوێنێتەوە و لەسەر مۆبایلەکەت نیشانی بدات.',
    miniQuiz: {
      question: 'What is the native logic voltage of ESP32 GPIO pins?',
      questionKu: 'ڤۆڵتیەی کارکردنی فەرمی پینەکانی چیپی ESP32 چەندە؟',
      options: ['5.0 Volts', '3.3 Volts', '1.8 Volts', '12.0 Volts'],
      optionsKu: ['٥.٠ ڤۆڵت', '٣.٣ ڤۆڵت', '١.٨ ڤۆڵت', '١٢.٠ ڤۆڵت'],
      correctIndex: 1,
      explanation: 'The ESP32 runs exclusively on 3.3V logic. Connecting 5V signals directly can permanently damage the GPIO multiplexer.',
      explanationKu: 'چیپی ESP32 بە ڤۆڵتیەی ٣.٣ ڤۆڵت کاردەکات و ناردنی ٥ ڤۆڵت زیانی پێدەگەیەنێت.'
    }
  },
  {
    id: 'l-adv-2',
    level: 'advanced',
    title: 'I2C & SPI Serial Communication Protocols',
    titleKu: 'پرۆتۆکۆلەکانی پەیوەندی I2C و SPI لە نێوان چیپەکان',
    shortDesc: 'Understand multi-drop 2-wire I2C addressing and high-speed 4-wire full-duplex SPI buses.',
    shortDescKu: 'فێربوونی پرۆتۆکۆلی دوو وایەری I2C بە ئەدرێس و پرۆتۆکۆلی خێرای چوار وایەری SPI.',
    duration: '30 mins',
    objectives: [
      'Understand the architecture of SDA (Data) and SCL (Clock) in I2C',
      'Learn how multiple sensors share identical pins using 7-bit addresses (e.g. 0x27, 0x68)',
      'Contrast I2C speeds (100-400 kHz) with SPI high-speed performance (up to 40 MHz)'
    ],
    objectivesKu: [
      'تێگەیشتن لە پێکهاتەی هێڵی داتا (SDA) و هێڵی کاتژمێر (SCL) لە I2C',
      'چۆنیەتی بەستنی چەندین هەستەوەر لەسەر هەمان دوو وایەر بە ئەدرێسی تایبەت',
      'بەراوردکردنی خێرایی I2C لەگەڵ خێرایی زۆری ناردنی داتا بە سیستەمی SPI'
    ],
    content: `When connecting sophisticated sensors (like OLED displays, IMU accelerometers, and RTC clocks), GPIO pins are too limited for parallel communication. We rely on synchronized serial buses:

1. I2C (Inter-Integrated Circuit):
- Created by Philips/NXP.
- Requires only 2 wires: SDA (Serial Data) and SCL (Serial Clock).
- Both lines require pull-up resistors (typically 4.7kΩ to VCC).
- Uses 7-bit hardware addresses allowing up to 127 devices on the same 2 pins!
- Arduino Uno I2C pins: A4 (SDA), A5 (SCL).

2. SPI (Serial Peripheral Interface):
- 4 wires: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCK (Serial Clock), SS/CS (Slave Select).
- Full duplex, much faster (10 MHz - 40 MHz), ideal for SD cards and TFT graphic screens.`,
    contentKu: `کاتێک شاشەی گرافیکی یان چەندین هەستەوەری پێشکەوتوو دەبەستیت، پینەکان بەشی بەستنی سەربەخۆ ناکەن. بۆیە سوود لە پەیوەندی هاوکات وەردەگرین:

١. پرۆتۆکۆلی I2C:
- تەنها دوو وایەری پێویستە: SDA (داتا) و SCL (کاتژمێری هاوکات).
- هەردوو هێڵەکە پێویستیان بە بەرگری Pull-Up هەیە (بە زۆری ٤.٧ کیلۆ ئۆم).
- ئەدرێسی ٧ بیتی بەکاردەهێنێت کە ڕێگە دەدات تا ١٢٧ ئامێر لەسەر هەمان دوو وایەر ببەسترێن!
- پینەکانی لە ئاردوینۆ ئۆنۆ: A4 (SDA) و A5 (SCL).

٢. پرۆتۆکۆلی SPI:
- چوار وایەر بەکاردەهێنێت: MOSI, MISO, SCK, CS.
- زۆر خێراترە و دەگاتە سەروو ٢٠ مێگاهێرتز، زۆر گونجاوە بۆ شاشە ڕەنگاوڕەنگەکان و فلاش میمۆری.`,
    circuitInfo: {
      board: 'Arduino Uno R3',
      parts: ['1602 LCD with I2C Backpack', '4x Jumper Wires'],
      wiring: [
        { from: 'LCD VCC', to: 'Arduino 5V' },
        { from: 'LCD GND', to: 'Arduino GND' },
        { from: 'LCD SDA', to: 'Arduino Pin A4' },
        { from: 'LCD SCL', to: 'Arduino Pin A5' }
      ]
    },
    codeSnippet: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Set LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("KRD Arduino Univ");
  lcd.setCursor(0, 1);
  lcd.print("I2C Protocol OK!");
}

void loop() {
  // Static display demo
}`,
    exercisePrompt: 'Run an I2C Scanner sketch to automatically search addresses from 1 to 127 and detect unknown connected chips on the Serial monitor.',
    exercisePromptKu: 'کۆدی I2C Scanner بەکاربهێنە بۆ دۆزینەوەی ئۆتۆماتیکی ئەدرێسی ئەو پارچانەی بە ئاردوینۆکەوە بەستراون لە نێوان ١ تا ١٢٧.',
    miniQuiz: {
      question: 'Which two pins on the standard Arduino Uno R3 are internally connected to hardware I2C (SDA and SCL)?',
      questionKu: 'کامیان لە پینەکانی ئاردوینۆ ئۆنۆ پەیوەستن بە پرۆتۆکۆلی I2C (SDA و SCL)؟',
      options: ['Pin 0 and Pin 1', 'Pin 10 and Pin 11', 'Pin A4 (SDA) and Pin A5 (SCL)', 'Pin 2 and Pin 3'],
      optionsKu: ['پینی ٠ و پینی ١', 'پینی ١٠ و پینی ١١', 'پینی A4 بۆ SDA و پینی A5 بۆ SCL', 'پینی ٢ و پینی ٣'],
      correctIndex: 2,
      explanation: 'On the ATmega328P Arduino Uno, Analog Pin A4 functions as SDA and Analog Pin A5 functions as SCL.',
      explanationKu: 'لە ئاردوینۆ ئۆنۆدا پینی A4 بۆ SDA داتا و پینی A5 بۆ SCL کاتژمێری I2C بەکاردێت.'
    }
  }
];
