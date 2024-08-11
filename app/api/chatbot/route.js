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

  const suggestedQuestions = [
    "How can I reset my password?",
    "What do I do if I encounter an error message?",
    "How do I configure the installation settings?",
    "How can I resolve network connectivity issues?",
  ];

  return new Response(
    JSON.stringify({
      response: response.choices[0].message.content,
      suggestedQuestions,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
