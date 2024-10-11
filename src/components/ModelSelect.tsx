import { useFlavorStore } from "@/lib/store/flavor";
import Custom from "./flavors/Custom";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "@/app/devices/data-table";
import { columns } from "@/app/devices/apple-devices";
import { type Device, getDevices } from "@/lib/server/getDevices";

export default function ModelSelect() {
  const [devices, setDevices] = useState<Device[]>([]);
  const { flavor } = useFlavorStore();
  const devicesCache = useRef<Record<string, Device[]>>({});

  useEffect(() => {
    if (devicesCache.current[flavor]) {
      setDevices(devicesCache.current[flavor]);
    } else {
      getDevices({ flavor })
        .then((res) => {
          devicesCache.current[flavor] = res;
          setDevices(res);
        })
        .catch((err) => console.error(err));
    }
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
