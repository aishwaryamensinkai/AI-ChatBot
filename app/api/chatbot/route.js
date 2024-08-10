// app/api/chatbot/route.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export async function POST(req) {
  const { message, language } = await req.json();
  const greeting = getGreeting();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant. Start by greeting the user with "${greeting}". Respond in ${language}.`,
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
