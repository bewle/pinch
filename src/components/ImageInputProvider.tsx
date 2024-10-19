import { useToast } from "@/hooks/use-toast";
import { convertHeicToPng } from "@/lib/handleFileType";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useInputWindowStore } from "@/lib/store/input-window";
import { validImageTypes } from "@/lib/validImageTypes";
import { useEffect, useRef, useState } from "react";

export default function ImageInputProvider() {
  const { isOpen, setIsOpen } = useInputWindowStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setImageUrl } = useImageUrlStore();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.click();
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  async function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files?.[0]);
    const file = event.target.files?.[0];
    // console.log(file);

    // if (!file) return;

    // switch (file.type) {
    //   case "image/heic":
    //     setProcessing(true);
    //     const convertedFile = await convertHeicToPng(file);
    //     setImageUrl(URL.createObjectURL(convertedFile as Blob));
    //     setProcessing(false);
    //     break;
    //   case "image/png":
    //   case "image/jpeg":
    //   case "image/webp":
    //   case "image/avif":
    //     setProcessing(true);
    //     setImageUrl(URL.createObjectURL(file as Blob));
    //     setProcessing(false);
    //     break;
    //   default:
    //     toast({
    //       title: "invalid file type",
    //       description: `supported file types: ${validImageTypes.join(", ")}`,
    //     });
    //     break;
    // }
  }

  return (
    <input
      ref={inputRef}
      type="file"
      id="file-input"
      className="hidden"
      onChange={handleInputFile}
    />
  );
}
