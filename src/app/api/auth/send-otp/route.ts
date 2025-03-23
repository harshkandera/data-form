import { NextResponse } from "next/server";
import { sendMail } from "@/lib/nodemailer";
import { redis } from "@/lib/utils";
import { generateOtpEmail } from "@/components/email-templates/otp";
import User from "@/src/models/User";
import {connectToDatabase} from "@/lib/db";

interface OtpRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    
    const { name, email, password }: OtpRequestBody = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }


    await connectToDatabase();
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }


    await redis.del(`otp:${email}`);
    await redis.del(`register:${email}`);


    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = 5 * 60; // 10 minutes


    // Store user data and OTP in Redis with expiry
    await redis.setex(`register:${email}`, expiry, JSON.stringify({ name, email, password }));
    await redis.setex(`otp:${email}`, expiry, otp.toString());

    // Send OTP via email
    await sendMail({
      to: email,
      subject: "DataForm OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      html: generateOtpEmail(otp.toString(), name),
    });

    return NextResponse.json({ message: "OTP sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
