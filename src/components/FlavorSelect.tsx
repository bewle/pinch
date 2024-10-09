"use client";
import { useFlavorStore } from "@/lib/store/flavor";
import { Button } from "./ui/button";

export default function FlavorSelect() {
  const { flavor, setFlavor } = useFlavorStore();

  return (
    <>
      <Button
        onClick={() => setFlavor("iphone")}
        variant={flavor === "iphone" ? undefined : "secondary"}
        className="flex-1"
      >
        iphone
      </Button>
      <Button
        variant={flavor === "android" ? undefined : "secondary"}
        onClick={() => setFlavor("android")}
        className="flex-1"
      >
        android
      </Button>
      <Button
        onClick={() => setFlavor("custom")}
        variant={flavor === "custom" ? undefined : "secondary"}
        className="custom flex-1"
      >
        custom
      </Button>
    </>
  );
}
