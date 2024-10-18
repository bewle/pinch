import { VerticalSlider } from "@/components/vertical-slider";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./ui/button";

export default function ZoomSlider() {
  return (
    <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
      <div className="flex flex-col items-center justify-end gap-2 opacity-25 transition-opacity duration-300 hover:opacity-100">
        <Button className="size-8 rounded-full p-0" variant="ghost" size="icon">
          <ZoomIn size={16} />
        </Button>
        <VerticalSlider className="h-48 w-10" />
        <Button className="size-8 rounded-full p-0" variant="ghost" size="icon">
          <ZoomOut size={16} />
        </Button>
      </div>
    </div>
  );
}
