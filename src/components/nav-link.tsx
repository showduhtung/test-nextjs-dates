"use client";

import type { HTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/libs/tailwind";

function NavLink({ className, ...props }: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  const isActive = props.href === "/" ? pathname === "/" : pathname.includes(props.href as string);

  return <Link className={cn(className, isActive ? "text-primary" : "")} {...props} />;
}

export { NavLink };
