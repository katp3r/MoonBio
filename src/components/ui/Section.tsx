import FadeIn from "./FadeIn";
import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  className?: string;
}>;

export default function Section({ title, subtitle, className, children }: SectionProps) {
  return (
    <section className={className}>
      <FadeIn>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-sm/6 text-foreground/70">{subtitle}</p>
        ) : null}
      </FadeIn>
      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}


