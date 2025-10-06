import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

export async function POST(req: Request) {
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
  } = await req.json();

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
        ${message}
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
    // biome-ignore lint/suspicious/noConsole: ok
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
