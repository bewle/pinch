import { useCropDataStore } from "@/lib/store/crop-data";
import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

export default function CropComponent({ shiftHeld }: { shiftHeld: boolean }) {
  const { width, height } = useFlavorStore();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { setCroppedAreaPixels } = useCropDataStore();
  const { imageUrl } = useImageUrlStore();

  const onCropComplete = (
    croppedArea: Area,
    croppedAreaPixels: { x: number; y: number; width: number; height: number },
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
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
      zoomSpeed={shiftHeld ? 0.25 : 0.05}
    />
  );
}
