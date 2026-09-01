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

    const formattedDate = new Date().toLocaleString("en-US", { 
      dateStyle: "medium", 
      timeStyle: "short",
      timeZone: "Asia/Dhaka"
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "shariyershazan1@gmail.com",
      replyTo: email,
      subject: `[${type}] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inbound Portfolio Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #070b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #070b14; padding: 30px 12px;">
            <tr>
              <td align="center">
                <!-- Main Email Card Container -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
                  
                  <!-- Top Neon Accent Gradient Bar -->
                  <tr>
                    <td style="background: linear-gradient(90deg, #00f0ff 0%, #7c3aed 50%, #00f0ff 100%); height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>

                  <!-- Header Area -->
                  <tr>
                    <td style="padding: 26px 28px 20px 28px; border-bottom: 1px solid #1e293b; background-color: #0b1120;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 11px; color: #00f0ff; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 6px;">
                              // INBOUND PORTFOLIO TRANSMISSION
                            </div>
                            <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                              PORTFOLIO GATEWAY INQUIRY
                            </h1>
                          </td>
                          <td align="right" valign="top" style="white-space: nowrap;">
                            <span style="display: inline-block; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; font-weight: 700; color: #22c55e; background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
                              ● VERIFIED
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Card Body Content -->
                  <tr>
                    <td style="padding: 24px 28px 28px 28px;">
                      
                      <!-- Sender Details Box -->
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #070c18; border: 1px solid #1e293b; border-radius: 12px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 20px;">
                            
                            <!-- Sender Name & Badge Row -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                              <tr>
                                <td>
                                  <div style="font-size: 10px; font-family: 'SFMono-Regular', Consolas, monospace; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">CLIENT / SENDER</div>
                                  <div style="font-size: 18px; font-weight: 800; color: #ffffff;">${name}</div>
                                </td>
                                <td align="right" valign="top">
                                  <span style="display: inline-block; font-size: 11px; font-family: 'SFMono-Regular', Consolas, monospace; font-weight: 700; color: #00f0ff; background-color: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.25); padding: 4px 10px; border-radius: 6px; text-transform: uppercase;">
                                    ${type}
                                  </span>
                                </td>
                              </tr>
                            </table>

                            <div style="height: 1px; background-color: #1e293b; margin-bottom: 14px;"></div>

                            <!-- Meta Fields Table -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #cbd5e1; line-height: 1.7;">
                              <tr>
                                <td width="90" style="color: #64748b; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; text-transform: uppercase; font-weight: 600; padding-bottom: 8px;">EMAIL:</td>
                                <td style="padding-bottom: 8px;">
                                  <a href="mailto:${email}" style="color: #00f0ff; text-decoration: none; font-weight: 600; font-family: 'SFMono-Regular', Consolas, monospace;">${email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td width="90" style="color: #64748b; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; text-transform: uppercase; font-weight: 600; padding-bottom: 8px;">SUBJECT:</td>
                                <td style="color: #ffffff; font-weight: 600; padding-bottom: 8px;">${subject || "No Subject Specified"}</td>
                              </tr>
                              <tr>
                                <td width="90" style="color: #64748b; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; text-transform: uppercase; font-weight: 600;">TIMESTAMP:</td>
                                <td style="color: #94a3b8; font-size: 12px; font-family: 'SFMono-Regular', Consolas, monospace;">${formattedDate}</td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>

                      <!-- Message Payload Section -->
                      <div style="margin-bottom: 28px;">
                        <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 10px;">
                          // MESSAGE PAYLOAD
                        </div>
                        <div style="background-color: #0b1120; border: 1px solid #1e293b; border-left: 4px solid #00f0ff; border-radius: 8px; padding: 20px; color: #f1f5f9; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-break: break-word;">${message}</div>
                      </div>

                      <!-- Quick Direct Reply CTA Button -->
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background-color: #00f0ff; color: #0a0f1d; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 240, 255, 0.3);">
                              ⚡ Reply Directly to ${name}
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer Section -->
                  <tr>
                    <td style="padding: 20px 28px; background-color: #070b14; border-top: 1px solid #1e293b; text-align: center;">
                      <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px;">
                        SHARIYER SHAZAN PORTFOLIO GATEWAY // DISPATCHED TELEMETRY
                      </div>
                      <div style="font-size: 11px; color: #475569; margin-top: 4px;">
                        This transmission originated from your portfolio website at shariyer-shazan.vercel.app
                      </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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
