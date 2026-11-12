import Link from "next/link";
import CartCount from "@/components/CartCount";
import { businessInfo } from "@/content/site-content";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Volumes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          {businessInfo.name}
        </Link>

        <nav className="flex flex-wrap items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className="hover:underline">
            <CartCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
