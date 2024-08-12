import { NextResponse } from "next/server";

// Import the task-specific models
import { handleChatbotRequest } from "../chatbot/route";
import { handleSmallChatbotRequest } from "../smallchatbot/route";

export async function POST(request) {
  try {
    const { model, ...params } = await request.json();

    let response;

    switch (model) {
      case "chatbot":
        response = await handleChatbotRequest(params);
        break;
      case "smallchatbot":
        response = await handleSmallChatbotRequest(params);
        break;
      default:
        response = { response: "Model not found." };
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      response: "An error occurred. Please try again.",
    });
  }
}
