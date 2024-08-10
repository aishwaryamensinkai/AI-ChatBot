// app/api/chatbot/route.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message, language } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Start by greeting the user. Respond in ${language}. Mention that you can assist with software installations, troubleshooting, and more.`,
      },
      { role: "user", content: message },
    ],
  });

  return new Response(
    JSON.stringify({ response: response.choices[0].message.content }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
