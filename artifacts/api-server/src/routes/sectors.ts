import { Router, type IRouter } from "express";
import { db, sectorsTable } from "@workspace/db";

const router: IRouter = Router();

const DEFAULT_SECTORS = [
  {
    name: "Real Estate Development",
    description:
      "Creating landmark commercial spaces, luxury residential communities, and strategic industrial parks globally.",
    icon_name: "Building2",
    image_url:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Financial Services",
    description:
      "Comprehensive investment banking, wealth management, and corporate advisory services for elite clients.",
    icon_name: "TrendingUp",
    image_url:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Technology & Innovation",
    description:
      "Investing in and developing enterprise software, AI solutions, and next-generation cybersecurity platforms.",
    icon_name: "Globe2",
    image_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Energy & Resources",
    description:
      "Pioneering sustainable energy transitions, solar farms, and responsible resource extraction.",
    icon_name: "Zap",
    image_url:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Logistics & Supply Chain",
    description:
      "End-to-end global supply chain solutions, maritime shipping, and advanced automated warehousing.",
    icon_name: "Truck",
    image_url:
      "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "Construction & Infrastructure",
    description:
      "Executing massive public-private partnerships, transportation networks, and civic mega-projects.",
    icon_name: "HardHat",
    image_url:
      "https://images.unsplash.com/photo-1541888086925-920a0eb56e1e?auto=format&fit=crop&q=80&w=1200",
  },
];

router.get("/sectors", async (req, res) => {
  try {
    let sectors = await db.select().from(sectorsTable);

    if (sectors.length === 0) {
      req.log.info("Sectors table empty — seeding default data");
      sectors = await db.insert(sectorsTable).values(DEFAULT_SECTORS).returning();
    }

    res.json({ success: true, data: sectors });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch sectors");
    res.status(500).json({ success: false, message: "Failed to fetch sectors" });
  }
});

export default router;
