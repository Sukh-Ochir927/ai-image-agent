import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: message,
  });
  console.log(response);

  return NextResponse.json({
    replay: response.candidates[0].content.parts[0].text,
  });
}
