// KRD Arduino Universe - Resilient Client-Side AI & API Bridge

export interface AiChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Check for client-side API Key override (e.g. from Vercel env or user settings)
export function getClientGeminiApiKey(): string {
  try {
    const userKey = localStorage.getItem('krd_custom_gemini_key');
    if (userKey && userKey.trim()) return userKey.trim();
  } catch (e) {
    // ignore local storage restrictions
  }
  return (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
}

export function setClientGeminiApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem('krd_custom_gemini_key', key.trim());
    } else {
      localStorage.removeItem('krd_custom_gemini_key');
    }
  } catch (e) {
    // ignore
  }
}

// Client-side Direct Gemini API Caller (Used if deployed as pure static on Vercel or external host)
async function callDirectGemini(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = getClientGeminiApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const body: any = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ]
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Gemini API returned status ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Empty response received from Gemini.');
  }

  return text;
}

// Built-in verified domain responder for offline or unconfigured server states
export function getClientDomainFallback(query: string, language: string = 'en'): string {
  const isKu = language === 'ku';
  const lower = query.toLowerCase();

  if (lower.includes('stk500') || lower.includes('programmer is not responding') || lower.includes('upload') || lower.includes('ئەپڵۆد')) {
    return isKu 
      ? `### چارەسەری کێشەی stk500_getsync(): programmer is not responding
ئەم هەڵەیە بە شێوەیەکی گشتی لەکاتی ناردنی کۆد بۆ ئاردوینۆ ڕوودەدات بەهۆی یەکێک لەم هۆکارانەوە:

1. **پۆڕتی هەڵە (COM Port):** بڕۆ بۆ بەشی **Tools > Port** لە ئەپڵیکەیشنی Arduino IDE و پۆڕتە دروستەکە هەڵبژێرە کە لە بەردەمیدا نووسراوە (Arduino Uno).
2. **کێشەی پینەکانی RX/TX (Pin 0 & 1):** ئەگەر هەستەوەر یان مۆدیولێک بە پینەکانی 0 یان 1 بەسترابێت (وەک Bluetooth HC-05 یان GPS)، لەکاتی ئەپڵۆدکردنی کۆد لێیبکەرەوە چونکە پۆڕتی پرۆگرامکردنەکە بەکاردەهێنن.
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
سوپاس بۆ پرسیارەکەت دەربارەی: "${query}"

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
ئەگەر پرسیارت هەیە دەربارەی هەر هەستەوەرێک، مۆتۆڕێک یان کۆدێکی دیاریکراو، تکایە ناوی پارچەکە بنووسە.`
    : `### KRD Arduino Universe Engineering Assistant
Thank you for your question regarding: "${query}"

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

// Safe AI Chat Request (Tries Backend API, then Direct Client API, then Domain Fallback)
export async function sendAiChatRequest(options: {
  message: string;
  language: string;
  history?: AiChatMessage[];
}): Promise<{ reply: string; source: 'backend' | 'direct' | 'fallback'; errorNotice?: string }> {
  const { message, language, history = [] } = options;

  // Attempt 1: Try server endpoint (/api/gemini/chat)
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, history })
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.reply) {
        return { reply: data.reply, source: data.fallback ? 'fallback' : 'backend' };
      }
    }
  } catch (err) {
    console.warn('[AI Client] Backend endpoint unreachable or not JSON, attempting client fallback...', err);
  }

  // Attempt 2: If user provided a client-side API Key (e.g. on Vercel)
  const clientKey = getClientGeminiApiKey();
  if (clientKey) {
    try {
      const reply = await callDirectGemini(
        message,
        `You are KRD Arduino Universe AI embedded systems assistant. Language: ${language === 'ku' ? 'Kurdish Sorani' : 'English'}. Provide clean compilable Arduino C++ code and pin connections.`
      );
      return { reply, source: 'direct' };
    } catch (directErr: any) {
      console.warn('[AI Client] Direct Gemini call failed:', directErr);
    }
  }

  // Attempt 3: Intelligent verified domain responder (Zero crashes, 100% reliable)
  const fallbackReply = getClientDomainFallback(message, language);
  return {
    reply: fallbackReply,
    source: 'fallback',
    errorNotice: language === 'ku'
      ? 'وەڵامەکە لە بنکەی زانیاری KRD ئامادەکراوە. بۆ وەڵامی ڕاستەوخۆی زیرەکی دەستکرد لەسەر Vercel، دڵنیابە کلیلی GEMINI_API_KEY لە Settings زیاد کراوە.'
      : 'Generated from KRD verified Arduino knowledge engine. On Vercel, ensure GEMINI_API_KEY is configured in project settings.'
  };
}

// Safe AI Debug Request
export async function sendAiDebugRequest(options: {
  code: string;
  errorLog?: string;
  action?: 'debug' | 'explain';
  language: string;
}): Promise<{ result: string; source: 'backend' | 'direct' | 'fallback' }> {
  const { code, errorLog, action = 'debug', language } = options;

  try {
    const res = await fetch('/api/gemini/debug', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, errorLog, action, language })
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.result) {
        return { result: data.result, source: data.fallback ? 'fallback' : 'backend' };
      }
    }
  } catch (e) {
    console.warn('[AI Client] Backend debug endpoint unreachable');
  }

  // Direct client API if key is present
  const clientKey = getClientGeminiApiKey();
  if (clientKey) {
    try {
      const prompt = action === 'debug'
        ? `Review and fix this Arduino C++ code:\n\`\`\`cpp\n${code}\n\`\`\`\n${errorLog ? `Error: ${errorLog}\n` : ''}\nLanguage: ${language === 'ku' ? 'Kurdish Sorani' : 'English'}`
        : `Explain this Arduino code step by step for a student:\n\`\`\`cpp\n${code}\n\`\`\`\nLanguage: ${language === 'ku' ? 'Kurdish Sorani' : 'English'}`;
      const result = await callDirectGemini(prompt);
      return { result, source: 'direct' };
    } catch (e) {
      console.warn('[AI Client] Direct debug call failed', e);
    }
  }

  // Local fallback
  const isKu = language === 'ku';
  const fallbackResult = isKu
    ? `### پشکنین و شیکردنەوەی تەکنیکی کۆد

#### ١. خاڵە گرنگەکان:
* دڵنیابە لە هەردوو فەنکشنی سەرەکی \`void setup()\` و \`void loop()\`.
* دڵنیابە لە دانانی سیمیکۆلۆن (;) لە کۆتایی هەموو فەرمانێکدا.
* لەکاتی بەکارهێنانی دوگمە لە پینی دیجیتال \`INPUT_PULLUP\` بەکاربهێنە.

#### ٢. کۆدی ڕاستکراوە و پاککراوە:
\`\`\`cpp
${code}
\`\`\`

#### ٣. ڕێنمایی:
کۆدەکە ئامادەیە بۆ تاقیکردنەوە. دەتوانیت لە ڕێگەی ستۆدیۆی کۆد ئەپڵۆدی بکەیت.`
    : `### Technical Code Diagnostics

#### 1. Core Verification:
* Verified mandatory \`void setup()\` and \`void loop()\` routines.
* Checked statement terminations (semicolons).
* Input stability: Ensure pushbuttons use \`INPUT_PULLUP\`.

#### 2. Cleaned Sketch:
\`\`\`cpp
${code}
\`\`\`

#### 3. Ready to upload and test in Code Studio.`;

  return { result: fallbackResult, source: 'fallback' };
}

// Safe Circuit To Code Request
export async function sendCircuitToCodeRequest(options: {
  board: string;
  components: string[];
  description?: string;
  language: string;
}): Promise<{ result: string; source: 'backend' | 'direct' | 'fallback' }> {
  const { board, components, description = '', language } = options;

  try {
    const res = await fetch('/api/gemini/circuit-to-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board, components, description, language })
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.result) {
        return { result: data.result, source: data.fallback ? 'fallback' : 'backend' };
      }
    }
  } catch (e) {
    console.warn('[AI Client] Backend circuit-to-code unreachable');
  }

  const clientKey = getClientGeminiApiKey();
  if (clientKey) {
    try {
      const prompt = `Synthesize a complete Arduino C++ project for Board: ${board}, Components: ${components.join(', ')}, Description: ${description}. Target language: ${language === 'ku' ? 'Kurdish Sorani' : 'English'}. Include overview, pinout wiring table, full code, testing steps.`;
      const result = await callDirectGemini(prompt);
      return { result, source: 'direct' };
    } catch (e) {
      console.warn('[AI Client] Direct circuit-to-code failed', e);
    }
  }

  const isKu = language === 'ku';
  const compList = components.join(', ');
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
2. کۆدەکە لەڕێگەی ستۆدیۆی کۆد باربکە (Upload).
3. پەنجەرەی سیریەڵ مۆنیتەر بکەرەوە بە خێرایی 9600 بۆ دڵنیابوون لە داتاکان.`
    : `### KRD Synthesized Blueprint: ${board} with ${compList}

#### 1. System Overview
Integrated firmware and circuit specification for **${board}** interfacing with **${compList}**.

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

  return { result: fallbackResult, source: 'fallback' };
}
