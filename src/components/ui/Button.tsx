"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-colors duration-200 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-600 dark:text-gray-300 dark:hover:border-blue-400",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
