"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useInputWindowStore } from "@/lib/store/input-window";
import { useImageUrlStore } from "@/lib/store/image-file";
import { useViewStore } from "@/lib/store/view";

export default function ContextMenuProvider({
  children,
  hasImport = true,
  hasClear = true,
  hasPreview = true,
  hasExport = true,
}: {
  children: React.ReactNode;
  hasImport?: boolean;
  hasClear?: boolean;
  hasPreview?: boolean;
  hasExport?: boolean;
}) {
  const { setIsOpen } = useInputWindowStore();
  const { setImageUrl } = useImageUrlStore();
  const { view, setView } = useViewStore();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {hasImport ? (
          <ContextMenuItem onClick={() => setIsOpen(true)}>
            import
          </ContextMenuItem>
        ) : null}
        {hasClear ? (
          <ContextMenuItem
            onClick={() => {
              if (view === "split") {
                setView("fullscreen");
              }
              setImageUrl("");
            }}
          >
            clear
          </ContextMenuItem>
        ) : null}
        {hasPreview ? <ContextMenuItem>preview</ContextMenuItem> : null}
        {hasExport ? <ContextMenuItem>export</ContextMenuItem> : null}
      </ContextMenuContent>
    </ContextMenu>
  );
}
