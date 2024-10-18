import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Check, X } from "lucide-react";
import Image from "next/image";

const ImgDialog = ({ img, onClose }: { img: string; onClose: () => void }) => {
  const [exportIcon, setExportIcon] = useState("download");

  useEffect(() => {
    setExportIcon("download");
  }, [img]);

  return (
    <AlertDialog open={!!img} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>result</AlertDialogTitle>
          <Button
            variant="ghost"
            className="ml-auto h-6 w-6 p-0"
            onClick={onClose}
          >
            <X />
          </Button>
        </AlertDialogHeader>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={img}
            width={300}
            height={300}
            alt="crop result"
            className="max-h-[600px]"
          />
          <div className="flex w-full flex-row gap-4 *:flex-1">
            <Button variant="outline" onClick={onClose}>
              close
            </Button>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = img;
                link.download = "image.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setExportIcon("downloaded");
              }}
              className="flex gap-1"
            >
              export
              {exportIcon === "download" ? (
                <ArrowDownToLine size={16} />
              ) : (
                <Check size={16} />
              )}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImgDialog;
