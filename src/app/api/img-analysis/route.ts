import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  const base64File = imageUrl.split(",")[1];

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KIMI_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "moonshotai/Kimi-K2.5:novita",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Describe" },
                {
                  type: "image_url",
                  image_url: { url: imageUrl },
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    return NextResponse.json({
      result: data.choices?.[0]?.message?.content ?? "No result returned.",
    });
  } catch (error) {
    console.log(error);
  }
}
