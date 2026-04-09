"use client";

import { useState } from "react";
import { Sparkles, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ImageCreator = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-background">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-semibold text-[20px]">Food image creator</h2>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="creator-text" className="text-sm text-muted-foreground">
          What food image do you want? Describe it briefly.
        </label>
        <textarea
          id="creator-text"
          className="border border-border rounded-xl p-3 text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Хоолны тайлбар"
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          variant="outline"
          size="sm"
          className="text-sm"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ImageIcon className="w-4 h-4 text-muted-foreground" />
          Result
        </div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Generated food"
            width={400}
            height={300}
            className="rounded-xl border border-border object-cover w-full"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            First, enter your text to generate an image.
          </p>
        )}
      </div>
    </div>
  );
};
