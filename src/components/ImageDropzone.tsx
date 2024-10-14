import Dropzone from "react-dropzone";
import { useState } from "react";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useToast } from "@/hooks/use-toast";
import { validImageTypes } from "@/lib/validImageTypes";
import { convertHeicToPng } from "@/lib/handleFileType";
import { useProcessingStore } from "@/lib/store/processing";
import { useInputWindowStore } from "@/lib/store/input-window";

export default function ImageDropzone() {
  const [dragging, setDragging] = useState(false);
  const { setProcessing } = useProcessingStore();
  const { toast } = useToast();
  const { setImageUrl } = useImageUrlStore();
  const { setIsOpen } = useInputWindowStore();

  const handleDrop = async (acceptedFiles: File[]) => {
    setDragging(false);

    if (acceptedFiles.length > 1) {
      toast({
        title: "too many files",
        description: "please upload only one file",
      });
      return;
    }

    switch (acceptedFiles[0]?.type) {
      case "image/heic":
        setProcessing(true);
        const convertedFile = await convertHeicToPng(acceptedFiles[0]);
        setImageUrl(URL.createObjectURL(convertedFile as Blob));
        setProcessing(false);
        break;
      case "image/png":
        setProcessing(true);
        setImageUrl(URL.createObjectURL(acceptedFiles[0] as Blob));
        setProcessing(false);
        break;
      case "image/jpeg":
        setProcessing(true);
        setImageUrl(URL.createObjectURL(acceptedFiles[0] as Blob));
        setProcessing(false);
        break;
      case "image/webp":
        setProcessing(true);
        setImageUrl(URL.createObjectURL(acceptedFiles[0] as Blob));
        setProcessing(false);
        break;
      case "image/avif":
        setProcessing(true);
        setImageUrl(URL.createObjectURL(acceptedFiles[0] as Blob));
        setProcessing(false);
        break;
      default:
        toast({
          title: "invalid file type",
          description: `supported file types: ${validImageTypes.join(", ")}`,
        });
        break;
    }
  };

  return (
    <Dropzone
      accept={{
        "image/*": validImageTypes,
      }}
      onDropRejected={() => {
        toast({
          title: "invalid file type",
          description: `supported file types: ${validImageTypes.join(", ")}`,
        });
      }}
      onDragEnter={() => {
        setDragging(true);
      }}
      onDragLeave={() => {
        setDragging(false);
      }}
      onDrop={handleDrop}
    >
      {({ getRootProps }) => (
        <section
          className={`absolute inset-0 left-0 top-0 h-screen w-screen opacity-20 transition ${
            dragging ? "bg-muted" : ""
          }`}
          {...getRootProps()}
        ></section>
      )}
    </Dropzone>
  );
}
