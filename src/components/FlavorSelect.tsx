"use client";
import { useFlavorStore } from "@/lib/store/flavor";
import { Button } from "./ui/button";

export default function FlavorSelect() {
  const { flavor, setFlavor } = useFlavorStore();

  return (
    <>
      <Button
        onClick={() => setFlavor("apple")}
        variant={flavor === "apple" ? undefined : "outline"}
        className="flex-1"
      >
        apple
      </Button>
      <Button
        variant={flavor === "android" ? undefined : "outline"}
        onClick={() => setFlavor("android")}
        className="flex-1"
      >
        android
      </Button>
      <Button
        onClick={() => setFlavor("custom")}
        variant={flavor === "custom" ? undefined : "outline"}
        className="custom flex-1"
      >
        custom
      </Button>
    </>
  );
}
