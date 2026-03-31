import { db, sectorsTable } from "./index.ts";

const AEGIS_SECTORS = [
  {
    name: "Real Estate",
    description:
      "High-end residential and commercial developments across Bhopal and Central India. We deliver landmark properties — from luxury gated communities to modern commercial complexes — built to international quality standards with meticulous attention to design and sustainability.",
    icon_name: "Building2",
    image_url:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Logistics",
    description:
      "End-to-end supply chain solutions powered by a 50+ vehicle fleet and strategically located regional warehouses. We ensure timely, reliable distribution across Central India — connecting manufacturers to markets with precision and operational transparency.",
    icon_name: "Truck",
    image_url:
      "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Technology",
    description:
      "Custom software development, cloud migrations, and AI-driven business solutions tailored to enterprise needs. Our engineering teams help organizations accelerate digital transformation, automate operations, and unlock new revenue streams through cutting-edge technology.",
    icon_name: "Globe2",
    image_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Energy",
    description:
      "Solar power installations and sustainable energy consulting for businesses and communities across Central India. We design, build, and maintain renewable energy systems that significantly reduce operating costs while accelerating the transition to a zero-carbon future.",
    icon_name: "Zap",
    image_url:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200",
  },
];

async function seed() {
  console.log("🌱 Clearing existing sectors…");
  await db.delete(sectorsTable);

  console.log("🌱 Inserting Aegis Group sectors…");
  const inserted = await db.insert(sectorsTable).values(AEGIS_SECTORS).returning();

  console.log(`✅ Seeded ${inserted.length} sectors:`);
  inserted.forEach((s) => console.log(`   • [${s.id}] ${s.name}`));

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
