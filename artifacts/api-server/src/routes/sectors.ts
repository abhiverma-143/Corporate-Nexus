import { Router, type IRouter } from "express";
import { db, sectorsTable } from "@workspace/db";

const router: IRouter = Router();

const DEFAULT_SECTORS = [
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

router.get("/", async (req, res) => {
  try {
    let sectors = await db.select().from(sectorsTable);

    if (sectors.length === 0) {
      req.log.info("Sectors table empty — seeding Aegis Group default sectors");
      sectors = await db.insert(sectorsTable).values(DEFAULT_SECTORS).returning();
    }

    res.json({ success: true, data: sectors });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch sectors");
    res.status(500).json({ success: false, message: "Failed to fetch sectors" });
  }
});

export default router;
