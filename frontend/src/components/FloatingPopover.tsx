"use client";

import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";

type FloatingPopoverProps = {
  anchorRef: RefObject<HTMLElement | null>;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
  offset?: number;
};

const viewportGap = 12;

export function FloatingPopover({
  anchorRef,
  open,
  onClose,
  children,
  className,
  align = "start",
  offset = 10
}: FloatingPopoverProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({
    position: "fixed",
    top: -9999,
    left: -9999,
    zIndex: 1200
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted || !open) {
      return;
    }

    function updatePosition() {
      const anchor = anchorRef.current;
      const overlay = overlayRef.current;

      if (!anchor || !overlay) {
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();
      const overlayWidth = overlayRect.width;
      const overlayHeight = overlayRect.height;
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;

      let left =
        align === "end"
          ? anchorRect.right - overlayWidth
          : align === "center"
            ? anchorRect.left + anchorRect.width / 2 - overlayWidth / 2
            : anchorRect.left;

      let top = anchorRect.bottom + offset;

      if (left + overlayWidth > availableWidth - viewportGap) {
        left = availableWidth - overlayWidth - viewportGap;
      }

      if (left < viewportGap) {
        left = viewportGap;
      }

      if (top + overlayHeight > availableHeight - viewportGap) {
        const aboveTop = anchorRect.top - overlayHeight - offset;

        if (aboveTop >= viewportGap) {
          top = aboveTop;
        } else {
          top = Math.max(viewportGap, availableHeight - overlayHeight - viewportGap);
        }
      }

      setStyle({
        position: "fixed",
        top,
        left,
        zIndex: 1200
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, anchorRef, mounted, offset, open]);

  useEffect(() => {
    if (!mounted || !open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (overlayRef.current?.contains(target) || anchorRef.current?.contains(target)) {
        return;
      }

      onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anchorRef, mounted, onClose, open]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div ref={overlayRef} className={className} style={style}>
      {children}
    </div>,
    document.body
  );
}
