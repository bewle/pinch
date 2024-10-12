import Dropzone from "react-dropzone";
import { useState } from "react";
import { useImageUrlStore } from "@/lib/store/image-file";

export default function ImageDropzone() {
  const [dragging, setDragging] = useState(false);
  const { setImageUrl } = useImageUrlStore();

  return (
    <Dropzone
      onDragEnter={() => {
        setDragging(true);
        console.log("drag enter");
      }}
      onDragLeave={() => {
        setDragging(false);
        console.log("drag leave");
      }}
      onDrop={(acceptedFiles) => {
        setDragging(false);
        if (acceptedFiles[0]) {
          setImageUrl(URL.createObjectURL(acceptedFiles[0]));
        }
      }}
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
