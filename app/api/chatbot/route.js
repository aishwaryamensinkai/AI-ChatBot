// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// export async function POST(req) {
//   const { message, language, isFirstMessage } = await req.json();

//   const systemMessage = isFirstMessage
//     ? `Start by greeting the user. Respond in ${language}. Mention that you can assist with software installations, troubleshooting, and more.`
//     : `Respond in ${language}.`;

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: systemMessage,
//       },
//       { role: "user", content: message },
//     ],
//   });

//   const suggestedQuestions = [
//     "How can I reset my password?",
//     "What do I do if I encounter an error message?",
//     "How do I configure the installation settings?",
//     "How can I resolve network connectivity issues?",
//   ];

//   return new Response(
//     JSON.stringify({
//       response: response.choices[0].message.content,
//       suggestedQuestions,
//     }),
//     {
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// }

// app/api/chatbot/route.js
// import { NextResponse } from "next/server";
// import { knowledgeBase } from "../smallchatbot/knowledgeBase"; // Import the knowledge base
// import { callLLMForResponse } from "../../lib/llmService"; // Placeholder for LLM API call

// export async function POST(request) {
//   try {
//     const { message } = await request.json();
//     // Normalize the user message for case-insensitive matching
//     const normalizedMessage = message.toLowerCase();

//     // Collect all matched entries from the knowledge base
//     let matchedEntries = [];

//     for (const entry of knowledgeBase) {
//       const match = entry.keywords.some((keyword) =>
//         normalizedMessage.includes(keyword.toLowerCase())
//       );
//       if (match) {
//         matchedEntries.push(entry.response);
//       }
//     }

//     // Default response if no match is found
//     let response = "I'm sorry, I didn't understand that.";

//     if (matchedEntries.length > 0) {
//       // Combine all matched responses into a single string
//       const combinedResponse = matchedEntries.join(" ");

//       // Pass the combined knowledge base responses and user message to the LLM for augmentation
//       response = await callLLMForResponse(message, combinedResponse);
//     }

//     return NextResponse.json({ response });
//   } catch (error) {
//     return NextResponse.json({
//       response: "An error occurred. Please try again.",
//     });
//   }
// }

// app/api/chatbot/route.js
import { NextResponse } from "next/server";
import { knowledgeBase } from "../smallchatbot/knowledgeBase"; // Import the knowledge base
import { callLLMForResponse } from "../../lib/llmService"; // Placeholder for LLM API call

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Normalize the user message for case-insensitive matching
    const normalizedMessage = message.toLowerCase();

    // Collect all matched entries from the knowledge base
    let matchedEntries = [];

    for (const entry of knowledgeBase) {
      const match = entry.keywords.some((keyword) =>
        normalizedMessage.includes(keyword.toLowerCase())
      );
      if (match) {
        matchedEntries.push(entry.response);
      }
    }

    // If no match is found in the knowledge base, return a default message
    if (matchedEntries.length === 0) {
      return NextResponse.json({
        response:
          "I can only assist with software-related questions like installations, troubleshooting, or technical support. Please try asking something related to that.",
      });
    }

    // If matches are found, combine all matched responses
    const combinedResponse = matchedEntries.join(" ");

    // Pass the combined knowledge base responses and user message to the LLM for augmentation
    const response = await callLLMForResponse(message, combinedResponse);

    // Return the LLM-augmented response
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({
      response: "An error occurred. Please try again.",
    });
  }
}
