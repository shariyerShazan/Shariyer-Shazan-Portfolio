import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, type, subject, message } = await req.json();

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
      subject: `[${type}] ${subject}`,
      html: `
        <div style="font-family: 'DM Mono', Courier, monospace, sans-serif; background-color: #070a13; color: #cbd5e1; padding: 40px 20px; min-height: 100%; border: 1px solid #1e293b; border-radius: 12px;">
          <div style="max-w: 600px; margin: 0 auto; background: #0b0f19; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Top Cyber Accent Header -->
            <div style="background: linear-gradient(90deg, #00f0ff 0%, #7c3aed 100%); height: 4px; width: 100%;"></div>
            
            <div style="padding: 30px 25px;">
              <!-- Logo/Title block -->
              <table style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td>
                    <span style="font-size: 11px; letter-spacing: 2px; color: #00f0ff; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 5px;">[ INBOUND INQUIRY TRANSACTION ]</span>
                    <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800;">PORTFOLIO GATEWAY</h2>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <span style="font-size: 10px; color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3); background-color: rgba(34, 197, 94, 0.05); padding: 3px 8px; border-radius: 20px; text-transform: uppercase;">ONLINE_SECURE</span>
                  </td>
                </tr>
              </table>

              <!-- Metadata Box (Inquiry details) -->
              <div style="background-color: #040810; border: 1px solid #1e293b; border-radius: 10px; padding: 18px; margin-bottom: 25px;">
                <table style="width: 100%; font-size: 13px; line-height: 1.8;">
                  <tr>
                    <td style="color: #64748b; font-weight: bold; width: 120px;">SENDER:</td>
                    <td style="color: #ffffff;">${name}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">EMAIL:</td>
                    <td style="color: #00f0ff;"><a href="mailto:${email}" style="color: #00f0ff; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">INQUIRY TYPE:</td>
                    <td style="color: #e2e8f0; font-weight: bold;">
                      <span style="background-color: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.2); padding: 2px 6px; border-radius: 4px; font-size: 11px; color: #00f0ff; text-transform: uppercase;">${type}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">SUBJECT:</td>
                    <td style="color: #ffffff;">${subject || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: bold;">TIMESTAMP:</td>
                    <td style="color: #94a3b8; font-size: 11px;">${new Date().toISOString()}</td>
                  </tr>
                </table>
              </div>

              <!-- Message Payload Section -->
              <div style="margin-bottom: 25px;">
                <span style="font-size: 11px; letter-spacing: 1.5px; color: #7c3aed; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 8px;">// MESSAGE PAYLOAD RAW</span>
                <div style="background-color: #0d1321; border-left: 3px solid #00f0ff; border-radius: 4px; padding: 20px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; font-family: sans-serif;">${message}</div>
              </div>

              <!-- Footer Info -->
              <div style="border-top: 1px solid #1e293b; padding-top: 20px; text-align: center;">
                <span style="font-size: 9px; color: #64748b; text-transform: uppercase; letter-spacing: 2px;">
                  SYSTEM TRANSACTION COMPLETED // PORTFOLIO GATEWAY V2.0
                </span>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // If environment variables are missing or use default demo placeholders, simulate success
    if (!smtpUser || !smtpPass || smtpHost === "smtp.example.com") {
      console.log("SMTP Credentials missing or placeholder host detected. Form details received:", { name, email, type, subject, message });
      return NextResponse.json({ message: "Simulated success (Dev Mode)" }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Transmission Successful" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ message: "Transmission Failed" }, { status: 500 });
  }
}
