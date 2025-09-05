import { type VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"

import { cn } from "@/lib/utils"
import { Input as ShadcnInput } from "@/components/ui/input"

import "./styles/retro.css"

export const inputVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
})

export interface BitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, BitInputProps>(
  ({ className, font, type, ...props }, ref) => {
    return (
      <div className="relative">
        <ShadcnInput
          type={type}
          className={cn(
            "rounded-none border-0 bg-background text-foreground px-4 py-2",
            font !== "normal" && "retro",
            className
          )}
          ref={ref}
          {...props}
        />
        
        {/* Pixelated border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
        <div className="absolute bottom-0 w-full h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
        <div className="absolute top-1.5 -left-1.5 w-1.5 h-[calc(100%-12px)] bg-foreground dark:bg-ring pointer-events-none" />
        <div className="absolute top-1.5 -right-1.5 w-1.5 h-[calc(100%-12px)] bg-foreground dark:bg-ring pointer-events-none" />
        
        {/* Corner pixels */}
        <div className="absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring pointer-events-none" />
        <div className="absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring pointer-events-none" />
        <div className="absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring pointer-events-none" />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }