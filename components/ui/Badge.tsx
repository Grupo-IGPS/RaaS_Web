import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface border border-border text-text-muted px-3 py-1",
        accent: "bg-accent/10 border border-accent/20 text-accent px-3 py-1",
        primary: "bg-primary/10 border border-primary/20 text-primary px-3 py-1",
        success: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1",
        warning: "bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-1",
        danger: "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-3 py-1",
        glass: "glass-card text-text-muted px-3 py-1",
        label: "tracking-widest uppercase text-[10px] text-accent bg-transparent px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
