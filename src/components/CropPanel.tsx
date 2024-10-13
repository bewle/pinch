import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Image, Maximize, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import ImportButton from "./ImportButton";
import { useImageUrlStore } from "@/lib/store/image-file";
import ImageDropzone from "./ImageDropzone";
import CropComponent from "./CropComponent";
import { useIsSettingsPanelOpen } from "@/lib/store/settings-panel";
import PreviewButton from "./PreviewButton";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "./ui/context-menu";

export default function CropPanel() {
  const { isOpen } = useIsSettingsPanelOpen();
  const [shiftHeld, setShiftHeld] = useState(false);
  const { imageUrl, setImageUrl } = useImageUrlStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift" && !shiftHeld) {
        setShiftHeld(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift" && shiftHeld) {
        setShiftHeld(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shiftHeld]);

  return (
    <section className="relative flex h-full flex-col items-center justify-center gap-4">
      <ImageDropzone />
      <LeftButtons shiftHeld={shiftHeld} imageUrl={imageUrl} />
      {imageUrl && isOpen ? <RightButtons /> : null}
      {imageUrl ? <BottomRightButtons /> : null}
      {imageUrl ? (
        <div className="my-12 h-full w-full">
          <ContextMenu>
            <ContextMenuTrigger>
              <CropComponent shiftHeld={shiftHeld} />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>import image</ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setImageUrl("");
                }}
              >
                clear image
              </ContextMenuItem>
              <ContextMenuItem>preview</ContextMenuItem>
              <ContextMenuItem>download</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      ) : (
        <div className="group select-none rounded-lg border-2 border-dotted p-8 opacity-50 transition-opacity hover:cursor-pointer hover:bg-muted/40 hover:opacity-75">
          <div className="flex flex-col items-center gap-4 transition-transform group-hover:scale-[102%]">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image size={64} />
            <div className="flex flex-col items-center gap-2">
              <p>choose an image</p>
              <p>paste, drag, or click/tap</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function LeftButtons({
  shiftHeld,
  imageUrl,
}: {
  shiftHeld: boolean;
  imageUrl: string;
}) {
  return (
    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 fade-in">
      <ImportButton />
      {imageUrl ? <PreviewButton shiftHeld={shiftHeld} /> : null}
    </div>
  );
}

function RightButtons() {
  const { setIsOpen } = useIsSettingsPanelOpen();

  return (
    <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="icon"
            >
              <Maximize />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>fullscreen</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function BottomRightButtons() {
  const { setImageUrl } = useImageUrlStore();

  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setImageUrl("")}
              variant="outline"
              size="icon"
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>clear</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
