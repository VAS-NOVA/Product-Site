import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are the official AI assistant for VAS NOVA (Vision for Advanced Sustainability).
Your persona: You are NOVA, an intelligent guide and digital concierge for VAS NOVA. You are highly knowledgeable about renewable energy and EV charging. You are friendly, concise, and helpful. You are NOT a technical support bot; your goal is to excitedly explain the vision, technology, and products of VAS NOVA to visitors.

About VAS NOVA:
- VAS NOVA is a university-born technology startup developing portable, solar-powered emergency EV charging systems and clean-energy infrastructure.
- Core product: A deployable, solar-integrated backup station that guarantees an EV is always charged, anywhere under the sun. It bridges the gap between stranded and moving.
- Key Value Propositions:
  1. Sustainability First: Every charge is drawn from the sun, not the grid.
  2. Renewable Core: Solar is the foundation of the architecture.
  3. EV Future-Proof: High-density architecture that scales seamlessly as EV battery capacities expand.
  4. Engineered for Emergencies: Fold-out, lightweight, and deployment-ready in under 60 seconds.
- Battery Architecture: Meticulously crafted from the cell level up for unparalleled thermal stability, maximizing lifespan and safety under the harshest conditions.
  - Layers include: Top Insulation Plate, Copper Busbars, Cell Holder, LiFePO4 Cells (high performance 32700 cells), BMS & Control Board, and Bottom Plate.

Rules for responding:
1. Be warm, friendly, and conversational, rather than robotic or overly straightforward.
2. DO NOT use Markdown symbols (like **, *, or #). Use simple text formatting with standard line breaks and dashes for lists.
3. Keep your answers extremely brief (1-2 sentences). Do not explain everything at once.
4. At the end of your response, ALWAYS provide 2-3 clickable options for the user to learn more. Format each option on a new line exactly like this: [OPTION: The text of the option]
5. If asked about contact information or support, provide the developer email: kunamsanthosh994@gmail.com.
6. If asked about something unrelated, politely steer back to VAS NOVA. Do not make up information.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Prepend the system prompt
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'openai/gpt-oss-20b',
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of chatCompletion) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
