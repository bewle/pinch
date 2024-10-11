"use client";
import { useFlavorStore } from "@/lib/store/flavor";
import Custom from "./flavors/Custom";
import { getDevices, type Device } from "@/lib/server/getDevices";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/devices/data-table";
import { columns } from "@/app/devices/apple-devices";

export default function ModelSelect() {
  const [devices, setDevices] = useState<Device[]>([]);
  const { flavor } = useFlavorStore();

  useEffect(() => {
    console.log("attempting to get devices");
    getDevices({ flavor })
      .then((res) => setDevices(res))
      .catch((err) => console.error(err));
  }, [flavor]);

  return (
    <div className="flex flex-col items-center gap-4">
      {flavor !== "custom" ? (
        <div className="flex w-full flex-col items-center gap-4">
          <DataTable data={devices} columns={columns} />
        </div>
      ) : (
        <Custom />
      )}
    </div>
  );
}
