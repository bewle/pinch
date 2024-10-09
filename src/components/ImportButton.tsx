import { SetStateAction, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Import } from "lucide-react";
import { useImageUrlStore } from "@/lib/store/image-file";

export default function ImportButton() {
  const { imageUrl, setImageUrl } = useImageUrlStore();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      console.log("new file: ", imageUrl);
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              inputRef.current?.click();
            }}
            variant="secondary"
            size="icon"
          >
            <Import />
          </Button>
        </TooltipTrigger>
        <input
          ref={inputRef}
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleInputFile}
        />
        <TooltipContent side="right">
          <p>import</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
