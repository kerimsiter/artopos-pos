import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 
    | "heading-1" 
    | "heading-2" 
    | "heading-3" 
    | "heading-4"
    | "body-xl"
    | "body-l"
    | "body-m"
    | "body-s"
    | "body-xs";
  weight?: "normal" | "medium" | "semibold" | "bold";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body-m", weight, as, ...props }, ref) => {
    const Component = as || getDefaultElement(variant);
    
    const variantClasses = {
      "heading-1": "text-heading-1",
      "heading-2": "text-heading-2", 
      "heading-3": "text-heading-3",
      "heading-4": "text-heading-4",
      "body-xl": "text-body-xl",
      "body-l": "text-body-l",
      "body-m": "text-body-m",
      "body-s": "text-body-s",
      "body-xs": "text-body-xs",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium", 
      semibold: "font-semibold",
      bold: "font-bold",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          variantClasses[variant],
          weight && weightClasses[weight],
          className
        )}
        {...props}
      />
    );
  }
);

function getDefaultElement(variant: TypographyProps["variant"]) {
  switch (variant) {
    case "heading-1":
      return "h1";
    case "heading-2":
      return "h2";
    case "heading-3":
      return "h3";
    case "heading-4":
      return "h4";
    default:
      return "p";
  }
}

Typography.displayName = "Typography";

export { Typography };
export type { TypographyProps };
