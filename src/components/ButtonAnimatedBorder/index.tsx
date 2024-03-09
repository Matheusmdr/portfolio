import { type PropsWithChildren } from "react";
import { type ButtonProps, Button as ButtonUi } from "../ui/button";
import { cn } from "@/lib/utils";

type Button = PropsWithChildren<ButtonProps> & {
  className?: string;
};

export function ButtonAnimatedBorder({ children, className = "", ...rest }: Button) {
  return (
    <ButtonUi
      className={cn(
        "group relative grid overflow-hidden rounded-full px-4 py-2 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200",
        className,
      )}
      {...rest}
    >
      <span>
        <span className="animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      </span>
      <span className="backdrop absolute inset-px rounded-full bg-background transition-colors duration-200 group-hover:bg-background/90" />
      {children}
    </ButtonUi>
  );
}
