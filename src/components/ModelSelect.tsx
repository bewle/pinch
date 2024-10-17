import { useFlavorStore } from "@/lib/store/flavor";
import Custom from "./flavors/Custom";
import { DataTable } from "@/app/devices/data-table";
import { columns } from "@/app/devices/apple-devices";
import { getDevices } from "@/lib/server/getDevices";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ModelSelect() {
  const { flavor } = useFlavorStore();
  const appleQuery = useQuery({
    queryKey: ["apple-devices"],
    queryFn: async () => await getDevices({ flavor }),
  });
  const androidQuery = useQuery({
    queryKey: ["android-devices"],
    queryFn: async () => await getDevices({ flavor: "android" }),
  });

  return appleQuery.isLoading || androidQuery.isLoading ? (
    <div className="grid h-full place-items-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4">
      {flavor === "apple" ? (
        <div className="flex w-full flex-col items-center gap-4">
          <DataTable data={appleQuery.data ?? []} columns={columns} />
        </div>
      ) : flavor === "android" ? (
        <div className="flex w-full flex-col items-center gap-4">
          <DataTable data={androidQuery.data ?? []} columns={columns} />
        </div>
      ) : (
        <Custom />
      )}
    </div>
  );
}
