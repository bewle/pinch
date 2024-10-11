import { useRef } from "react";
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
  const { setImageUrl } = useImageUrlStore();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => inputRef.current?.click()}
            variant="outline"
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
