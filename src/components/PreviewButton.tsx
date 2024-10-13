import "html5-device-mockups/dist/device-mockups.min.css";
import { IPhoneX } from "react-device-mockups";
import { ArrowDownToLine, Image } from "lucide-react";
import { Button } from "./ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import { useFlavorStore } from "@/lib/store/flavor";
import { useImageUrlStore } from "@/lib/store/image-file";
import IPhone11 from "./mockups/iphone-11";

export default function PreviewButton({ shiftHeld }: { shiftHeld: boolean }) {
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const { height, width } = useFlavorStore();
  const { imageUrl } = useImageUrlStore();

  return (
    <>
      <AlertDialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>preview</AlertDialogTitle>
            <AlertDialogDescription className="flex items-center justify-between">
              <IPhone11 height={height / 1.4} width={width} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {shiftHeld ? (
              <Button variant="outline" size="icon">
                <ArrowDownToLine />
              </Button>
            ) : (
              <Button
                onClick={() => setPreviewDialogOpen(true)}
                variant="outline"
                size="icon"
              >
                <Image />
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
