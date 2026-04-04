import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            color: "#ffffff",
            border: "1px solid #262626",
          },
        }}
      />
    </TooltipProvider>
  );
}
