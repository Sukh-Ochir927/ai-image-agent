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
    // const response = await fetch(
    //   "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${process.env.HF_TOKEN}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ inputs: prompt }),
    //   },
    // );

    // if (!response.ok) {
    //   const text = await response.text();
    //   return NextResponse.json({ error: text }, { status: response.status });
    // }

    // const arrayBuffer = await response.arrayBuffer();
    // const base64 = Buffer.from(arrayBuffer).toString("base64");
    // const imageUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ message: chatCompletion.choices[0].message });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
