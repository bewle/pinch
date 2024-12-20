import { useCropDataStore } from "@/lib/store/crop-data";
import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import ContextMenuProvider from "./ContextMenuProvider";
import Image from "next/image";

export default function SplitViewPreview() {
  const { previewArea } = useCropDataStore();
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex h-full w-full items-center justify-center">
        <Output croppedArea={previewArea} />
      </div>
    </div>
  );
}

const Output = ({
  croppedArea,
}: {
  croppedArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}) => {
  const { imageUrl } = useImageUrlStore();
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
    <div className="grid h-screen w-full place-items-center">
      <div
        className="relative h-fit w-[300] overflow-hidden"
        style={{ paddingBottom: `${100 / (width / height)}%` }}
      >
        <ContextMenuProvider
          hasPreview={false}
          hasImport={false}
          hasClear={false}
        >
          <Image
            className="absolute left-0 top-0 origin-top-left"
            width={width}
            height={height}
            src={imageUrl}
            alt=""
            style={imageStyle}
          />
        </ContextMenuProvider>
      </div>
    </div>
  );
};
