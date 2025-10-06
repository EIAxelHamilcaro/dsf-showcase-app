import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, phone, email, message, adress } = await req.json();

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
        Message :
        ${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: ok
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
