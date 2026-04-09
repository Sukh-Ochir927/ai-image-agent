"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputFile } from "./InputFile";
import { ImageAnalysisProps } from "./InputFile";
import { FileText } from "lucide-react";

export const ImageAnalysis = ({
  handleChange,
  preview,
}: ImageAnalysisProps) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!preview) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: preview }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) {
      setResult("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-background">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-semibold text-[20px]">Image analysis</h2>
      </div>

      <InputFile handleChange={handleChange} preview={preview} />

      <div className="flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={loading || !preview}
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
