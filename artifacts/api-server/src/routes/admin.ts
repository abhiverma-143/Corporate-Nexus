import { Router, type IRouter } from "express";
import { db, contactsTable, sectorsTable, jobPostingsTable } from "@workspace/db";
import { eq, isNull, sql } from "drizzle-orm";

const router: IRouter = Router();

// ── Stats ─────────────────────────────────────────────────────────────────────

router.get("/admin/stats", async (req, res) => {
  try {
    const [{ count: totalContacts }] = await db.select({ count: sql<number>`count(*)::int` }).from(contactsTable);
    const [{ count: unreadContacts }] = await db.select({ count: sql<number>`count(*)::int` }).from(contactsTable).where(isNull(contactsTable.read_at));
    const [{ count: totalSectors }] = await db.select({ count: sql<number>`count(*)::int` }).from(sectorsTable);
    const [{ count: totalJobs }] = await db.select({ count: sql<number>`count(*)::int` }).from(jobPostingsTable);
    const [{ count: activeJobs }] = await db.select({ count: sql<number>`count(*)::int` }).from(jobPostingsTable).where(eq(jobPostingsTable.is_active, true));

    res.json({ success: true, data: { totalContacts, unreadContacts, totalSectors, totalJobs, activeJobs } });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch admin stats");
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});

// ── Contacts ──────────────────────────────────────────────────────────────────

router.get("/admin/contacts", async (req, res) => {
  try {
    const contacts = await db.select().from(contactsTable).orderBy(sql`${contactsTable.created_at} DESC`);
    res.json({ success: true, data: contacts });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch contacts");
    res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
});

router.patch("/admin/contacts/:id/read", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ success: false, message: "Invalid ID" }); return; }

  try {
    const [updated] = await db
      .update(contactsTable)
      .set({ read_at: new Date() })
      .where(eq(contactsTable.id, id))
      .returning();

    if (!updated) { res.status(404).json({ success: false, message: "Contact not found" }); return; }
    res.json({ success: true, data: updated });
  } catch (err) {
    req.log.error({ err }, "Failed to mark contact as read");
    res.status(500).json({ success: false, message: "Failed to update contact" });
  }
});

router.delete("/admin/contacts/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ success: false, message: "Invalid ID" }); return; }

  try {
    await db.delete(contactsTable).where(eq(contactsTable.id, id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete contact");
    res.status(500).json({ success: false, message: "Failed to delete contact" });
  }
});

// ── Sectors ───────────────────────────────────────────────────────────────────

router.get("/admin/sectors", async (req, res) => {
  try {
    const sectors = await db.select().from(sectorsTable);
    res.json({ success: true, data: sectors });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch sectors");
    res.status(500).json({ success: false, message: "Failed to fetch sectors" });
  }
});

router.post("/admin/sectors", async (req, res) => {
  const { name, description, icon_name, image_url } = req.body;
  if (!name || !description || !icon_name || !image_url) {
    res.status(400).json({ success: false, message: "All fields are required" });
    return;
  }
  try {
    const [sector] = await db.insert(sectorsTable).values({ name, description, icon_name, image_url }).returning();
    res.status(201).json({ success: true, data: sector });
  } catch (err) {
    req.log.error({ err }, "Failed to create sector");
    res.status(500).json({ success: false, message: "Failed to create sector" });
  }
});

router.put("/admin/sectors/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ success: false, message: "Invalid ID" }); return; }

  const { name, description, icon_name, image_url } = req.body;
  try {
    const [sector] = await db
      .update(sectorsTable)
      .set({ name, description, icon_name, image_url })
      .where(eq(sectorsTable.id, id))
      .returning();

    if (!sector) { res.status(404).json({ success: false, message: "Sector not found" }); return; }
    res.json({ success: true, data: sector });
  } catch (err) {
    req.log.error({ err }, "Failed to update sector");
    res.status(500).json({ success: false, message: "Failed to update sector" });
  }
});

router.delete("/admin/sectors/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ success: false, message: "Invalid ID" }); return; }

  try {
    await db.delete(sectorsTable).where(eq(sectorsTable.id, id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete sector");
    res.status(500).json({ success: false, message: "Failed to delete sector" });
  }
});

// ── Job Postings ──────────────────────────────────────────────────────────────

router.get("/admin/jobs", async (req, res) => {
  try {
    const jobs = await db.select().from(jobPostingsTable).orderBy(sql`${jobPostingsTable.created_at} DESC`);
    res.json({ success: true, data: jobs });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch jobs");
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
});

router.post("/admin/jobs", async (req, res) => {
  const { title, department, location, type, description, is_active } = req.body;
  if (!title || !department || !location || !type || !description) {
    res.status(400).json({ success: false, message: "Required fields missing" });
    return;
  }
  try {
    const [job] = await db.insert(jobPostingsTable).values({ title, department, location, type, description, is_active: is_active !== false }).returning();
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    req.log.error({ err }, "Failed to create job");
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
});

router.put("/admin/jobs/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ success: false, message: "Invalid ID" }); return; }

  const { title, department, location, type, description, is_active } = req.body;
  try {
    const [job] = await db
      .update(jobPostingsTable)
      .set({ title, department, location, type, description, is_active })
      .where(eq(jobPostingsTable.id, id))
      .returning();

    if (!job) { res.status(404).json({ success: false, message: "Job not found" }); return; }
    res.json({ success: true, data: job });
  } catch (err) {
    req.log.error({ err }, "Failed to update job");
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
});

router.delete("/admin/jobs/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ success: false, message: "Invalid ID" }); return; }

  try {
    await db.delete(jobPostingsTable).where(eq(jobPostingsTable.id, id));
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete job");
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
});

export default router;
