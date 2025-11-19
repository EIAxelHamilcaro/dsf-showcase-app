/** biome-ignore-all lint/suspicious/noExplicitAny: ok */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Requête invalide" },
      { status: 400 },
    );
  }

  const {
    name,
    phone,
    email,
    message,
    adress,
    step1,
    step2,
    step3,
    step4,
    consentMain,
    consentPartners,
    website,
  } = body ?? {};

  if (website && website.trim().length > 0) {
    console.log("[SPAM] Honeypot rempli, requête ignorée");
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !adress || !phone) {
    return NextResponse.json(
      { success: false, error: "Champs obligatoires manquants" },
      { status: 400 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_CONTACT,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Site DSF contact" <${process.env.GMAIL_CONTACT}>`,
      to: process.env.GMAIL_USER,
      subject: `Nouveau contact : ${name}`,
      text: `
        Nom : ${name}
        Téléphone : ${phone}
        Email : ${email}
        Adresse : ${adress}
        Type : ${step1 || "--"}
        Logement : ${step2 || "--"}
        Type Salle de bain: ${step3 || "--"}
        Age: ${step4 || "--"}
        Message :
        ${message || "--"}
      `,
    });

    const payload = await getPayload({ config: payloadConfig });
    await payload.create({
      collection: "leads",
      data: {
        name,
        phone,
        email,
        message,
        adress,
        step1,
        step2,
        step3,
        step4,
        consentMain,
        consentPartners,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
