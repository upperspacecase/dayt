import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CONCEPTS, findConcept, relatedTo } from "../../dates";
import DetailClient from "../../detail-client";

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = findConcept(slug);
  if (!c) return { title: "Not found — Dayt Knight" };
  return {
    title: `${c.title} — Dayt Knight`,
    description: c.hook,
  };
}

export default async function DatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = findConcept(slug);
  if (!c) notFound();

  return <DetailClient concept={c} related={relatedTo(c)} />;
}
