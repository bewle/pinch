import { VerticalSlider } from "@/components/vertical-slider";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./ui/button";
import { useCropDataStore } from "@/lib/store/crop-data";

export default function ZoomSlider() {
  const { zoom, setZoom } = useCropDataStore();

  function handleZoomOut() {
    if (zoom > 1) {
      setZoom(zoom - 0.25);
    }
  }

  function handleZoomIn() {
    if (zoom < 3) {
      setZoom(zoom + 0.25);
    }
  }

  return (
    <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
      <div className="flex flex-col items-center justify-end gap-2 opacity-25 transition-opacity duration-300 hover:opacity-100">
        <Button
          onClick={handleZoomIn}
          className="size-8 rounded-full p-0"
          variant="ghost"
          size="icon"
        >
          <ZoomIn size={16} />
        </Button>
        <VerticalSlider
          onValueChange={(value: number[]) => setZoom(value[0]!)}
          value={[zoom]}
          max={3}
          min={1}
          step={0.01}
          className="h-48 w-10"
        />
        <Button
          onClick={handleZoomOut}
          className="size-8 rounded-full p-0"
          variant="ghost"
          size="icon"
        >
          <ZoomOut size={16} />
        </Button>
      </div>
    </div>
  );
}
