"use client";
import { useState } from "react";
import Cropper from "react-easy-crop";
import "./styles.css";
import { useFlavorStore } from "@/lib/store/flavor";

const Output = ({
  croppedArea,
}: {
  croppedArea: { x: number; y: number; width: number; height: number };
}) => {
  const { width, height } = useFlavorStore();

  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <div
      className="output"
      style={{ paddingBottom: `${100 / (width / height)}%` }}
    >
      <img src="/media/test.png" alt="" style={imageStyle} />
    </div>
  );
};

export default function App() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const { width, height } = useFlavorStore();

  return (
    <div className="">
      <div className="cropper">
        <Cropper
          image="/media/test.png"
          aspect={width / height}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropAreaChange={setCroppedArea}
        />
      </div>
      <div className="viewer">
        <div>{croppedArea && <Output croppedArea={croppedArea} />}</div>
      </div>
    </div>
  );
}
