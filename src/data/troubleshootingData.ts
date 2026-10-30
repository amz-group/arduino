import { TroubleshootingItem } from '../types';

export const troubleshootingData: TroubleshootingItem[] = [
  {
    id: 'tb-com-port',
    title: 'Arduino Not Detected / "Port" Greyed Out in IDE',
    titleKu: 'ئاردوینۆ نەناسراوە یان پۆڕتی COM نادیار و ڕەساسییە',
    category: 'connection',
    categoryKu: 'پەیوەندی کێبڵ و پۆڕت',
    severity: 'high',
    symptoms: [
      'Tools > Port menu option is disabled or greyed out.',
      'Computer Device Manager displays "Unknown USB Device" with yellow exclamation.',
      'No chime sound when plugging the USB cable.'
    ],
    symptomsKu: [
      'بەشی Port لە بەرنامەکەدا داخراوە و هیچ پۆڕتێک دیار نییە.',
      'لە بەشی کۆنترۆڵی کۆمپیوتەردا نیشانەی پرسیاری زەرد هەیە لەسەر USB.',
      'لە کاتی خستنەسەری وایەرەکەدا کۆمپیوتەرەکە هیچ دەنگێکی وەرگرتن نادات.'
    ],
    possibleCauses: [
      'Using a "charge-only" micro-USB cable that lacks internal D+ and D- data wires.',
      'Missing CH340 or FTDI USB-to-UART bridge driver chip for inexpensive clones.',
      'USB port defective or insufficient USB bus current on hub.'
    ],
    possibleCausesKu: [
      'بەکارهێنانی وایەری شەحنکردنەوە کە تەنها کارەبا دەگوازێتەوە و وایەری داتای تێدا نییە.',
      'نەبوونی درایڤەری چیپی CH340 یان FTDI لەسەر کۆمپیوتەرەکە بۆ بۆردە کۆپییەکان.',
      'کێشە لە پۆڕتی USBی کۆمپیوتەر یان لاوازی تەزووی کارەبای پۆڕتەکە.'
    ],
    stepsToFix: [
      'Swap the USB cable with a verified high-speed sync/data cable.',
      'Download and install the CH340G / CH341SER driver for Windows or macOS.',
      'Plug directly into a motherboard rear USB 2.0 port instead of front hubs.',
      'Restart the Arduino IDE after installing the driver.'
    ],
    stepsToFixKu: [
      'کێبڵەکە بگۆڕە بە وایەرێکی تایبەتی داتا و شەحن کە پێشتر تاقیکراوەتەوە.',
      'درایڤەری بەناوبانگی CH340 داگرە و لەسەر کۆمپیوتەرەکەت دایمەزرێنە.',
      'وایەرەکە ڕاستەوخۆ لە پۆڕتی پشتەوەی کەیسەکە بدە نەک لە هاب یان بەشی پێشەوە.',
      'دوای دامەزراندنی درایڤەر، بەرنامەی Arduino IDE دابخە و بیکەرەوە.'
    ]
  },
  {
    id: 'tb-stk500',
    title: 'avrdude: stk500_recv(): programmer is not responding',
    titleKu: 'هەڵەی باوی ئەپڵۆد: stk500 programmer is not responding',
    category: 'upload',
    categoryKu: 'هەڵەی ئەپڵۆدکردنی کۆد',
    severity: 'high',
    symptoms: [
      'Compilation succeeds, but during "Uploading..." it freezes for 15 seconds.',
      'Console prints "avrdude: stk500_getsync() attempt 10 of 10: not in sync: resp=0x00".'
    ],
    symptomsKu: [
      'کۆدەکە هیچ هەڵەیەکی ڕێزمانی نییە، بەڵام لەکاتی ئەپڵۆدکردندا دەوەستێت.',
      'لە خوارەوە بە سوور دەنوسێت: stk500 not in sync.'
    ],
    possibleCauses: [
      'Pins D0 (RX) and D1 (TX) have external sensors connected during upload (e.g. HC-05 Bluetooth).',
      'Incorrect board type or incorrect COM port selected in Tools menu.',
      'Bootloader corrupted on the ATmega328P chip.'
    ],
    possibleCausesKu: [
      'هەستەوەر یان بلوتوث بە پینەکانی D0 و D1 بەستراوە لەکاتی ئەپڵۆدکردندا کە هێڵی USB دەگرن.',
      'هەڵبژاردنی جۆری بۆردی هەڵە (وەک دیاریکردنی Mega لەبری Uno) یان هەڵبژاردنی پۆڕتی هەڵە.',
      'تێکچوونی پرۆگرامی سەرەتایی بۆردەکە (Bootloader).'
    ],
    stepsToFix: [
      'UNPLUG any wires connected to Pin 0 (RX) and Pin 1 (TX) during the upload process!',
      'Verify in Tools > Board that "Arduino Uno" is strictly selected.',
      'Press the physical reset button right when the status switches to "Uploading...".',
      'If using Arduino Nano clones, switch Processor to "ATmega328P (Old Bootloader)".'
    ],
    stepsToFixKu: [
      'هەموو ئەو وایەرانەی بەستراون بە پینەکانی ٠ و ١ دەربێنە پێش ئەپڵۆدکردنی کۆدەکە!',
      'دڵنیابە لە بەشی Tools > Board ناوی دروستی بۆردەکەت هەڵبژاردووە.',
      'لە کاتی دەرکەوتنی وشەی Uploading دەست بنێ بە دوگمەی ڕیسێتی سەر بۆردەکەدا.',
      'بۆ ئاردوینۆ نانۆ بڕۆ سەر Tools > Processor و بیگۆڕە بۆ Old Bootloader.'
    ]
  },
  {
    id: 'tb-brownout',
    title: 'Arduino Keeps Resetting When Motor or Servo Starts Moving',
    titleKu: 'ئاردوینۆ خۆی ڕیسێت دەکاتەوە هەر کە مۆتۆڕ یان سێرڤۆ دەجوڵێت',
    category: 'power',
    categoryKu: 'کێشەکانی کارەبا و کێشانی تەزوو',
    severity: 'medium',
    symptoms: [
      'The board resets in an infinite loop every time a servo tries to sweep.',
      'Power LED flickers or dims momentarily.'
    ],
    symptomsKu: [
      'بۆردەکە بەردەوام دەکوژێتەوە و دەستپێدەکاتەوە هەر کاتێک سێرڤۆ دەست بە جوڵە دەکات.',
      'گلۆپی پاوەری ئاردوینۆ بۆ چرکەیەک کز دەبێت.'
    ],
    possibleCauses: [
      'Powering high-current inductive loads (servos/motors) directly from the 5V pin of the Arduino.',
      'Inrush current causing voltage to drop below 4.3V (Brown-Out Detection threshold).'
    ],
    possibleCausesKu: [
      'وەرگرتنی کارەبای زۆری مۆتۆڕ لە پینی ٥ ڤۆڵتی ئاردوینۆ کە توانای ئەو هەموو تەزووەی نییە.',
      'داکەوتنی کتوپڕی ڤۆڵتیە بۆ خوار ٤.٣ ڤۆڵت کە سیستەمی پاراستنی چیپەکە دەستبەجێ ڕیسێتی دەکات.'
    ],
    stepsToFix: [
      'Power the servo/motors from an external 5V-6V battery pack (e.g. 4x AA batteries or DC power supply).',
      'Connect the GND of the external power supply to Arduino GND (Common Ground).',
      'Add a 470µF or 1000µF electrolytic capacitor across the power rails close to the servo.'
    ],
    stepsToFixKu: [
      'سێرڤۆ یان مۆتۆڕەکان لە سەرچاوەی کارەبای دەرەکی (وەک پاتری ٥ ڤۆڵت) کارەبا بدە.',
      'هەمیشە گراوندی پاتری دەرەکی و گراوندی ئاردوینۆ ببەستە بەیەکەوە.',
      'خازنێکی ٤٧٠ مایکرۆفاراد لەسەر هێڵی کارەبای نزیک سێرڤۆکە دابنێ بۆ ڕێگریکردن لە داکەوتنی ڤۆڵتیە.'
    ]
  },
  {
    id: 'tb-floating-pin',
    title: 'Button or Sensor Readings Fluctuate Randomly',
    titleKu: 'خوێندنەوەی دوگمە یان هەستەوەر بە شێوەیەکی هەڵە و ڕەمەکی بەرز و نزم دەبێت',
    category: 'hardware',
    categoryKu: 'هاردوێر و بەستنەوەی بازنەکان',
    severity: 'medium',
    symptoms: [
      'digitalRead() fluctuates between 0 and 1 even when the button is not pressed.',
      'Touching the breadboard or waving a hand triggers the input.'
    ],
    symptomsKu: [
      'فەرمانی digitalRead نێوان ٠ و ١ یاری پێدەکات تەنانەت کاتێک دەستت لەسەر دوگمەکەش نییە.',
      'نزیکبوونەوەی دەستت لە برێدبۆردەکە وا دەکات ئاردوینۆکە بزانێت کرتە کراوە.'
    ],
    possibleCauses: [
      'The input pin is electrically "floating" with no defined logic reference.',
      'Missing pull-up or pull-down resistor.'
    ],
    possibleCausesKu: [
      'پینەکە لە هەوادا ماوەتەوە (Floating) و هیچ بەستراویەکی ڕوونی بە کارەبا یان گراوندەوە نییە.',
      'نەبەستنی بەرگری Pull-Up یان Pull-Down لەگەڵ دوگمەکە.'
    ],
    stepsToFix: [
      'In your setup() code, change `pinMode(pin, INPUT)` to `pinMode(pin, INPUT_PULLUP)`.',
      'Wire the button between the Arduino input pin and GND.',
      'Remember that logic is now inverted: LOW means pressed, HIGH means released.'
    ],
    stepsToFixKu: [
      'لە کۆدەکەتدا فەرمانی `pinMode(pin, INPUT)` بگۆڕە بۆ `pinMode(pin, INPUT_PULLUP)`.',
      'دوگمەکە تەنها لە نێوان پینی دیاریکراو و گراوند (GND) ببەستە.',
      'لە یادتبێت کاتێک INPUT_PULLUP بەکاردێت، دۆخی LOW واتا داگیراوە و HIGH واتا بەردراوە.'
    ],
    codeFix: `// Proper button reading with internal pull-up\nconst int btn = 2;\nvoid setup() {\n  pinMode(btn, INPUT_PULLUP);\n}\nvoid loop() {\n  if (digitalRead(btn) == LOW) {\n    // Button is physically PRESSED!\n  }\n}`
  }
];
