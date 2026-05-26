import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const cardVariants = cva("relative overflow-hidden transition-all duration-300", {
  variants: {
    variant: {
      adaptive: "card-adaptive",
      neo: "neo-card",
      glass: "glass-card",
      outline: "border border-border rounded-3xl bg-surface/50",
      ghost: "rounded-3xl",
    },
    hover: {
      lift: "hover:-translate-y-1 hover:shadow-soft",
      glow: "hover:shadow-glow-sm",
      none: "",
    },
  },
  defaultVariants: {
    variant: "adaptive",
    hover: "lift",
  },
});

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, hover, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, hover }), className)} {...props} />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-3", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 pt-0 flex items-center gap-3", className)}
      {...props}
    />
  );
}
