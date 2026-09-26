export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const QUANTUM_SPORTS_SYSTEM_PROMPT = `You are the Quantum² Athletic Intelligence Copilot, an elite AI specialized in high-performance urban sports, street athletics, field trials, endurance running, and technical sportswear engineering.

Core Ecosystem Knowledge:
1. GLOBAL FIELD TRIALS (Sanctioned urban sports events across metropolitan hubs):
   - NIGHT RUN 04 — CHENNAI: Oct 18. 10 KM Night Race on the Radial Circuit (Coastal Expressway & Old Harbor Docks). Features digital radar timing bibs, high-visibility reflective arm-sleeves. Registration open with limited bibs remaining. Sub-4:30 pace recommended for Wave A.
   - UNDERGROUND 3X3 HOOPS — TOKYO: Nov 02. Single-elimination streetball tournament at Shibuya Rooftop Cage with 16 hand-picked invitational squads. High physical contact, rapid transition play, 10-minute game clocks.
   - CONCRETE ASCENT — BERLIN: Dec 05. Extreme elevation vertical speed-stair sprint & incline dash at the Cold War Teufelsberg Radar Dome. Sub-zero thermal conditions, demands high-traction footwear.

2. ATHLETE ROSTER & PROTOCOLS:
   - Maya Chen: Olympics Finalist (100M sprint) & Parkour Kinetics expert (Taipei/Paris). Top speed 34.8 km/h. Tests apparel shear forces under explosive lateral cut angles. Primary kit: Quantum Aero Hoodie v2, Hyper-Flex Track Pant 01.
   - Marcus Vance: Red Bull Reign street basketball champion & dunk artisan from Brooklyn, NYC. 48.5-inch vertical jump. Stress-tests carbon propulsion mid-plates on asphalt outdoor courts. Primary kit: Kinetic Velocity Runner, Carbon Modular Vest.
   - Elena Rostova: UTMB 100-mile alpine ultra-trail podium finisher (Chamonix). 171 km endurance record, operates up to 4,808m elevation. Tests thermal moisture regulation. Primary kit: Quantum Aero Hoodie v2, Carbon Modular Vest.

3. COLLECTIVE ATHLETIC CHALLENGES:
   - 30-Day Velocity Streak: Log at least 5 KM daily at sub-4:30 pace for 30 consecutive days. Over 2,400 cohort runners enrolled.
   - 100 KM Midnight Cypher: Accumulate 100 KM running between 10 PM and 4 AM before the moon cycle closes. Nocturnal endurance mission.

4. TECHNICAL APPAREL & KINETIC FOOTWEAR:
   - Quantum Aero Hoodie v2 ($185): Tri-density composite membrane with micro-ventilation lattices and laser-cut ultrasonic bonding.
   - Hyper-Flex Track Pant 01 ($140): 4-way stretch ballistic nylon with articulated dart knees and waterproof magnetic pocket closures.
   - Kinetic Velocity Runner ($220): Dual-density supercritical foam with 3K full-length carbon propulsion plate and matrix knit shell.
   - Carbon Modular Vest ($195): Aramid panels with Fidlock magnetic buckles and internal hydration routing.

Style & Tone Guidelines:
- Concise, confident, authoritative, athletic, and technically precise.
- When asked about events, provide concrete dates, locations, bib status, and race day advice.
- When asked about training or pacing, give realistic athlete tips for sub-4:30 pace, interval conditioning, or recovery.
- Format responses cleanly with bullet points when listing details or specs.`;

export async function askGroqAI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: QUANTUM_SPORTS_SYSTEM_PROMPT },
            ...messages.slice(-10), // keep recent context
          ],
          temperature: 0.6,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Groq API Error]', response.status, errorText);
        throw new Error(`Groq API returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return reply;
      }
    } catch (err) {
      console.warn('[Groq API] Call failed, using intelligent built-in athletic assistant fallback:', err);
    }
  }

  // Resilient intelligent fallback when GROQ_API_KEY is not configured or offline
  const lastUserMessage = messages
    .filter((m) => m.role === 'user')
    .pop()
    ?.content.toLowerCase() || '';

  if (lastUserMessage.includes('event') || lastUserMessage.includes('race') || lastUserMessage.includes('field trial')) {
    return `### Upcoming Quantum² Global Field Trials:

1. **NIGHT RUN 04 — CHENNAI** (Oct 18, 2025)
   - **Protocol**: 10 KM Midnight Race across Radial Circuit & Coastal Expressway.
   - **Status**: Registration Open (~42 bibs left).
   - **Gear Advisory**: High-contrast reflective kit with lightweight Aero membrane for humidity.

2. **UNDERGROUND 3X3 HOOPS — TOKYO** (Nov 02, 2025)
   - **Protocol**: 16 Invitational Squad tournament at Shibuya Rooftop Cage.
   - **Status**: Few Spots Left (~3 bibs left).
   - **Gear Advisory**: Kinetic Velocity Runners or high-traction footwear with lateral carbon support.

3. **CONCRETE ASCENT — BERLIN** (Dec 05, 2025)
   - **Protocol**: Vertical speed stair & incline dash at Teufelsberg Radar Dome.
   - **Status**: Upcoming notification list active.

Would you like credentials to register for any of these trials?`;
  }

  if (lastUserMessage.includes('athlete') || lastUserMessage.includes('maya') || lastUserMessage.includes('marcus') || lastUserMessage.includes('elena')) {
    return `### The Collective Athlete Roster:

- **Maya Chen** (Taipei / Paris): Olympic 100M finalist and parkour kinetics master. Peak speed: 34.8 km/h. Tests apparel shear forces under explosive lateral cut angles.
- **Marcus Vance** (Brooklyn, NYC): Red Bull Reign streetball champion with an elite 48.5" vertical leap. Co-engineers our carbon propulsion plate sneakers for outdoor asphalt.
- **Elena Rostova** (Chamonix): UTMB 100-mile ultra-endurance athlete (171 km record). Tests stormproof breathability in sub-zero alpine altitudes.

Which athlete's workout telemetry or gear setup would you like to review?`;
  }

  if (lastUserMessage.includes('challenge') || lastUserMessage.includes('streak') || lastUserMessage.includes('cypher')) {
    return `### Active Collective Discipline Challenges:

- **30-Day Velocity Streak**: Maintain at least 5 KM daily at sub-4:30/km pace for 30 consecutive days. Currently 2,410 runners enrolled with an 82% target pace rate.
- **100 KM Midnight Cypher**: Accumulate 100 KM running exclusively between 10:00 PM and 4:00 AM before the current lunar cycle closes.

You can join either challenge directly from the **Community** section to sync your telemetry with the Global Velocity Board!`;
  }

  if (lastUserMessage.includes('shoe') || lastUserMessage.includes('sneaker') || lastUserMessage.includes('velocity runner') || lastUserMessage.includes('gear')) {
    return `### Kinetic Velocity Runner & Lab Gear Specifications:

- **Kinetic Velocity Runner ($220.00)**: Features dual-density supercritical foam with an embedded 3K full-length carbon propulsion plate and ultra-breathable matrix knit shell. Designed for 0-40 km/h acceleration with minimal ground contact latency.
- **Quantum Aero Hoodie v2 ($185.00)**: Tri-density composite membrane engineered for extreme storm resistance without suffocating heat retention.
- **Hyper-Flex Track Pant 01 ($140.00)**: 4-way stretch ballistic nylon with articulated dart knees and waterproof magnetic pocket closures.

Inspect the 3D model in our **Kinetic 3D Lab** at the top of the page!`;
  }

  return `Welcome to **Quantum² Athletic Intelligence**. I can provide complete tactical details on our **Global Field Trials** (Chennai, Tokyo, Berlin), the **Athlete Roster** (Maya Chen, Marcus Vance, Elena Rostova), active **Telemetry Challenges**, and our **Season 04 Lab Drops**.

What athletic protocol, event schedule, or gear recommendation are you looking for?`;
}
