import React, { type PropsWithChildren } from "react";
import { Spotlight } from "./ui/spotlight";

export function Background({ children }: PropsWithChildren) {
  return (
    <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.1] relative flex w-full items-center  justify-center overflow-hidden rounded-md pt-16 antialiased bg-background md:items-center md:justify-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      {children}
    </div>
  );
}
