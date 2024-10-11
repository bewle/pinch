import { Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function InfoButton() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>info</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
