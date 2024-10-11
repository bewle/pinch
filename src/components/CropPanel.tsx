"use client";

import { useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import {
  Cropper as CropperComponent,
  type ReactCropperElement,
} from "react-cropper";
import { Slider } from "./ui/slider";
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

export default function CropPanel() {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [zoom, setZoom] = useState(0.2);
  const [shiftHeld, setShiftHeld] = useState(false);
  const { aspectX, aspectY } = useFlavorStore();

  const { imageUrl, setImageUrl } = useImageUrlStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift" && !shiftHeld) {
        setShiftHeld(true);
        const cropper = cropperRef.current?.cropper;
        console.log("container: ", cropper?.getContainerData());
        console.log("image: ", cropper?.getImageData());
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

  useEffect(() => {
    console.log(zoom);
  }, [zoom]);

  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      console.log("new file: ", imageUrl);
    }
  }

  return (
    <section className="relative flex h-full flex-col items-center justify-center gap-4">
      <LeftButtons shiftHeld={shiftHeld} imageUrl={imageUrl} />
      {imageUrl ? <RightButtons /> : null}
      {imageUrl ? <BottomRightButtons setImageUrl={setImageUrl} /> : null}
      {imageUrl ? (
        <CropperComponent
          defaultValue={0}
          ref={cropperRef}
          src={imageUrl ? imageUrl : ""}
          width={300}
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
      ) : (
        <div className="motion-preset-fade-lg flex size-56 cursor-pointer select-none flex-col items-center justify-center gap-4 border-2 border-dashed border-white opacity-25 transition-opacity motion-delay-500 hover:opacity-50">
          <Image size={64} />
          <div className="flex flex-col items-center gap-2">
            <p>choose an image</p>
            <p>paste, drag, or click/tap</p>
          </div>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleInputFile}
          />
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
              <Button
                onClick={() => {
                  if (shiftHeld) {
                    console.log("download");
                  } else {
                    console.log("preview");
                  }
                }}
                variant="outline"
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
