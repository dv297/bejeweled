import * as React from "react";
import clsx from "clsx";

interface RoundButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const RoundButton = (props: RoundButtonProps) => {
  const { children, onClick, className } = props;

  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundButton;
