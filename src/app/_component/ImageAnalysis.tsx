"use client";

import { ChangeEventHandler, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InferenceClient } from "@huggingface/inference";

function imageToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const ImageAnalysis = () => {
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!imageFile) return;
    setLoading(true);

    const base64 = await imageToBase64(imageFile);
    try {
      const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_TOKEN);

      const chatCompletion = await client.chatCompletion({
        model: "moonshotai/Kimi-K2.5:novita",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: base64 as string },
              },
              { type: "text", text: "Describe this image in detail." },
            ],
          },
        ],
      });
      setResult(chatCompletion?.choices?.[0]?.message.content ?? "no result");
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const handleChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => {
    setImageFile(event.target.files[0]);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-background">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-semibold text-[20px]">Image analysis</h2>
      </div>

      <div className="grid w-full max-w-sm items-start gap-2">
        <Label className="text-sm text-muted-foreground" htmlFor="picture">
          Upload a food photo, and AI will detect the ingredients.
        </Label>
        <div className="flex items-center gap-2">
          <Input
            onChange={handleChange}
            accept="image/png"
            id="picture"
            type="file"
            className="text-sm cursor-pointer w-auto"
          />
          <span className="text-xs text-muted-foreground">JPG, PNG</span>
        </div>
        {imageFile && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            width={100}
            height={250}
            className="rounded-lg border border-border object-cover"
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={loading || !imageFile}
          variant="outline"
          size="sm"
          className="text-sm"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileText className="w-4 h-4 text-muted-foreground" />
          Here is the summary
        </div>
        <p className="text-sm text-muted-foreground">
          {result || "First, enter your image to recognize an ingredients."}
        </p>
      </div>
    </div>
  );
};
