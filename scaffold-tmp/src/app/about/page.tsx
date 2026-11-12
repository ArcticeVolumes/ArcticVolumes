import type { Metadata } from "next";
import { aboutPageContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About | Arctic Volumes",
  description: "The story behind Arctic Volumes and its handcrafted climbing volumes.",
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph} className="mb-4">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default function AboutPage() {
  const { companySection, ownerSection } = aboutPageContent;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <section className="mb-12">
        <h1 className="mb-6 text-3xl font-semibold">{companySection.heading}</h1>
        <Paragraphs text={companySection.body} />
      </section>

      <section>
        <h2 className="mb-2 text-2xl font-semibold">{ownerSection.heading}</h2>
        <p className="mb-6 font-medium">{ownerSection.subheading}</p>
        <Paragraphs text={ownerSection.body} />
      </section>
    </main>
  );
}
