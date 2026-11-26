import type { Metadata } from "next";
import { businessInfo } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact | Arctic Volumes",
  description: "Get in touch with Arctic Volumes.",
};

export default function ContactPage() {
  return (
    <main>
      {/* 1. Get In Touch form on the gradient */}
      <section className="contact-page">
      {/* The form posts straight to Web3Forms, which emails the message to
          the business. Same service and key as the old site. */}
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="contact-form"
      >
        <div className="contact-title">
          <h1>Get In Touch</h1>
          <hr />
        </div>

        <input type="hidden" name="access_key" value={businessInfo.web3formsAccessKey} />
        <input
          type="text"
          name="Name"
          placeholder="Your Name"
          aria-label="Your name"
          required
          className="contact-input"
        />
        <input
          type="email"
          name="Email"
          placeholder="Your Email"
          aria-label="Your email"
          required
          className="contact-input"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          aria-label="Your message"
          required
          className="contact-input"
        />

        <button type="submit" className="contact-submit">
          Submit
          {/* One of the arrow volumes, turned to point right like a "send" icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/web/submit-arrow.png" alt="" height={44} />
        </button>
      </form>
      </section>

      {/* 2. Contact details */}
      <section className="contact-details">
        <h2>Contact</h2>
        <div className="contact-details-grid">
          <div>
            <h4>Hours</h4>
            <p>{businessInfo.hours}</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <p>
              <a
                href={businessInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-details-social"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
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
                Instagram
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
