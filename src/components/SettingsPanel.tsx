import FlavorSelect from "./FlavorSelect";
import InfoButton from "./InfoButton";
import ModelSelect from "./ModelSelect";
import ThemeSwitch from "./ThemeToggle";
import { Button } from "./ui/button";

export default function SettingsPanel() {
  return (
    <section className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">pinch</h1>
          <p className="opacity-60">choose your flavor</p>
        </div>
        <div className="flex items-center gap-2">
          <InfoButton />
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <FlavorSelect />
      </div>
      <div className="relative">
        <ModelSelect />
      </div>

      <div className="flex gap-2">
        <Button className="flex-grow">preview</Button>
        <Button className="flex-grow">import</Button>
      </div>
    </section>
  );
}
