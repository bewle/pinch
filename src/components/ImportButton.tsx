import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Import } from "lucide-react";
import { useInputWindowStore } from "@/lib/store/input-window";

export default function ImportButton() {
  const { setIsOpen } = useInputWindowStore();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
            <Import />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="right">
          <p>import</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
