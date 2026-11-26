"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartCount from "@/components/CartCount";
import { businessInfo } from "@/content/site-content";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Volumes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Shrink the logo once the page is scrolled a little (same as the old site).
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" only matches the homepage; other links also match their sub-pages,
  // so Volumes stays underlined on a product page.
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/store") {
      return pathname.startsWith("/store") || pathname.startsWith("/products");
    }
    return pathname.startsWith(href);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" aria-label="Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/web/logo-white.png"
            alt={businessInfo.name}
            width={125}
            height={94}
            className={`site-logo ${scrolled ? "scrolled" : ""}`}
          />
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart"
                className={`nav-link ${isActive("/cart") ? "active" : ""}`}
              >
                <CartCount />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
