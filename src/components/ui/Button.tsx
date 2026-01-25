import type { ReactElement } from "react";

interface IButton {
  title: string;
  size: "lg" | "md" | "sm";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  varient: "primary" | "secondry";
  styles?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const sizeStyles = {
  lg: "px-6 py-2 text-xl rounded-xl",
  md: "px-4 py-2 text-md rounded-md",
  sm: "px-2 py-1 text-sm rounded-sm",
};

const varientStyles = {
  primary: "btn-primary",
  secondry: "bg-secondary-500 text-blue-800 hover:bg-secondary-600 transition-all",
};

const Button = (props: IButton) => {
  const { disabled = false } = props;
  return (
    <button
      disabled={disabled}
      onClick={props.onClick}
      className={`${sizeStyles[props.size]} ${varientStyles[props.varient]} ${
        props.styles || ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} transition duration-200`}
    >
      <div className="flex items-center justify-center text-center gap-2">
        {props.startIcon && <span className="text-xs text-center">{props.startIcon}</span>}
        <span className="font-bold">{props.title}</span>
        {props.endIcon && <span className="text-xs">{props.endIcon}</span>}
      </div>
    </button>
  );
};

export default Button;
