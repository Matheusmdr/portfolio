import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

const paragraphVariants = cva("font-bold", {
  variants: {
    variant: {
      default: "text-[#1A1A1A] dark:text-[#f0f0f0] ",
      secondary: "text-[#898989] dark:text-[#ABADB2]",
    },
    size: {
      default: "text-base",
      leading: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraphVariants>;

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Paragraph.displayName = "Paragraph";

export { Paragraph };
