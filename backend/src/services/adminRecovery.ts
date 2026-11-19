import { promisify } from "node:util";
import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import nodemailer from "nodemailer";

const scrypt = promisify(scryptCallback);
const DEFAULT_RECOVERY_EMAIL = "infovistarcabs@gmail.com";
const DEFAULT_RECOVERY_PHONE = "+918485884417";

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const digest = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt.toString("base64url")}$${digest.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algorithm, saltText, digestText] = stored.split("$");
  if (algorithm !== "scrypt" || !saltText || !digestText) return false;
  try {
    const expected = Buffer.from(digestText, "base64url");
    const actual = (await scrypt(
      password,
      Buffer.from(saltText, "base64url"),
      expected.length,
    )) as Buffer;
    return (
      actual.length === expected.length && timingSafeEqual(actual, expected)
    );
  } catch {
    return false;
  }
}

export function hashResetCode(
  challengeId: string,
  channel: "email" | "phone",
  code: string,
  secret: string,
) {
  return createHmac("sha256", secret)
    .update(`password-reset.${challengeId}.${channel}.${code}`)
    .digest("hex");
}

function recoveryPhone() {
  const raw = process.env.ADMIN_RECOVERY_PHONE || DEFAULT_RECOVERY_PHONE;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length >= 11 && raw.trim().startsWith("+")) return `+${digits}`;
  throw new Error(
    "ADMIN_RECOVERY_PHONE must be an E.164 phone number or a 10-digit Indian number.",
  );
}

export function getRecoveryDestinations() {
  return {
    email: (process.env.ADMIN_RECOVERY_EMAIL || DEFAULT_RECOVERY_EMAIL).trim(),
    phone: recoveryPhone(),
  };
}

function smtpTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !Number.isInteger(port) || !user || !pass) {
    throw new Error(
      "SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD are required.",
    );
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2" },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export async function sendRecoveryCodes(emailCode: string, phoneCode: string) {
  const email = getRecoveryDestinations().email;
  const sender = (process.env.SMTP_FROM || process.env.SMTP_USER || "").trim();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const toPhone = getRecoveryDestinations().phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !sender) {
    throw new Error("Admin recovery email sender or recipient is invalid.");
  }
  if (!accountSid || !authToken || !fromNumber) {
    throw new Error("Twilio SMS credentials and sender are required.");
  }

  const transporter = smtpTransport();
  await transporter.sendMail({
    from: sender,
    to: email,
    subject: "Vistar Cabs admin password reset code",
    text: `Your Vistar Cabs admin password reset code is ${emailCode}. It expires in 10 minutes. If you did not request this, ignore this message.`,
  });

  const body = new URLSearchParams({
    To: toPhone,
    From: fromNumber,
    Body: `Vistar Cabs admin reset code: ${phoneCode}. Expires in 10 minutes. Do not share this code.`,
  });
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!response.ok) throw new Error("Twilio did not accept the recovery SMS.");
}
