import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-slate-200 mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        "tech-input",
                        error && "border-neon-red focus:border-neon-red",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-neon-red">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-slate-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-slate-200 mb-2"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    rows={rows}
                    className={cn(
                        "tech-input resize-none",
                        error && "border-neon-red focus:border-neon-red",
                        className
                    )}
                    {...props as any}
                />
                {error && (
                    <p className="mt-1 text-sm text-neon-red">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-slate-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
