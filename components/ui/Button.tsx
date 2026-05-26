import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "text-white shadow-soft hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-surface text-text border border-border hover:border-accent/40 hover:bg-surface shadow-card hover:shadow-soft",
        outline:
          "border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60",
        ghost:
          "text-text-muted hover:text-text hover:bg-surface/80",
        accent:
          "text-white shadow-glow-sm hover:shadow-glow-blue hover:scale-[1.02]",
        glass:
          "glass-card text-text hover:bg-surface/70 border border-border/60",
      },
      size: {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-2.5",
        lg: "text-base px-8 py-3.5",
        xl: "text-lg px-10 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  style?: React.CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, style, ...props }, ref) => {
    const isPrimary = variant === "primary" || variant === undefined;
    const isAccent = variant === "accent";

    const gradientStyle =
      isPrimary
        ? { background: "linear-gradient(135deg, #09116A 0%, #2D3193 100%)", ...style }
        : isAccent
        ? { background: "linear-gradient(135deg, #2D3193 0%, #6C7AE0 100%)", ...style }
        : style;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={gradientStyle}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
