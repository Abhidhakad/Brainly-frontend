import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password";
  className?: string;
}


const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className = "", ...rest }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`w-full max-w-sm min-h-8 rounded-md border border-gray-300 shadow-sm text-neutral-900 placeholder-neutral-500 read-only:bg-neutral-100 read-only:text-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
