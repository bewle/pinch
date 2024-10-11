import { ResizablePanel } from "../ui/resizable";

export default function PanelProviderLeft({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanel className="w-full flex-grow-0">{children}</ResizablePanel>
  );
}
