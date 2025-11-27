import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "success" | "danger";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const baseStyles = "tech-button inline-flex items-center justify-center gap-2 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "",
            secondary: "tech-button-secondary",
            outline: "tech-button-outline",
            success: "bg-gradient-to-r from-neon-green to-emerald-600",
            danger: "bg-gradient-to-r from-neon-red to-red-600"
        };

        const sizes = {
            sm: "text-sm px-4 py-2",
            md: "text-base px-6 py-3",
            lg: "text-lg px-8 py-4"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
