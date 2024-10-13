import { useForm, type FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { useFlavorStore } from "@/lib/store/flavor";

export default function Custom() {
  const { register, handleSubmit } = useForm();
  const { setAspect } = useFlavorStore();

  function onSubmit(data: FieldValues) {
    setAspect(data.width, data.height);
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <p className="motion-preset-fade">please enter a valid resolution</p> */}
      <div className="flex w-full items-center gap-4">
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
      </div>
      <Button type="submit" className="w-full" variant="secondary">
        set aspect ratio
      </Button>
    </form>
  );
}
