import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { message, language, isFirstMessage } = await req.json();

  const systemMessage = isFirstMessage
    ? `Start by greeting the user. Respond in ${language}. Mention that you can assist with software installations, troubleshooting, and more.`
    : `Respond in ${language}.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMessage,
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
