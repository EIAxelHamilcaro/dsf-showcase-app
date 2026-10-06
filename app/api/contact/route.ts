import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getPayload } from "payload";
import {
  handleContact,
  type Lead,
  type LeadMail,
} from "@/lib/contact/handleContact";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import payloadConfig from "@/payload.config";

export const maxDuration = 30;

const logError = (message: string, context: Record<string, unknown>) =>
  // biome-ignore lint/suspicious/noConsole: server log read in the hosting dashboard
  console.error(`[contact] ${message}`, context);

async function saveLead(lead: Lead) {
  const payload = await getPayload({ config: payloadConfig });
  const { id } = await payload.create({ collection: "leads", data: lead });

  return id;
}

function sendMail(mail: LeadMail) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_CONTACT, pass: process.env.GMAIL_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return transport.sendMail({
    from: `"Site DSF contact" <${process.env.GMAIL_CONTACT}>`,
    to: process.env.GMAIL_USER,
    ...mail,
  });
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => undefined);
  const remoteIp = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  const result = await handleContact(body, {
    verifyToken: (token) =>
      verifyTurnstile({
        token,
        remoteIp,
        secret: process.env.TURNSTILE_SECRET_KEY,
        siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        isProduction: process.env.NODE_ENV === "production",
        isDeployed: Boolean(process.env.VERCEL_ENV),
        logError,
      }),
    saveLead,
    sendMail,
    logError,
  });

  return NextResponse.json(result.body, { status: result.status });
}
