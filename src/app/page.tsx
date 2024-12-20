"use client";
import CropPanel from "@/components/CropPanel";
import CropPanelMobile from "@/components/CropPanelMobile";
import ProcessingAlert from "@/components/ProcessingAlert";
import SettingsPanel from "@/components/SettingsPanel";
import SettingsPanelMobile from "@/components/SettingsPanelMobile";
import { useIsSettingsPanelOpen } from "@/lib/store/settings-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChevronsLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";
import MediaQuery from "react-responsive";
import ImageInputProvider from "@/components/ImageInputProvider";
import { useViewStore } from "@/lib/store/view";
import SplitViewPreview from "@/components/SplitViewPreview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useImageUrlStore } from "@/lib/store/image-file";

const queryClient = new QueryClient();

export default function Page() {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);
  const { imageUrl } = useImageUrlStore();
  const { isOpen, setIsOpen } = useIsSettingsPanelOpen();
  const { view } = useViewStore();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (imageUrl) {
        event.preventDefault();
        event.returnValue = ""; // This is required for some browsers to show the confirmation dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [imageUrl]);

  const expandPanel = (size = 30) => {
    const panel = settingsPanelRef.current;

    if (panel?.isCollapsed()) {
      panel.expand(size);
    }
  };

  const collapsePanel = () => {
    const panel = settingsPanelRef.current;
    if (!panel?.isCollapsed()) {
      panel?.collapse();
    }
  };

  function handleDoubleClick() {
    const settingsPanel = settingsPanelRef.current;
    settingsPanel?.resize(50);
  }

  useEffect(() => {
    if (isOpen) {
      expandPanel();
    } else {
      collapsePanel();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("view changed", view);
    switch (view) {
      case "split":
        expandPanel();
        break;
      case "fullscreen":
        collapsePanel();
        break;
      case "settings":
        console.log("expanding settings panel");
        expandPanel();
        break;
      default:
        break;
    }
  }, [view]);

  return (
    <QueryClientProvider client={queryClient}>
      <main
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className="motion-preset-fade-lg h-screen"
      >
        <ProcessingAlert />
        <ImageInputProvider />
        {/* Desktop */}
        <MediaQuery minWidth={1226}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="relative w-full flex-grow-0">
              <div className="h-full w-full">
                <CropPanel />
                {view === "split" ? <SplitViewPreview /> : null}
              </div>
              {!isOpen ? (
                <ChevronsLeft
                  onClick={() => {
                    settingsPanelRef.current?.expand();
                    setIsOpen(true);
                  }}
                  size={32}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 transition-all hover:-translate-x-2 hover:opacity-100"
                />
              ) : null}
            </ResizablePanel>
            <ResizableHandle
              withHandle={isOpen}
              onDoubleClick={handleDoubleClick}
            />
            <ResizablePanel
              ref={settingsPanelRef}
              minSize={35}
              maxSize={55}
              onExpand={() => {
                setIsOpen(true);
              }}
              onCollapse={() => {
                setIsOpen(false);
              }}
              collapsible
            >
              {view === "split" ? <SplitViewPreview /> : <SettingsPanel />}
            </ResizablePanel>
          </ResizablePanelGroup>
        </MediaQuery>
        {/* Mobile */}
        <MediaQuery maxWidth={1226}>
          {imageUrl ? <CropPanelMobile /> : <SettingsPanelMobile />}
        </MediaQuery>
      </main>
    </QueryClientProvider>
  );
}
