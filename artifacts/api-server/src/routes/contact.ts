import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { db, contactsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => { // async add karein
  const result = SubmitContactBody.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Invalid form data. Please check all required fields.",
    });
    return;
  }

  const { name, email, subject, message } = result.data;

  try {
    // --- DATABASE MEIN SAVE KAREIN ---
    await db.insert(contactsTable).values({
      name,
      email,
      subject: subject || "No Subject", 
      message,
    });

    req.log.info(
      { name, email, subject },
      "Contact form submission saved to database"
    );

    const response = SubmitContactResponse.parse({
      success: true,
      message: `Thank you, ${name}! Your message has been received. We will get back to you at ${email} within 24-48 hours.`,
    });

    res.json(response);
  } catch (error) {
    req.log.error(error, "Failed to save contact submission");
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

export default router;
