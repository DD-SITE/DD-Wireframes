import Constants from "@/data/Constants";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_AI_API_KEY,
});

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const { model, description, imageUrl } = await req.json();
    const ModelObj = Constants.AiModelList.find(item => item.name === model);
    const modelName = ModelObj?.modelName ?? 'google/gemini-1.5-flash-latest';

    const response = await openai.chat.completions.create({
      model: modelName,
      stream: true,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: description },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk?.choices?.[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (err: any) {
    console.error("OpenAI API Error:", err);
    return NextResponse.json({ error: "AI model failed to respond." }, { status: 500 });
  }
}
