import { Resend } from "resend";
import EmailTemplate from "../../../features/desktop/programs/email/template.tsx";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    if (process.env.RECIPIENT_EMAIL === undefined) {
      throw new Error("Recipient email environment variable is not set");
    }
    const emailRequest = await resend.emails.send({
      from: `Contact Form <contact@aidenblinn.com>`,
      to: [process.env.RECIPIENT_EMAIL],
      subject: formData.subject,
      react: EmailTemplate({ content: formData.content }),
    });

    return Response.json(emailRequest);
  } catch (error) {
    return Response.json({ error });
  }
}
