import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

const h1Variants = cva("font-bold", {
  variants: {
    variant: {
      default: "text-[#111827] dark:text-white",
      secondary: "",
      gradient:"bg-clip-text text-transparent bg-gradient-to-r dark:from-[#007cf0] from-[#7928ca] dark:to-[#00dfd8] to-[#ff0080] font-extrabold",
    },
    size: {
      default: "text-6xl",
      sm: "h-9 rounded-md px-3",
      heading: "text-8xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type H1Props = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof h1Variants>;

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h1
        className={cn(h1Variants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
H1.displayName = "H1";

export { H1 };
