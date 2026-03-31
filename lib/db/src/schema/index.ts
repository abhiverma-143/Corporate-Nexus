import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ─── Sectors ─────────────────────────────────────────────────────────────────

export const sectorsTable = pgTable("sectors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon_name: text("icon_name").notNull(),
  image_url: text("image_url").notNull(),
});

export const insertSectorSchema = createInsertSchema(sectorsTable).omit({ id: true });
export type InsertSector = z.infer<typeof insertSectorSchema>;
export type Sector = typeof sectorsTable.$inferSelect;

// ─── Contacts ────────────────────────────────────────────────────────────────

export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read_at: timestamp("read_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactsTable).omit({ id: true, created_at: true, read_at: true });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactsTable.$inferSelect;

// ─── Job Postings ─────────────────────────────────────────────────────────────

export const jobPostingsTable = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobPostingSchema = createInsertSchema(jobPostingsTable).omit({ id: true, created_at: true });
export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;
export type JobPosting = typeof jobPostingsTable.$inferSelect;
