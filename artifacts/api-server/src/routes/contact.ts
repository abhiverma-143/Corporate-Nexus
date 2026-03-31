import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { db, contactsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
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
    await db.insert(contactsTable).values({ name, email, subject, message });

    req.log.info({ name, email, subject }, "Contact form submission saved to DB");

    const response = SubmitContactResponse.parse({
      success: true,
      message: `Thank you, ${name}! Your message has been received. We will get back to you at ${email} within 24-48 hours.`,
    });

    res.json(response);
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({
      success: false,
      message: "Failed to save your message. Please try again later.",
    });
  }
});

export default router;
