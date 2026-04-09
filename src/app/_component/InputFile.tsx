import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, ChangeEventHandler } from "react";
import Image from "next/image";

export type ImageAnalysisProps = {
  preview: string | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
};

export function InputFile({ handleChange, preview }: ImageAnalysisProps) {
  return (
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
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={100}
          height={250}
          className="rounded-lg border border-border object-cover"
        />
      )}
    </div>
  );
}
