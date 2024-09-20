import axios from "axios";

export async function callLLMForResponse(userMessage, knowledgeBaseResponse) {
  const messages = [
    {
      role: "system",
      content:
        "You are an AI assistant that is helping a user with technical questions. Use the provided knowledge base to respond to the user’s query.",
    },
    {
      role: "user",
      content: `User Message: ${userMessage}`,
    },
    {
      role: "system",
      content: `Knowledge Base Entry: ${knowledgeBaseResponse}`,
    },
  ];

  try {
    // Example with OpenAI GPT-3.5-turbo or GPT-4 (using the chat/completions endpoint)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // Correct endpoint for GPT-3.5-turbo or GPT-4 chat models
      {
        model: "gpt-3.5-turbo", // or "gpt-4"
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Return the generated response from LLM
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling LLM API:", error);
    return "Sorry, there was an issue generating a response.";
  }
}
