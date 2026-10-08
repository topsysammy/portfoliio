import type { Metadata } from "next";
import { LetsTalk } from "@/components/layout/LetsTalk";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Temitope Samuel about product design roles, freelance projects or an interesting idea.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <LetsTalk headingLevel="h1" />;
}
