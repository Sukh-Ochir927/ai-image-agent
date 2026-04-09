import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: NextRequest) {
  const { base64 } = await req.json();

  try {
    const client = new InferenceClient(process.env.HF_TOKEN);

    const chatCompletion = await client.chatCompletion({
      model: "moonshotai/Kimi-K2.5:novita",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: base64 },
            },
            { type: "text", text: "Describe this image in detail." },
          ],
        },
      ],
    });

    console.log(chatCompletion.choices[0].message);

    return NextResponse.json({ message: chatCompletion.choices[0].message });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
