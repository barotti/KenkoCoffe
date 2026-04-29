import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "ghost";
};

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <Link className={`button button--${variant} ${className}`} href={href} {...props}>
      {children}
    </Link>
  );
}
