"use client";

import { useState } from "react";
import { Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Ingredients = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    setReply(data.replay);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-background">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-muted-foreground" />
        <h2 className="font-semibold text-[20px]">Ingredient recognition</h2>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="ingredient-text"
          className="text-sm text-muted-foreground"
        >
          Describe the food, and AI will detect the ingredients.
        </label>
        <textarea
          id="ingredient-text"
          className="border border-border rounded-xl p-3 text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Орц тодорхойлох"
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
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
          Identified Ingredients
        </div>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {reply || "First, enter your text to recognize an ingredients."}
        </p>
      </div>
    </div>
  );
};
