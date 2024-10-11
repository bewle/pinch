import { useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { type ImperativePanelHandle } from "react-resizable-panels";
import PanelProviderLeft from "./PanelProviderLeft";

export function PanelProviderGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);

  function handleDoubleClick() {
    const settingsPanel = settingsPanelRef.current;

    settingsPanel?.resize(50);
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <PanelProviderLeft />
      <ResizableHandle withHandle onDoubleClick={handleDoubleClick} />
      <PanelProviderRight />
    </ResizablePanelGroup>
  );
}

export function PanelProviderRight({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);

  const expandPanel = () => {
    const panel = settingsPanelRef.current;
    if (panel?.isCollapsed()) {
      panel.expand();
    }
  };

  return (
    <ResizablePanel
      ref={settingsPanelRef}
      minSize={35}
      maxSize={60}
      onExpand={expandPanel}
      collapsible
    >
      {children}
    </ResizablePanel>
  );
}
