import Link from "next/link";
import { businessInfo } from "@/content/site-content";

export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-3">
        <div>
          <h2 className="mb-2 font-medium">Contact</h2>
          <p className="text-sm">Hours: {businessInfo.hours}</p>
          <p className="text-sm">
            Phone:{" "}
            <a href="tel:+15197883156" className="hover:underline">
              {businessInfo.phone}
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-medium">Follow Us</h2>
          <a
            href={businessInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            Instagram
          </a>
        </div>

        <div>
          <h2 className="mb-2 font-medium">About</h2>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>

      <p className="pb-6 text-center text-sm text-gray-500">
        &copy; {businessInfo.copyrightYear}, {businessInfo.name}
      </p>
    </footer>
  );
}
