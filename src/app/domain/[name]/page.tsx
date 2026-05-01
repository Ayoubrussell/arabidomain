export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DomainDetailsClient from "@/components/domain/DomainDetailsClient";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function DomainPage({ params }: PageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const domain = await prisma.domain.findUnique({
    where: { fullName: decodedName },
    include: { category: true },
  });

  if (!domain) notFound();

  // Increment views
  await prisma.domain.update({
    where: { id: domain.id },
    data: { views: { increment: 1 } },
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <DomainDetailsClient
          domain={{
            id: domain.id,
            name: domain.name,
            tld: domain.tld,
            fullName: domain.fullName,
            description: domain.description,
            price: domain.price ? Number(domain.price) : null,
            views: domain.views,
            status: domain.status,
            category: domain.category?.name || null,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
