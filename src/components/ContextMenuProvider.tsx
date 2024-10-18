"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useInputWindowStore } from "@/lib/store/input-window";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useViewStore } from "@/lib/store/view";
import getCroppedImg from "@/lib/handle-crop";
import { useCroppedImageStore } from "@/lib/store/cropped-image";
import { useCropDataStore } from "@/lib/store/crop-data";

export default function ContextMenuProvider({
  children,
  hasImport = true,
  hasClear = true,
  hasPreview = true,
  hasExport = true,
}: {
  children: React.ReactNode;
  hasImport?: boolean;
  hasClear?: boolean;
  hasPreview?: boolean;
  hasExport?: boolean;
}) {
  const { setIsOpen } = useInputWindowStore();
  const { imageUrl, setImageUrl } = useImageUrlStore();
  const { view, setView } = useViewStore();
  const { croppedAreaPixels } = useCropDataStore();
  const { croppedImage, setCroppedImage } = useCroppedImageStore();

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, 0);
      setCroppedImage(croppedImage!);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {hasImport ? (
          <ContextMenuItem onClick={() => setIsOpen(true)}>
            import
          </ContextMenuItem>
        ) : null}
        {hasClear ? (
          <ContextMenuItem
            onClick={() => {
              if (view === "split") {
                setView("fullscreen");
              }
              setImageUrl("");
            }}
          >
            clear
          </ContextMenuItem>
        ) : null}
        {hasPreview ? (
          <ContextMenuItem
            onClick={async () => {
              await showCroppedImage();
            }}
          >
            preview
          </ContextMenuItem>
        ) : null}
        {hasExport ? (
          <ContextMenuItem
            onClick={async () => {
              const croppedImage = await getCroppedImg(
                imageUrl,
                croppedAreaPixels,
                0,
              );
              const link = document.createElement("a");
              link.href = croppedImage!;
              link.download = "image.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            export
          </ContextMenuItem>
        ) : null}
      </ContextMenuContent>
    </ContextMenu>
  );
}
