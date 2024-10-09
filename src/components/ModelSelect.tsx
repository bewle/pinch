"use client";
import { useFlavorStore } from "@/lib/store/flavor";

export default function ModelSelect() {
  const { flavor } = useFlavorStore();

  return (
    <>
      {flavor === "custom" && <p>custom</p>}
      {flavor === "iphone" && <p>iphone</p>}
      {flavor === "android" && <p>android</p>}
    </>
  );
}
