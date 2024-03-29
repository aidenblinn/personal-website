import { Resend } from "resend";
import EmailTemplate from "../../../features/desktop/programs/email/template.tsx";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const emailData = await req.json();
    if (process.env.RECIPIENT_EMAIL === undefined) {
      throw new Error("Recipient email environment variable is not set");
    }
    const emailResponse = await resend.emails.send({
      from: "Personal Site Guest <contact@aidenblinn.com>",
      to: [process.env.RECIPIENT_EMAIL],
      subject: emailData.subject,
      react: EmailTemplate({
        from: emailData.from,
        content: emailData.content,
      }),
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }
    return new Response(JSON.stringify(emailResponse), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
