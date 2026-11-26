import type { Metadata } from "next";
import { Cuprum } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Cuprum is the font the old site uses everywhere. next/font downloads it
// at build time and serves it from our own site.
const cuprum = Cuprum({
  variable: "--font-cuprum",
  subsets: ["latin"],
});

// Default title and description. Individual pages override these.
export const metadata: Metadata = {
  title: "Arctic Volumes | Handcrafted Climbing Volumes",
  description:
    "Handcrafted, Canadian made climbing volumes. Climb beyond ordinary.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cuprum.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {/* site-content adds the space that keeps pages below the fixed header */}
        <div className="site-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
