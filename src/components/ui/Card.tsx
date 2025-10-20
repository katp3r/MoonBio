import { PropsWithChildren } from "react";
import clsx from "clsx";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-black/8 dark:border-white/10",
        "bg-white/60 dark:bg-white/5 backdrop-blur-sm",
        "shadow-sm hover:shadow transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}


