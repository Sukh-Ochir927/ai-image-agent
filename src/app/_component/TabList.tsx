"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysis } from "./ImageAnalysis";
import { Ingredients } from "./Ingredients";

import { ChangeEvent, useEffect, useState } from "react";
import { ImageCreator } from "./ImageCreator";

export const TabList = () => {
  const [preview, setPreview] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex justify-center w-full mt-4">
      <Tabs defaultValue="image-analysis" className="w-full max-w-2xl">
        <TabsList className="bg-muted/40 border border-border rounded-lg p-1 gap-1">
          <TabsTrigger
            value="image-analysis"
            className="text-sm rounded-md px-4 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground"
          >
            Image analysis
          </TabsTrigger>
          <TabsTrigger
            value="ingredient-recognition"
            className="text-sm rounded-md px-4 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground"
          >
            Ingredient recognition
          </TabsTrigger>
          <TabsTrigger
            value="image-creator"
            className="text-sm rounded-md px-4 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground"
          >
            Image creator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image-analysis" className="mt-4">
          <ImageAnalysis handleChange={handleFileChange} preview={preview} />
        </TabsContent>
        <TabsContent value="ingredient-recognition" className="mt-4">
          <Ingredients />
        </TabsContent>
        <TabsContent value="image-creator" className="mt-4">
          <ImageCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
