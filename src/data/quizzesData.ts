import { QuizQuestion } from '../types';

export const quizzesData: QuizQuestion[] = [
  // BEGINNER
  {
    id: 'q-beg-1',
    level: 'beginner',
    type: 'multiple-choice',
    question: 'Why must a resistor always be wired in series with an LED connected to an Arduino pin?',
    questionKu: 'بۆچی دەبێت هەمیشە بەرگری بە شێوەی زنجیرەیی لەگەڵ لید دابنرێت کاتێک بە پینی ئاردوینۆ دەبەسترێت؟',
    options: [
      'To increase the LED maximum brightness',
      'To limit the electrical current and prevent pin/LED burnout',
      'To change the light color of the LED',
      'To convert digital signals into analog signals'
    ],
    optionsKu: [
      'بۆ زیادکردنی ڕووناکی لیدەکە بۆ بەرزترین ئاست',
      'بۆ سنوردارکردنی تەزووی کارەبا و پاراستنی پینەکە و لیدەکە لە سووتان',
      'بۆ گۆڕینی ڕەنگی ڕووناکی لیدەکە',
      'بۆ گۆڕینی سیگناڵی دیجیتال بۆ ئانالۆگ'
    ],
    correctIndex: 1,
    explanation: 'LEDs have almost zero internal resistance once their forward voltage threshold is exceeded. Without a current-limiting resistor (e.g. 220Ω), excessive current (>40mA) will permanently destroy both the LED and the microcontroller GPIO output driver.',
    explanationKu: 'لیدەکان بەرگرییەکی زۆر کەمیان هەیە کاتێک کارەبا بە نێویاندا تێپەڕدەبێت. ئەگەر بەرگری نەبێت، تەزووی لە ڕادەبەدەر دەبێتە هۆی سووتانی پینی بۆردەکە و لیدەکەش.'
  },
  {
    id: 'q-beg-2',
    level: 'beginner',
    type: 'true-false',
    question: 'The code written inside setup() executes continuously in an endless loop until the Arduino is unplugged.',
    questionKu: 'ئەو کۆدەی لەناو setup() نوسراوە بە بەردەوامی دووبارە دەبێتەوە تا ئەو کاتەی کارەبا لەسەر بۆردەکە لادەبەیت.',
    options: ['True', 'False'],
    optionsKu: ['ڕاست', 'هەڵە'],
    correctIndex: 1,
    explanation: 'False. setup() executes strictly once upon boot or reset. The loop() function is the one that executes repeatedly in an endless loop.',
    explanationKu: 'هەڵەیە. فەنکشنی setup() تەنها یەک جار لەگەڵ کارپێکردندا جێبەجێ دەبێت، بەڵام loop() بە بەردەوامی دووبارە دەبێتەوە.'
  },
  {
    id: 'q-beg-3',
    level: 'beginner',
    type: 'multiple-choice',
    question: 'What is the return range of values produced by analogRead(A0) on an Arduino Uno?',
    questionKu: 'مەودای ئەو ژمارانەی لەڕێگەی فەرمانی analogRead(A0) لە ئاردوینۆ ئۆنۆ دەستدەکەون چەندە؟',
    options: ['0 to 255', '0 to 1023', '0 to 4095', '-128 to 127'],
    optionsKu: ['٠ تا ٢٥٥', '٠ تا ١٠٢٣', '٠ تا ٤٠٩٥', '-١٢٨ تا ١٢٧'],
    correctIndex: 1,
    explanation: 'The ATmega328P features a 10-bit Analog-to-Digital Converter (ADC). 2^10 = 1024 discrete quantization steps, ranging from 0 (0V) to 1023 (5V).',
    explanationKu: 'چیپی ئاردوینۆ خاوەنی گۆڕەری ئانالۆگی ١٠ بیتییە، کە ٢ بە توانی ١٠ دەکاتە ١٠٢٤ هەنگاو (لە ٠ بۆ ٠ ڤۆڵت تا ١٠٢٣ بۆ ٥ ڤۆڵت).'
  },

  // INTERMEDIATE
  {
    id: 'q-int-1',
    level: 'intermediate',
    type: 'multiple-choice',
    question: 'When configuring an HC-SR04 ultrasonic sensor, how long should the Trigger pulse remain HIGH before taking an echo measurement?',
    questionKu: 'لە کاتی بەکارهێنانی هەستەوەری ئەڵتراسۆنیک HC-SR04، بۆ چەند کات دەبێت پینی Trigger لەسەر دۆخی HIGH بێت پێش پێوانی Echo؟',
    options: ['10 milliseconds', '10 microseconds', '1 second', '500 microseconds'],
    optionsKu: ['١٠ میلی چرکە', '١٠ مایکرۆچرکە', '١ چرکە', '٥٠٠ مایکرۆچرکە'],
    correctIndex: 1,
    explanation: 'The HC-SR04 datasheet specifies sending a 10µs (microsecond) TTL HIGH pulse on the Trig pin to trigger the internal 8-cycle 40kHz transducer burst.',
    explanationKu: 'بەپێی زانیاری فەرمی حەساسی ئەڵتراسۆنیک، ناردنی ترپەیەکی ١٠ مایکرۆچرکەیی بەسە بۆ دەردانی شەپۆلی دەنگدانەوەکە.'
  },
  {
    id: 'q-int-2',
    level: 'intermediate',
    type: 'multiple-choice',
    question: 'Why can you NOT power a standard 5V hobby servo motor directly from the Arduino Uno 5V pin when moving heavy mechanical loads?',
    questionKu: 'بۆچی نابێت مۆتۆڕی سێرڤۆ ڕاستەوخۆ بە پینی ٥ ڤۆڵتی ئاردوینۆ ببەسترێت کاتێک کێشێکی قورس دەجوڵێنێت؟',
    options: [
      'Because servos require AC voltage rather than DC',
      'Because the stall current of the motor exceeds the 5V regulator current limit and triggers a brownout reset',
      'Because the Arduino pins only output 3.3V',
      'Because the servo will spin backwards'
    ],
    optionsKu: [
      'چونکە سێرڤۆ پێویستی بە کارەبای AC هەیە نەک DC',
      'چونکە کێشانی تەزووی مۆتۆڕ لە ژێر باردا لە توانای بۆردەکە زیاتر دەبێت و دەبێتە هۆی کوژانەوە و ڕیسێت بوونی ئاردوینۆ',
      'چونکە پینەکانی ئاردوینۆ تەنها ٣.٣ ڤۆڵتن',
      'چونکە سێرڤۆکە بە پێچەوانەوە دەسوڕێتەوە'
    ],
    correctIndex: 1,
    explanation: 'An SG90 or MG996R servo motor draws up to 650mA - 2.5A during acceleration or stall. The onboard Arduino 5V regulator can only output ~400mA, causing the supply voltage to dip and triggering the hardware Brown-Out Detector (BOD) reset.',
    explanationKu: 'سێرڤۆکان لەکاتی دەستپێکردن تەزووی سەروو ٥٠٠ میلی ئەمپێر دەکێشن، ڕێکخەری سەر بۆردەکە توانای ئەوەی نییە و کتوپڕ دەبێتە هۆی داکەوتنی ڤۆڵتیە و ڕیسێت بوون.'
  },

  // ADVANCED
  {
    id: 'q-adv-1',
    level: 'advanced',
    type: 'multiple-choice',
    question: 'What happens if you connect a 5V sensor output pin directly to an ESP32 GPIO input pin?',
    questionKu: 'چی ڕوودەدات ئەگەر وایەری دەرچەی هەستەوەرێکی ٥ ڤۆڵت ڕاستەوخۆ بە پینێکی چیپی ESP32 ببەستیت؟',
    options: [
      'It will work perfectly because ESP32 pins are 5V tolerant',
      'The ESP32 will automatically step down the voltage internally',
      'The 5V over-voltage will exceed maximum ratings and permanently damage the ESP32 silicon gate',
      'The sensor will invert its analog readings'
    ],
    optionsKu: [
      'بە تەواوی کاردەکات چونکە ESP32 بەرگەی ٥ ڤۆڵت دەگرێت',
      'بۆردی ESP32 خۆی ڤۆڵتیەکە لە ناخەوە کەم دەکاتەوە',
      'ڤۆڵتیەی ٥ ڤۆڵت لە توانای پینەکان زیاترە و دەبێتە هۆی تێکچوون و سووتانی خێرای دەرچەی چیپەکە',
      'هەستەوەرەکە داتاکانی بە پێچەوانەوە دەخوێنێتەوە'
    ],
    correctIndex: 2,
    explanation: 'The ESP32 is built on a 40nm CMOS process operating natively at 3.3V logic. Its GPIO pins are NOT 5V tolerant (unlike some older microcontrollers). Voltages above 3.6V will puncture the gate oxide layer and destroy the pin.',
    explanationKu: 'چیپی ESP32 تەنها بۆ ڤۆڵتیەی ٣.٣ ڤۆڵت دروستکراوە و پینەکانی بەرگەی سەروو ٣.٦ ڤۆڵت ناگرن، بەستنی ٥ ڤۆڵت زیانی بنەڕەتی پێدەگەیەنێت.'
  },
  {
    id: 'q-adv-2',
    level: 'advanced',
    type: 'multiple-choice',
    question: 'In the I2C serial communication bus, what are the names and roles of the two physical signal wires?',
    questionKu: 'لە پرۆتۆکۆلی دوو وایەری I2C، ناوی دوو هێڵە سەرەکییەکە چییە و فەرمانیان چییە؟',
    options: [
      'MOSI (Master Out) and MISO (Master In)',
      'TX (Transmit) and RX (Receive)',
      'SDA (Serial Data) and SCL (Serial Clock)',
      'PWM (Pulse Width) and VCC (Voltage)'
    ],
    optionsKu: [
      'هێڵی MOSI و MISO',
      'هێڵی TX و RX',
      'هێڵی SDA بۆ داتا و SCL بۆ کاتژمێری هاوکات',
      'هێڵی PWM و VCC'
    ],
    correctIndex: 2,
    explanation: 'I2C uses SDA (Serial Data) for bidirectional data packets and SCL (Serial Clock) generated by the master device to synchronize bit sampling.',
    explanationKu: 'پرۆتۆکۆلی I2C کار بە SDA بۆ ناردن و هێنانی داتا و SCL بۆ کاتژمێر و هاوکاتکردنی ناردنەکە دەکات.'
  }
];
