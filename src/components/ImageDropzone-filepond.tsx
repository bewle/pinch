import { useImageUrlStore } from "@/lib/store/image-file";
import { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { useInputWindowStore } from "@/lib/store/input-window";
import { useToast } from "@/hooks/use-toast";

export default function ImageDropzone() {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);
  const { setImageUrl } = useImageUrlStore();
  const { setIsOpen } = useInputWindowStore();

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    console.log(e);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      const blob = new Blob([file], { type: file.type });
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } else {
      setImageUrl("");
      toast({
        title: "invalid file type",
        description: "please upload an image file",
      });
    }
  }

  return (
    <div
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="absolute left-0 top-0 grid h-screen w-full place-items-center transition-opacity"
      style={{
        backgroundColor: dragOver
          ? "hsl(var(--foreground)/0.1)"
          : "transparent",
      }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="group flex size-48 flex-col gap-2 *:opacity-40"
        style={{
          pointerEvents: dragOver ? "none" : "auto",
          backgroundColor: dragOver ? "hsl(var(--muted))" : "transparent",
        }}
      >
        <Upload
          className="transition-opacity group-hover:opacity-100"
          size={48}
        />
        <p className="text-lg transition-opacity group-hover:opacity-100">
          upload image
        </p>
        <p className="text-xs font-light transition-opacity group-hover:opacity-100">
          click, drag, or paste
        </p>
      </Button>
    </div>
  );
}
