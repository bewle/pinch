"use client";

import { useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import {
  Cropper as CropperComponent,
  type ReactCropperElement,
} from "react-cropper";
import { Button } from "./ui/button";
import { ArrowDownToLine, Image, Maximize, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import ImportButton from "./ImportButton";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useFlavorStore } from "@/lib/store/flavor";
import ImageDropzone from "./ImageDropzone";

export default function CropPanel({
  isSettingsPanelOpen,
}: {
  isSettingsPanelOpen: boolean;
}) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [zoom, setZoom] = useState(0.2);
  const { width, height } = useFlavorStore();
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

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.setAspectRatio(width / height);
    }
    console.log(cropper?.getData());
  }, [width, height]);

  return (
    <section className="relative flex h-full flex-col items-center justify-center gap-4">
      <ImageDropzone />
      <LeftButtons shiftHeld={shiftHeld} imageUrl={imageUrl} />
      {imageUrl ? <RightButtons /> : null}
      {imageUrl ? <BottomRightButtons setImageUrl={setImageUrl} /> : null}
      {imageUrl ? (
        <CropperComponent
          defaultValue={0}
          ref={cropperRef}
          zoomOnTouch
          movable
          style={{ height: isSettingsPanelOpen ? 400 : 800 }}
          height={height}
          zoomable
          cropBoxMovable={false}
          cropBoxResizable={false}
          dragMode="move"
          autoCropArea={1}
          viewMode={1}
          toggleDragModeOnDblclick={false}
          src={imageUrl ? imageUrl : ""}
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
        />
      ) : (
        <div className="flex flex-col items-center gap-4 opacity-50">
          <Image size={64} />
          <div className="flex flex-col items-center gap-2">
            <p>choose an image</p>
            <p>paste, drag, or click/tap</p>
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
    <div className="absolute left-4 top-4 flex flex-col gap-2 fade-in">
      <ImportButton />
      {imageUrl ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                {shiftHeld ? <ArrowDownToLine /> : <Image />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{shiftHeld ? "download" : "preview"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  );
}

function RightButtons() {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
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

function BottomRightButtons({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
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
