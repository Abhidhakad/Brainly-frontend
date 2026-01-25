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
        className={` w-full rounded-xl border border-slate-300
      bg-transparent px-4 py-3 text-slate-900
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500
      outline-none transition
      dark:border-slate-700 dark:text-white sm:text-sm
          ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
