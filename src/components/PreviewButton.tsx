import { ArrowDownToLine, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { useCroppedImageStore } from "@/lib/store/cropped-image";
import { useCropDataStore } from "@/lib/store/crop-data";
import getCroppedImg from "@/lib/handle-crop";
import { useImageUrlStore } from "@/lib/store/image-file";
import ImgDialog from "@/app/test/ImgDialog";

export default function PreviewButton({ shiftHeld }: { shiftHeld: boolean }) {
  const { croppedAreaPixels } = useCropDataStore();
  const { croppedImage, setCroppedImage } = useCroppedImageStore();
  const { imageUrl } = useImageUrlStore();

  const showCroppedImage = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageUrl,
          croppedAreaPixels,
          0,
        );
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
    <>
      <ImgDialog img={croppedImage} onClose={onClose} />

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {shiftHeld ? (
              <Button variant="outline" size="icon">
                <ArrowDownToLine />
              </Button>
            ) : (
              <Button onClick={showCroppedImage} variant="outline" size="icon">
                <ImageIcon />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{shiftHeld ? "download" : "preview"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
