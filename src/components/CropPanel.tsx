"use client";

import { useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import {
  Cropper as CropperComponent,
  ReactCropperElement,
} from "react-cropper";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ArrowDownToLine, Image, Import, Maximize } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import ImportButton from "./ImportButton";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useFlavorStore } from "@/lib/store/flavor";

export default function CropPanel() {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [zoom, setZoom] = useState(0.2);
  const [shiftHeld, setShiftHeld] = useState(false);
  const { imageUrl } = useImageUrlStore();
  const { aspectX, aspectY } = useFlavorStore();

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

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setAspectRatio(aspectX / aspectY);
    }
    console.log(aspectX / aspectY);
  }, [aspectX, aspectY]);

  return (
    <section className="relative flex h-full flex-col items-center justify-center gap-4">
      <LeftButtons shiftHeld={shiftHeld} />
      <RightButtons shiftHeld={shiftHeld} />
      <Slider
        className="absolute bottom-8 w-48"
        onValueChange={(value) => {
          console.log(value[0]);
          setZoom(value[0] as number);
        }}
        defaultValue={[zoom]}
        step={0.02}
        value={[zoom]}
        min={0.25396825396825395}
        max={3}
      />
      <CropperComponent
        defaultValue={0}
        ref={cropperRef}
        src={imageUrl ? imageUrl : ""}
        width={200}
        movable
        zoomable
        cropBoxMovable={false}
        cropBoxResizable={false}
        dragMode="move"
        autoCropArea={1}
        viewMode={1}
        toggleDragModeOnDblclick={false}
        wheelZoomRatio={shiftHeld ? 1 : 0.05}
        zoomTo={zoom}
        zoom={(event) => {
          const newZoom = event.detail.ratio;
          if (newZoom <= 3) {
            setZoom(newZoom);
          } else {
            event.preventDefault();
            const cropper = cropperRef.current?.cropper;
            if (cropper) {
              cropper.zoomTo(3);
            }
          }
        }}
        zoomOnTouch
      />
    </section>
  );
}

function LeftButtons({ shiftHeld }: { shiftHeld: boolean }) {
  return (
    <div className="absolute left-4 top-4 flex flex-col gap-2">
      <ImportButton />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                shiftHeld ? console.log("download") : console.log("preview");
              }}
              variant="secondary"
              size="icon"
            >
              {shiftHeld ? <ArrowDownToLine /> : <Image />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{shiftHeld ? "download" : "preview"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function RightButtons({ shiftHeld }: { shiftHeld: boolean }) {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon">
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
