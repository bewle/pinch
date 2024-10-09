"use client";

import { useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper as CropperComponent } from "react-cropper";
import { Slider } from "./ui/slider";

export default function CropPanel() {
  const [zoom, setZoom] = useState(0.22204806687565307);
  const cropperRef = useRef(null);

  return (
    <section className="flex h-full w-[40%] flex-col items-center justify-center border-r-[1px] border-solid">
      <CropperComponent
        ref={cropperRef}
        src={"/media/template-image.png"}
        width={275}
        movable={true}
        zoomable={true}
        cropBoxMovable={false}
        cropBoxResizable={false}
        dragMode="move"
        autoCropArea={1}
        viewMode={1}
        toggleDragModeOnDblclick={false}
        wheelZoomRatio={0.2}
        zoomTo={zoom}
        zoom={(value) => {
          setZoom(value.detail.ratio);
        }}
      />
      <Slider
        onValueChange={(value) => {
          console.log(value[0]);
          setZoom(value[0] as number);
        }}
        defaultValue={[0.2]}
        step={0.02}
        value={Array.from([zoom])}
        min={0.2}
        max={2}
      />
    </section>
  );
}
