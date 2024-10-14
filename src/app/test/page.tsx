"use client";

import "@/app/test/style.css";
import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/handle-crop";
import { useCroppedImageStore } from "@/lib/store/cropped-image";
import ImgDialog from "./ImgDialog";

const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

const Demo = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const { croppedImage, setCroppedImage } = useCroppedImageStore();

  const onCropComplete = (
    croppedArea: any,
    croppedAreaPixels: { x: number; y: number; width: number; height: number },
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          dogImg,
          croppedAreaPixels,
          rotation,
        );
        console.log("donee", { croppedImage });
        setCroppedImage(croppedImage!);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage("");
  };

  return (
    <div>
      <div className="flex max-h-[500px] max-w-[500px] flex-col">
        <Cropper
          image={dogImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls absolute bottom-0 left-0 right-0 flex flex-col gap-4">
        <div className="sliderContainer">
          <p>Zoom</p>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            className="slider"
            onValueChange={(zoom) => setZoom(zoom[0])}
          />
        </div>
        <div className="sliderContainer">
          <p>Rotation</p>
          <Slider
            value={[rotation]}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            className="slider"
            onValueChange={(rotation) => setRotation(rotation[0])}
          />
        </div>
        <Button
          onClick={showCroppedImage}
          color="primary"
          className="cropButton"
        >
          Show Result
        </Button>
      </div>
      <ImgDialog img={croppedImage} onClose={onClose} />
    </div>
  );
};

export default Demo;
