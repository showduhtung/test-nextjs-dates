"use client";

import type { HTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/libs/tailwind";

function NavLink({ className, ...props }: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  console.log(props.href, pathname);
  return (
    <Link className={cn(className, props.href === pathname ? "text-red-300" : "")} {...props} />
  );
}

export { NavLink };
