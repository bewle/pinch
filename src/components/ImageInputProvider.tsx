import { useImageUrlStore } from "@/lib/store/image-file";
import { useInputWindowStore } from "@/lib/store/input-window";
import { useEffect, useRef } from "react";

export default function ImageInputProvider() {
  const { isOpen, setIsOpen } = useInputWindowStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setImageUrl } = useImageUrlStore();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.click();
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
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
