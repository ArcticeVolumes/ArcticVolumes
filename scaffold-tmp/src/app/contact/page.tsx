import type { Metadata } from "next";
import { businessInfo } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact | Arctic Volumes",
  description: "Get in touch with Arctic Volumes.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid w-full max-w-4xl gap-10 px-4 py-12 md:grid-cols-2">
      {/* The form posts straight to Web3Forms, which emails the message to
          the business. Same service and key as the old site. */}
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="flex flex-col gap-4"
      >
        <h1 className="text-3xl font-semibold">Get In Touch</h1>
        <input type="hidden" name="access_key" value={businessInfo.web3formsAccessKey} />
        <input
          type="text"
          name="Name"
          placeholder="Your Name"
          required
          className="rounded border px-3 py-2"
        />
        <input
          type="email"
          name="Email"
          placeholder="Your Email"
          required
          className="rounded border px-3 py-2"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={6}
          className="rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-black py-3 text-white hover:bg-gray-800"
        >
          Submit
        </button>
      </form>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <p>Hours: {businessInfo.hours}</p>
        <p>
          Phone:{" "}
          <a href="tel:+15197883156" className="hover:underline">
            {businessInfo.phone}
          </a>
        </p>
        <p className="mt-4">
          <a
            href={businessInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Follow us on Instagram
          </a>
        </p>
      </div>
    </main>
  );
}
