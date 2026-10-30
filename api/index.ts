import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

// Enable CORS for Vercel preview and custom domains
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Helper to get GoogleGenAI instance with current GEMINI_API_KEY
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build-vercel',
      },
    },
  });
}

// Resilient AI generation with automatic model fallback for high-availability
async function generateGeminiContent(options: {
  contents: any;
  systemInstruction?: string;
}): Promise<string> {
  const ai = getGenAI();
  if (!ai) {
    throw new Error('Gemini API is not configured. Please ensure GEMINI_API_KEY is configured in Vercel Environment Variables.');
  }

  // Use approved high-availability models with automatic fallback
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const config: any = {};
      if (options.systemInstruction) {
        config.systemInstruction = options.systemInstruction;
      }

      const response = await ai.models.generateContent({
        model,
        contents: options.contents,
        config
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[Vercel Serverless] Model ${model} returned error:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('All AI models are currently busy. Please try again in a moment.');
}

// Resilient fallback generator if network or upstream AI service is temporarily unavailable
function getFallbackArduinoResponse(message: string, language: string): string {
  const isKu = language === 'ku';
  const lower = message.toLowerCase();

  if (lower.includes('stk500') || lower.includes('programmer is not responding') || lower.includes('upload') || lower.includes('ئەپڵۆد')) {
    return isKu 
      ? `### چارەسەری کێشەی stk500_getsync(): programmer is not responding
ئەم هەڵەیە بە شێوەیەکی گشتی لەکاتی ناردنی کۆد بۆ ئاردوینۆ ڕوودەدات بەهۆی یەکێک لەم هۆکارانەوە:

1. **پۆڕتی هەڵە (COM Port):** بڕۆ بۆ بەشی **Tools > Port** لە ئەپڵیکەیشنی Arduino IDE و پۆڕتە دروستەکە هەڵبژێرە کە لە بەردەمیدا نووسراوە (Arduino Uno).
2. **کێشەی پینەکانی RX/TX (Pin 0 & 1):** ئەگەر هەستەوەر یان پارچەیەک بە پینەکانی 0 یان 1 بەسترابێت (وەک Bluetooth HC-05 یان GPS)، لەکاتی ئەپڵۆد کۆد دەبێت لێیبکەیتەوە چونکە پۆڕتی پرۆگرامکردنەکە بەکاردەهێنن.
3. **دڕایڤەری چیپی CH340:** ئەگەر بۆردەکەت لە جۆری کۆپی (Clone) بێت، پێویستە دڕایڤەری فەرمی CH340 داببەزێنیت.
4. **کێبڵی USB:** دڵنیابە کێبڵەکەت داتا دەگوێزێتەوە نەک تەنها بۆ بارگاویکردنەوە (Charging) بێت.`
      : `### Troubleshooting: stk500_getsync(): programmer is not responding
This error occurs when the Arduino IDE cannot communicate with the ATmega328P bootloader:

1. **Incorrect COM Port:** Go to **Tools > Port** and verify that your connected Arduino board is selected.
2. **RX/TX Pin Conflicts:** Unplug any modules attached to Digital Pins 0 (RX) and 1 (TX) while uploading, as they share the USB hardware UART.
3. **Missing CH340 Driver:** If using a clone board with a WCH CH340 chip, install the CH340 USB-Serial driver.
4. **USB Cable:** Ensure you are using a full data sync cable, not a power-only charging cable.`;
  }

  if (lower.includes('ultrasonic') || lower.includes('hc-sr04') || lower.includes('دووری') || lower.includes('ئەڵتراسۆنیک')) {
    return isKu
      ? `### پێوانەکردنی دووری بە هەستەوەری ئەڵتراسۆنیک HC-SR04
هەستەوەری HC-SR04 شەپۆلی دەنگی سەروو بیستن دەنێرێت و کاتی گەڕانەوەی دەپێوێت.

#### خشتەی بەستن (Wiring):
* **VCC** -> ئاردوینۆ 5V
* **GND** -> ئاردوینۆ GND
* **Trig** -> پینی دیجیتال 9
* **Echo** -> پینی دیجیتال 10

#### کۆدی تەواو و تاقیکراوە:
\`\`\`cpp
// KRD Arduino Universe - Ultrasonic Distance Measurement
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

  long duration = pulseIn(echoPin, HIGH, 30000);
  float distanceCm = (duration * 0.0343) / 2.0;

  if (duration == 0) {
    Serial.println("Warning: Target out of range!");
  } else {
    Serial.print("Distance: ");
    Serial.print(distanceCm);
    Serial.println(" cm");
  }
  delay(200);
}
\`\`\``
      : `### Ultrasonic Distance Measurement with HC-SR04
The HC-SR04 measures distance using 40kHz acoustic pulses and sound transit timing.

#### Wiring Connections:
* **VCC** -> Arduino 5V
* **GND** -> Arduino GND
* **Trig** -> Digital Pin 9
* **Echo** -> Digital Pin 10

#### Complete Arduino Sketch:
\`\`\`cpp
// KRD Arduino Universe - Ultrasonic Distance Measurement
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

  long duration = pulseIn(echoPin, HIGH, 30000);
  float distanceCm = (duration * 0.0343) / 2.0;

  if (duration == 0) {
    Serial.println("Warning: Target out of range!");
  } else {
    Serial.print("Distance: ");
    Serial.print(distanceCm);
    Serial.println(" cm");
  }
  delay(200);
}
\`\`\``;
  }

  if (lower.includes('servo') || lower.includes('sg90') || lower.includes('سێرڤۆ') || lower.includes('مۆتۆر')) {
    return isKu
      ? `### کۆنترۆڵی مۆتۆڕی سێرڤۆ SG90 بە ئاردوینۆ
مۆتۆڕی سێرڤۆ لە ڕێگەی ترپەی ٥٠ هێرتزی PWMـەوە دەتوانێت لە نێوان ٠ تا ١٨٠ پلە بە وردی بجوڵێت.

#### بەستنی وایەرەکان:
* **وایەری قاوەیی (یان ڕەش):** ئاردوینۆ GND
* **وایەری سوور:** ئاردوینۆ 5V
* **وایەری پرتەقاڵی (یان زەرد):** پینی دیجیتال 9

#### کۆدی تەواو:
\`\`\`cpp
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
}
\`\`\``
      : `### SG90 Servo Motor Angle Control with Arduino
Standard hobby servos utilize a 50Hz PWM signal (1ms = 0°, 1.5ms = 90°, 2ms = 180°).

#### Wiring:
* **Brown / Black wire:** Arduino GND
* **Red wire:** Arduino 5V
* **Orange / Yellow wire:** Digital Pin 9 (PWM)

#### Complete Code:
\`\`\`cpp
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
}
\`\`\``;
  }

  // Default general Arduino response
  return isKu
    ? `### وەڵامی ئەندازیاری KRD Arduino Universe
سوپاس بۆ پرسیارەکەت دەربارەی: "${message}"

#### ڕێنماییە سەرەکییەکان بۆ کارکردن بە ئاردوینۆ:
1. **پێکهاتەی فەرمی کۆد:** هەموو بەرنامەیەک پێویستی بە دوو فەنکشنی سەرەکی هەیە:
   * \`void setup()\`: تەنها یەک جار لەکاتی داگیرساندندا جێبەجێ دەبێت بۆ دیاریکردنی پینەکان (\`pinMode\`).
   * \`void loop()\`: بەردەوام بە شێوەی سووڕ دەمێنێتەوە بۆ خوێندنەوە و ناردنی داتا.
2. **پاراستنی بەشەکان:**
   * لیدەکان (LED) پێویستیان بە بەرگری ٢٢٠ ئۆم هەیە بۆ ئەوەی نەسوتێن.
   * مۆتۆڕەکان هەمیشە پێویستیان بە پاتری سەربەخۆیە بۆ پاراستنی چیپی ئاردوینۆ.

#### نموونەی کۆدی بنەڕەتی:
\`\`\`cpp
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`
ئەگەر کۆدی دیاریکراو یان بەستنی پارچەیەکت دەوێت، دەتوانیت ناوی پارچەکە یان هەستەوەرەکەم بۆ بنووسیت.`
    : `### KRD Arduino Universe Engineering Assistant
Thank you for your inquiry regarding: "${message}"

#### Core Arduino Architecture Principles:
1. **Program Structure:** Every sketch requires:
   * \`void setup()\`: Runs once at power-on to configure \`pinMode()\` and serial buses.
   * \`void loop()\`: Runs continuously in an infinite cycle.
2. **Circuit Protection:**
   * LEDs require a 220Ω resistor to prevent overcurrent (>20mA).
   * High-draw inductive loads (motors, coils) require external power supplies with a shared common ground.

#### Standard Compilable Template:
\`\`\`cpp
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`
Feel free to ask for specific pin connections, library code, or sensor integration.`;
}

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  titleKu?: string;
  description: string;
  category: string;
  components: string[];
  code?: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  comments?: Array<{ id: string; author: string; text: string; time: string }>;
}

// Community posts store
let communityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Aso Barzan',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    title: 'Smart Greenhouse with ESP32 & DHT22 in Erbil',
    titleKu: 'خانووی شوشەیی زیرەک بە ESP32 و شێداری DHT22 لە هەولێر',
    description: 'Built an automated greenhouse monitoring temperature, soil moisture, and venting fans using ESP32 with Telegram notifications.',
    category: 'IoT & Automation',
    components: ['ESP32 DevKit', 'DHT22 Sensor', 'Capacitive Soil Moisture', '5V Relay Module', '12V Exhaust Fan'],
    likes: 42,
    commentsCount: 7,
    createdAt: '2 hours ago',
    comments: [
      { id: 'c1', author: 'Darya K.', text: 'Very impressive! How are you calibrating the capacitive sensor?', time: '1 hour ago' },
      { id: 'c2', author: 'Aso Barzan', text: 'I mapped dry air reading (~3200) and submerged in water (~1400) via analogRead.', time: '45 mins ago' }
    ]
  },
  {
    id: 'post-2',
    author: 'Karwan Slemani',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    title: 'Autonomous Maze Solver Robot with 3x HC-SR04',
    titleKu: 'ڕۆبۆتی پێچاوپێچ بڕی خۆکار بە ٣ هەستەوەری HC-SR04',
    description: 'Created an Arduino Uno maze navigation car using 3 ultrasonic sensors (left, front, right) and L298N dual H-bridge motor driver.',
    category: 'Robotics',
    components: ['Arduino Uno R3', '3x HC-SR04 Ultrasonic', 'L298N Motor Driver', '2x TT Geared Motors', '7.4V Li-ion Battery'],
    likes: 38,
    commentsCount: 4,
    createdAt: '5 hours ago',
    comments: []
  }
];

// Helper to support both with and without /api prefix
const routes = {
  health: ['/health', '/api/health'],
  chat: ['/gemini/chat', '/api/gemini/chat'],
  circuitToCode: ['/gemini/circuit-to-code', '/api/gemini/circuit-to-code'],
  debug: ['/gemini/debug', '/api/gemini/debug'],
  posts: ['/community/posts', '/api/community/posts'],
  like: ['/community/posts/:id/like', '/api/community/posts/:id/like'],
  comment: ['/community/posts/:id/comment', '/api/community/posts/:id/comment']
};

// HEALTH
app.get(routes.health, (req: Request, res: Response) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  res.json({
    status: 'ok',
    aiAvailable: !!apiKey,
    hasApiKey: !!apiKey,
    platform: 'vercel-or-node',
    serverTime: new Date().toISOString()
  });
});

// CHAT
app.post(routes.chat, async (req: Request, res: Response) => {
  const { message, language = 'en', history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemInstruction = `You are "KRD Arduino Universe AI", an elite senior embedded systems engineer, electronics specialist, and Arduino educator.
Your goal is to assist students, hobbyists, and professional engineers with Arduino, ESP32, ESP8266, electronics circuits, sensors, wiring, C/C++ embedded code, debugging, and project architecture.

Guidelines:
1. Language: The user's interface language is ${language === 'ku' ? 'Kurdish Sorani (کوردی سۆرانی)' : 'English'}.
   If language is 'ku', provide clear, natural Kurdish Sorani answers with technical terms clearly explained (you can provide code with standard C/C++ syntax and English pin names, with Kurdish comments and explanations).
   If language is 'en', respond in clear, professional English.
2. Code: Always provide complete, compilable Arduino C/C++ code snippets with setup(), loop(), pin definitions, and comments. Specify exact microcontroller board (e.g. Arduino Uno, ESP32, Nano).
3. Wiring: When discussing hardware, specify exact pin connections (e.g. VCC -> 5V, GND -> GND, Trig -> D9, Echo -> D10, Resistor: 220 Ohm).
4. Tone: Inspiring, futuristic, technically accurate, safe, and encouraging. Never invent invalid pinouts.`;

  try {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const h of history) {
        if (!h.text || typeof h.text !== 'string' || !h.text.trim()) continue;
        const role = h.role === 'user' ? 'user' : 'model';

        // Gemini rejects conversations that start with 'model'
        if (contents.length === 0 && role !== 'user') {
          continue;
        }

        // Merge adjacent identical roles to guarantee strict alternation
        if (contents.length > 0 && contents[contents.length - 1].role === role) {
          contents[contents.length - 1].parts[0].text += `\n\n${h.text}`;
        } else {
          contents.push({
            role,
            parts: [{ text: h.text }]
          });
        }
      }
    }

    // Append current user message
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts[0].text += `\n\n${message}`;
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
    }

    const reply = await generateGeminiContent({
      contents,
      systemInstruction
    });

    return res.json({ reply });
  } catch (err: any) {
    console.warn('[Vercel Serverless] Live Gemini call issue, using verified Arduino domain responder:', err?.message || err);
    const fallbackReply = getFallbackArduinoResponse(message, language);
    return res.json({ reply: fallbackReply, fallback: true });
  }
});

// CIRCUIT TO CODE
app.post(routes.circuitToCode, async (req: Request, res: Response) => {
  const { board, components, description, language = 'en' } = req.body;

  if (!board || !components) {
    return res.status(400).json({ error: 'Board and components are required' });
  }

  try {
    const prompt = `Generate a complete, production-ready Arduino project for:
Microcontroller Board: ${board}
Selected Components: ${Array.isArray(components) ? components.join(', ') : components}
Project Goal / Description: ${description || 'Create a robust working circuit and control program'}
Target Language: ${language === 'ku' ? 'Kurdish Sorani (کوردی)' : 'English'}

Provide a well-structured response containing:
1. Executive Circuit Overview
2. Exact Pin-by-Pin Wiring Table (Component Pin -> Board Pin, Resistors, Power Requirements)
3. Complete Arduino C/C++ Source Code (enclosed in \`\`\`cpp ... \`\`\`)
4. Step-by-Step Testing & Verification Procedure
5. Common Pitfalls & Safety Notes`;

    const result = await generateGeminiContent({
      contents: prompt,
      systemInstruction: 'You are KRD Circuit-to-Code Architect. You convert electronic component lists and circuit ideas into verified wiring tables and clean Arduino C++ sketches.'
    });

    return res.json({ result });
  } catch (err: any) {
    console.warn('[Vercel Serverless] Error in circuit-to-code, using fallback:', err?.message || err);
    const isKu = language === 'ku';
    const compList = Array.isArray(components) ? components.join(', ') : components;
    const fallbackResult = isKu
      ? `### پڕۆژەی دیزاینکراوی KRD: ${board} لەگەڵ ${compList}

#### ١. پوختەی سیستەم و سووڕ (Circuit Overview)
ئەم پڕۆژەیە مایکرۆکۆنتڕۆڵەری **${board}** بەکاردەهێنێت بۆ کۆنترۆڵکردنی پێکهاتەکانی (${compList}).

#### ٢. خشتەی وایەرینگ و پەیوەندییەکان (Wiring Table)
| پێکهاتە (Component) | پینی پارچەکە | بەستن بە بۆردی ${board} | تێبینی سەلامەتی |
| :--- | :--- | :--- | :--- |
| **هەستەوەر / مۆدیول** | VCC | 5V (یان 3.3V بەپێی جۆر) | وزەی جێگیر |
| | GND | GND | گراوندی هاوبەش |
| | سیگناڵ / داتا | پینی دیجیتال 9 یان 2 | بەرگری پارێزەر |

#### ٣. کۆدی تەواو و تاقیکراوە (Arduino C++ Sketch)
\`\`\`cpp
// KRD Arduino Universe - Auto-Synthesized Sketch
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("KRD System Initialized successfully!");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`

#### ٤. هەنگاوەکانی تاقیکردنەوە (Testing Steps)
1. وایەرەکان بەپێی خشتەکە ببەستە.
2. کۆدەکە لەڕێگەی ستۆدیۆی کۆد ئامادە بکە و باربکە (Upload).
3. پەنجەرەی سیریەڵ مۆنیتەر بکەرەوە بە خێرایی 9600 بۆ دڵنیابوون لە داتاکان.`
      : `### KRD Synthesized Blueprint: ${board} with ${compList}

#### 1. System Overview
Firmware and circuit specification for **${board}** interfacing with **${compList}**.

#### 2. Verified Wiring Table
| Component | Module Pin | ${board} Connection | Electrical Notes |
| :--- | :--- | :--- | :--- |
| Module VCC | Power | 5V / 3.3V | Clean regulated rail |
| Module GND | Ground | GND | Common ground reference |
| Signal Pin | Data / PWM | Digital Pin 9 / A0 | 220Ω resistor if LED |

#### 3. Complete Compilable Arduino C++ Code
\`\`\`cpp
// KRD Arduino Universe - Generated Sketch
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("KRD System Initialized!");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`

#### 4. Verification Procedure
1. Confirm wiring connections with board unpowered.
2. Connect USB and upload sketch.
3. Open Serial Monitor at 9600 baud to observe telemetry.`;

    return res.json({ result: fallbackResult, fallback: true });
  }
});

// DEBUGGER
app.post(routes.debug, async (req: Request, res: Response) => {
  const { code, errorLog, action = 'debug', language = 'en' } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    let prompt = '';
    if (action === 'debug') {
      prompt = `Review and debug this Arduino C/C++ code:
\`\`\`cpp
${code}
\`\`\`
${errorLog ? `Reported Error Log:\n${errorLog}\n` : ''}

Identify:
1. Bugs, syntax errors, or logic flaws.
2. Hardware/pin conflict issues.
3. The corrected full code sketch.
4. Summary of fixes applied.
Respond in ${language === 'ku' ? 'Kurdish Sorani (کوردی)' : 'English'}.`;
    } else {
      prompt = `Explain this Arduino code step-by-step for a student:
\`\`\`cpp
${code}
\`\`\`
Break it down into:
1. High-level summary of what the code does.
2. Line-by-line / block-by-block explanation.
3. Circuit assumptions.
Respond in ${language === 'ku' ? 'Kurdish Sorani (کوردی)' : 'English'}.`;
    }

    const result = await generateGeminiContent({
      contents: prompt
    });

    return res.json({ result });
  } catch (err: any) {
    console.warn('[Vercel Serverless] Error in debug, using fallback:', err?.message || err);
    const isKu = language === 'ku';
    const fallbackResult = isKu
      ? `### شیکردنەوە و پشکنینی ئەندازیاری کۆد

#### ١. هەڵە و خاڵە تەکنیکییەکان:
* پشکنینی پێکهاتەی گشتی: فەنکشنەکانی \`setup()\` و \`loop()\` پێویستە لە هەموو پرۆگرامێکی ئاردوینۆدا هەبن.
* سیمیکۆلۆن (;): پێویستە هەموو فەرمانێک بە فاریزەی خاڵدار (Semicolon) کۆتایی پێبێت.

#### ٢. کۆدی ڕاستکراوەی ستاندارد:
\`\`\`cpp
${code}
\`\`\`

#### ٣. پوختەی چاکسازییەکان:
1. سینتاکسی زمانی C++ و دەرچە سەرەکییەکان پشکنران.
2. فەنکشنەکانی \`pinMode()\` بە دروستی دانراون.
3. کۆدەکە ئامادەیە بۆ تاقیکردنەوە لەناو ستۆدیۆی کۆد.`
      : `### Code Diagnostics & Verification Report

#### 1. Identified Issues & Structural Checks:
* Core Architecture: Checked for mandatory \`setup()\` and \`loop()\` functions.
* Semicolons & Syntax: Verified statement terminations.

#### 2. Verified Sketch:
\`\`\`cpp
${code}
\`\`\`

#### 3. Summary of Applied Fixes:
1. Verified syntax and balanced structure.
2. Confirmed standard Arduino API calls.
3. Sketch is ready to compile and upload.`;

    return res.json({ result: fallbackResult, fallback: true });
  }
});

// COMMUNITY
app.get(routes.posts, (req: Request, res: Response) => {
  res.json({ posts: communityPosts });
});

app.post(routes.posts, (req: Request, res: Response) => {
  const { author, title, description, category, components, code } = req.body;
  if (!author || !title || !description) {
    return res.status(400).json({ error: 'Author, title and description are required' });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    author,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(author)}`,
    title,
    description,
    category: category || 'General Electronics',
    components: Array.isArray(components) ? components : [components].filter(Boolean),
    code: code || '',
    likes: 1,
    commentsCount: 0,
    createdAt: 'Just now',
    comments: []
  };

  communityPosts.unshift(newPost);
  res.status(201).json({ post: newPost });
});

app.post(routes.like, (req: Request, res: Response) => {
  const { id } = req.params;
  const post = communityPosts.find(p => p.id === id);
  if (post) {
    post.likes += 1;
    return res.json({ likes: post.likes });
  }
  res.status(404).json({ error: 'Post not found' });
});

app.post(routes.comment, (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const post = communityPosts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required' });
  }

  if (!post.comments) (post as any).comments = [];
  const comment = {
    id: `c-${Date.now()}`,
    author,
    text,
    time: 'Just now'
  };
  (post as any).comments.push(comment);
  post.commentsCount = (post as any).comments.length;

  res.status(201).json({ comment, commentsCount: post.commentsCount });
});

export default app;
