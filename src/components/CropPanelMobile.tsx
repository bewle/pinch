"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Image, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import ImportButton from "./ImportButton";
import { useImageUrlStore } from "@/lib/store/image-file";
import dynamic from "next/dynamic";
import PreviewButton from "./PreviewButton";
import { useInputWindowStore } from "@/lib/store/input-window";
import { useViewStore } from "@/lib/store/view";
import ContextMenuProvider from "./ContextMenuProvider";
import CropComponent from "./CropComponent";
import ZoomSlider from "./ZoomSlider";

const ImageDropzone = dynamic(() => import("./ImageDropzone"), { ssr: false });

export default function CropPanel() {
  const { setIsOpen } = useInputWindowStore();
  const [shiftHeld, setShiftHeld] = useState(false);
  const { imageUrl } = useImageUrlStore();

  useEffect(() => {
    if (typeof document !== "undefined") {
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

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [shiftHeld]);

  return (
    <section className="relative flex h-full flex-col items-center justify-center gap-4">
      <ImageDropzone />
      <LeftButtons shiftHeld={shiftHeld} imageUrl={imageUrl} />
      <BottomLeftText />

      {imageUrl ? (
        <>
          <ZoomSlider />
          <BottomRightButtons />
          <ContextMenuProvider>
            <CropComponent shiftHeld={shiftHeld} />
          </ContextMenuProvider>
        </>
      ) : (
        <ContextMenuProvider
          hasClear={false}
          hasPreview={false}
          hasExport={false}
        >
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className="group size-64 select-none rounded-lg border-2 border-dotted bg-transparent p-8 opacity-50 transition-opacity hover:cursor-pointer hover:bg-muted/40 hover:opacity-75"
          >
            <div className="flex flex-col items-center gap-4 text-foreground transition-transform group-hover:scale-[102%]">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image size={64} />
              <div className="flex flex-col items-center gap-2">
                <p>choose an image</p>
                <p>paste, drag, or click/tap</p>
              </div>
            </div>
          </Button>
        </ContextMenuProvider>
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
    <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 opacity-30 transition-opacity duration-300 fade-in hover:opacity-100">
      <ImportButton />
      {imageUrl ? <PreviewButton shiftHeld={shiftHeld} /> : null}
    </div>
  );
}

//

function BottomRightButtons() {
  const { setImageUrl } = useImageUrlStore();
  const { view, setView } = useViewStore();

  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 opacity-30 transition-opacity duration-300 hover:opacity-100">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                if (view === "split") {
                  setView("fullscreen");
                }
                setImageUrl("");
              }}
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

function BottomLeftText() {
  const { imageUrl } = useImageUrlStore();

  return (
    !imageUrl && (
      <div className="absolute bottom-4 left-4 flex flex-col text-xs opacity-60">
        <p>v0.01</p>
        <p>made with ❤️</p>
      </div>
    )
  );
}
