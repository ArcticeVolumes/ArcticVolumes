import Link from "next/link";
import { businessInfo } from "@/content/site-content";

// Instagram glyph drawn inline, so the site does not load an icon library
// from another server just for one icon.
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="col">
        <h4>Contact</h4>
        <p>
          <strong>Hours: </strong>
          {businessInfo.hours}
        </p>
        <div className="follow">
          <h4>Follow Us</h4>
          <a
            href={businessInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Arctic Volumes on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <Link href="/about">About Us</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms and Conditions</Link>
        <Link href="/contact">Contact Us</Link>
      </div>

      <div className="copyright">
        <p>
          &copy; {businessInfo.copyrightYear}, {businessInfo.name}
        </p>
      </div>
    </footer>
  );
}
