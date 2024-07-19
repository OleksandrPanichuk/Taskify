"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@mantine/core"
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: ButtonProps['variant']
};

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "filled"
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={className}
    >
      {children}
    </Button>
  );
};