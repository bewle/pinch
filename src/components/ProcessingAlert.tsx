"use client";

import { LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { useProcessingStore } from "@/lib/store/processing";

export default function ProcessingAlert() {
  const { processing, setProcessing } = useProcessingStore();
  return (
    <AlertDialog open={processing} onOpenChange={setProcessing}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>processing image...</AlertDialogTitle>
          <AlertDialogDescription className="flex justify-between">
            <p>this will only take a moment</p>
            <LoaderCircle className="animate-spin" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
