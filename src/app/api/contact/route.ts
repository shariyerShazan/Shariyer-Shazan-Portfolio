import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json();

    // Configure your transporter (Environment variables should be used here)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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

    // If environment variables are missing, we simulate success for demo purposes
    // IN PRODUCTION: Ensure env variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("SMTP Credentials missing. Form data received:", { name, email, type, message });
      return NextResponse.json({ message: "Simulated success (Dev Mode)" }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Transmission Successful" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ message: "Transmission Failed" }, { status: 500 });
  }
}
