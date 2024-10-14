import { useCropDataStore } from "@/lib/store/crop-data";
import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import Image from "next/image";

export default function SplitViewPreview() {
  const { croppedAreaPixels } = useCropDataStore();
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex h-full w-full items-center justify-center">
        <Output croppedArea={croppedAreaPixels} />
      </div>
    </div>
  );
}

const Output = ({
  croppedArea,
}: {
  croppedArea: { x: number; y: number; width: number; height: number };
}) => {
  const { width, height } = useFlavorStore();
  const { imageUrl } = useImageUrlStore();

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
      className="relative grid place-items-center overflow-hidden"
      style={{
        // paddingBottom: `${100 / (width / height)}%`,
        width: width,
      }}
    >
      <img src={imageUrl} alt="" style={imageStyle} />
    </div>
    // <div
    //   className="max-w-[500px]"
    //   style={{ paddingBottom: `${100 / (width / height)}%` }}
    // >
    //   <img src={imageUrl} alt="" style={imageStyle} className="max-w-[200]" />
    // </div>
  );
};
