import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  text: ReactNode;
};

export function PageHeader({ eyebrow, title, text }: PageHeaderProps) {
  return (
    <section className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
