// api/send-config.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, message, configUrl, silent } = req.body || {};

    if (!configUrl) {
      return res.status(400).json({ error: "Missing configUrl" });
    }

    // Create reusable transporter using Gmail SMTP + app password
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.gmail.com
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isSilent = Boolean(silent);

    const subject = isSilent
      ? "Configurator: user copied share link (silent event)"
      : "New Motobloq configuration from configurator";

    const lines = [];

    if (!isSilent) {
      lines.push(`Name:   ${name || "N/A"}`);
      lines.push(`Email:  ${email || "N/A"}`);
      lines.push("");
      lines.push("Message:");
      lines.push(message || "(no message)");
      lines.push("");
    } else {
      lines.push("Silent tracking event: user copied share link.");
      lines.push("");
    }

    lines.push("Configuration URL:");
    lines.push(configUrl);

    const textBody = lines.join("\n");

    await transporter.sendMail({
      from: `"Motobloq Configurator" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email || undefined, // so you can reply directly to the user
      subject,
      text: textBody,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ send-config error:", err);
    return res.status(500).json({ error: "Email failed" });
  }
}
