"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

// Pages in the tab bar, in order. A page shows when its route is enabled in
// src/resources/once-ui.config.ts; add a page here to give it a tab.
const navItems: { href: keyof typeof routes; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: about.label },
  { href: "/work", label: work.label },
  { href: "/news", label: blog.label },
  { href: "/gallery", label: gallery.label },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {person.name}
        </Link>
        <nav className={styles.tabs} aria-label="Main">
          {navItems.map(
            (item) =>
              routes[item.href] && (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.tab} ${isActive(pathname, item.href) ? styles.active : ""}`}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
          )}
        </nav>
        {display.themeSwitcher && (
          <div className={styles.actions}>
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
};
