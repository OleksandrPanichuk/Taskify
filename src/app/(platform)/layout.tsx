import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider, ModalProvider } from "@/components/providers";

const PlatformLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ModalProvider />
        <Toaster richColors />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
