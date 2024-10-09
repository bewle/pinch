import CropPanel from "@/components/CropPanel";
import SettingsPanel from "@/components/SettingsPanel";
import ThemeToggle from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="container grid h-screen place-items-center">
      {/* <ThemeToggle /> */}
      <Card className="flex h-[75vh] w-[65vw]">
        <CropPanel />
        <SettingsPanel />
      </Card>
    </main>
  );
}
