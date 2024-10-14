import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import Image from "next/image";
import { type Area } from "react-easy-crop";

export default function Output({ croppedArea }: { croppedArea: Area }) {
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
      className="output"
      style={{ paddingBottom: `${100 / (width / height)}%` }}
    >
      <Image
        src={imageUrl}
        width={200}
        height={600}
        alt=""
        style={imageStyle}
      />
    </div>
  );
}
