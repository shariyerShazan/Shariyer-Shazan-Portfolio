import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json();

    // Sanitize variables in case the .env configuration wraps values in literal quotes
    const smtpHost = (process.env.SMTP_HOST || "smtp.example.com").replace(/^["']|["']$/g, "");
    const smtpPortVal = process.env.SMTP_PORT ? String(process.env.SMTP_PORT).replace(/^["']|["']$/g, "") : "587";
    const smtpPort = Number(smtpPortVal) || 587;
    const smtpUser = (process.env.SMTP_USER || "").replace(/^["']|["']$/g, "");
    const smtpPass = (process.env.SMTP_PASS || "").replace(/^["']|["']$/g, "");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "shariyershazan1@gmail.com",
      subject: `Portfolio Inquiry: ${type}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 40px; border-radius: 24px; border: 1px solid #2dd4bf;">
          <h1 style="color: #2dd4bf; margin-bottom: 20px;">New Transmission Detected</h1>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Source:</strong> ${name} (${email})</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Inquiry Type:</strong> ${type}</p>
          <div style="background: rgba(45, 212, 191, 0.1); padding: 20px; border-radius: 12px; margin-top: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px;">End of Transmission - Portfolio v1.0</p>
        </div>
      `,
    };

    // If environment variables are missing or use default demo placeholders, simulate success
    if (!smtpUser || !smtpPass || smtpHost === "smtp.example.com") {
      console.log("SMTP Credentials missing or placeholder host detected. Form details received:", { name, email, type, message });
      return NextResponse.json({ message: "Simulated success (Dev Mode)" }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Transmission Successful" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ message: "Transmission Failed" }, { status: 500 });
  }
}
