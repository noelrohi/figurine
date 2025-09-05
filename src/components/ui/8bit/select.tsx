import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectGroup as ShadcnSelectGroup,
  SelectItem as ShadcnSelectItem,
  SelectLabel as ShadcnSelectLabel,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectSeparator as ShadcnSelectSeparator,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from "@/components/ui/select";

import "./styles/retro.css";

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
});

export interface BitSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

function Select({ ...props }: React.ComponentProps<typeof ShadcnSelect>) {
  return <ShadcnSelect {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <ShadcnSelectGroup {...props} />;
}

interface BitSelectValueProps
  extends React.ComponentProps<typeof SelectPrimitive.Value>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

function SelectValue({ ...props }: BitSelectValueProps) {
  const { font } = props;

  return (
    <ShadcnSelectValue
      className={cn(font !== "normal" && "retro")}
      {...props}
    />
  );
}

interface BitSelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

function SelectTrigger({ children, ...props }: BitSelectTriggerProps) {
  const { className, font } = props;

  return (
    <div className="relative">
      <ShadcnSelectTrigger
        {...props}
        className={cn(
          "rounded-none ring-0 w-full border-0 bg-background",
          font !== "normal" && "retro",
          className
        )}
      >
        {children}
      </ShadcnSelectTrigger>

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
  );
}

export interface BitSelectContentProps
  extends React.ComponentProps<typeof SelectPrimitive.Content>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

function SelectContent({
  className,
  children,
  ...props
}: BitSelectContentProps) {
  const { font } = props;

  return (
    <ShadcnSelectContent
      className={cn(
        font !== "normal" && "retro",
        "rounded-none border-4 border-foreground bg-background z-50 max-h-96 overflow-hidden shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </ShadcnSelectContent>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <ShadcnSelectLabel className={cn(className)} {...props} />;
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <ShadcnSelectItem
      className={cn(
        className,
        "rounded-none retro focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
      )}
      {...props}
    >
      {children}
    </ShadcnSelectItem>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <ShadcnSelectSeparator className={cn(className)} {...props} />;
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof ShadcnSelectScrollUpButton>) {
  return <ShadcnSelectScrollUpButton className={cn(className)} {...props} />;
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return <ShadcnSelectScrollDownButton className={cn(className)} {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
