import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", (req, res) => {
  const result = SubmitContactBody.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Invalid form data. Please check all required fields.",
    });
    return;
  }

  const { name, email, subject, message } = result.data;

  req.log.info(
    { name, email, subject },
    "Contact form submission received"
  );

  const response = SubmitContactResponse.parse({
    success: true,
    message: `Thank you, ${name}! Your message has been received. We will get back to you at ${email} within 24-48 hours.`,
  });

  res.json(response);
});

export default router;
