import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

export default function CropComponent() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { width, height } = useFlavorStore();
  const { imageUrl } = useImageUrlStore();

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <Cropper
      image={imageUrl}
      crop={crop}
      zoom={zoom}
      aspect={width / height}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
}
