import { useCropDataStore } from "@/lib/store/crop-data";
import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useViewStore } from "@/lib/store/view";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import Cropper from "react-easy-crop";
import { type Area } from "react-easy-crop";

export default function CropComponent({ shiftHeld }: { shiftHeld: boolean }) {
  const cropper = useRef<Cropper>(null);
  const { width, height } = useFlavorStore();
  const { zoom, setZoom } = useCropDataStore();
  const { setCroppedAreaPixels, setPreviewArea, setCrop, crop } =
    useCropDataStore();
  const { imageUrl } = useImageUrlStore();
  const { view } = useViewStore();

  const onCropComplete = (
    croppedArea: Area,
    croppedAreaPixels: { x: number; y: number; width: number; height: number },
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropAreaChange = (cropArea: Area) => {
    if (view === "split") {
      setPreviewArea(cropArea);
    }
  };

  return (
    <>
      <LoaderCircle size={64} className="animate-spin" />
      <Cropper
        ref={cropper}
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={width / height}
        onCropChange={(crop) => {
          setCrop(crop);
        }}
        onCropAreaChange={onCropAreaChange}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        zoomSpeed={shiftHeld ? 0.25 : 0.05}
      />
    </>
  );
}
