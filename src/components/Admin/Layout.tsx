import { type PropsWithChildren } from "react";
import { AdminHeader } from "./AdminHeader";
import { SideNav } from "./SideNav";
import { ThemeProvider } from "../theme-provider";
import { Toaster } from "../ui/toaster";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdminHeader />
      <div className="bg-white dark:bg-[#09090b] overflow-hidden max-h-screen">
        <SideNav>{children}</SideNav>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
