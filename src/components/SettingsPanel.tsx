import FlavorSelect from "./FlavorSelect";
import ModelSelect from "./ModelSelect";
import ThemeSwitch from "./ThemeToggle";
import { Card, CardHeader, CardTitle } from "./ui/card";

export default function SettingsPanel() {
  return (
    <section className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">pinch</h1>
          <p className="opacity-60">choose your flavor</p>
        </div>
        <ThemeSwitch />
      </div>
      <div className="flex justify-between gap-4">
        <FlavorSelect />
      </div>
      <div className="relative">
        <ModelSelect />
      </div>

      <div className="flex gap-2">
        <Card className="flex-1">
          <CardTitle>
            <CardHeader>properties</CardHeader>
          </CardTitle>
        </Card>
        <Card className="flex-1">model</Card>
      </div>
    </section>
  );
}
