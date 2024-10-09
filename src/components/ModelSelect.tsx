"use client";
import { useFlavorStore } from "@/lib/store/flavor";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

export default function ModelSelect() {
  const { flavor } = useFlavorStore();

  return (
    <AnimatePresence>
      {flavor === "custom" && <Custom />}
      {flavor === "iphone" && <p>iphone</p>}
      {flavor === "android" && <p>android</p>}
    </AnimatePresence>
  );
}

function Custom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAspect } = useFlavorStore();

  function onSubmit(data: any) {
    setAspect(data.width, data.height);
  }

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <p className="motion-preset-fade">please enter a valid resolution</p> */}
      <div className="flex items-center gap-4">
        <Input
          type="number"
          placeholder="width"
          {...register("width", { required: true, minLength: 2 })}
        />
        <X className="w-12" />
        <Input
          type="number"
          placeholder="height"
          {...register("height", { required: true, minLength: 2 })}
        />
        <Button type="submit" variant="secondary">
          set
        </Button>
      </div>
    </form>
  );
}
