import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

const ImgDialog = ({ img, onClose }: { img: string; onClose: () => void }) => {
  return (
    <AlertDialog open={!!img} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <Button
            variant="ghost"
            className="ml-auto h-6 w-6 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogHeader>
        <div className="flex items-center justify-center">
          <Image
            src={img}
            width={370}
            height={370}
            alt="Cropped"
            className="w-[300px]"
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImgDialog;
