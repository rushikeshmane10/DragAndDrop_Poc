import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...rest}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef((props, ref) => {
  const { className, orientation = "vertical", ...rest } = props;

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2 border-l border-l-gray-300 bg-gray-100 p-[1px]",
        orientation === "horizontal" &&
          "h-2 flex-col border-t border-t-gray-300 bg-gray-100 p-[1px]",
        className
      )}
      {...rest}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-400" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };