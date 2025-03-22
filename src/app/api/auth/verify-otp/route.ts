import { redis } from "@/lib/utils";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/src/models/User";
import { NextResponse } from "next/server";

interface UserData {
  name: string;
  password: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    // ✅ Parse the JSON body
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // ✅ Verify OTP from Redis
    const storedOtp = await redis.get(`otp:${email}`);

    console.log("Stored OTP:", storedOtp, "Type:", typeof storedOtp);
    console.log("Received OTP:", otp, "Type:", typeof otp);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "Invalid OTP, please try again" },
        { status: 400 }
      );
    }

    // ✅ Convert OTPs to string before comparing to fix type mismatch
    if (String(storedOtp) !== String(otp)) {
      return NextResponse.json(
        { error: "OTP does not match, please try again" },
        { status: 400 }
      );
    }

    // ✅ Retrieve user data from Redis (Already an Object)
    const userData: UserData | null = await redis.get(`register:${email}`);

    console.log("Retrieved userData:", userData, "Type:", typeof userData);

    if (!userData || typeof userData !== "object") {
      return NextResponse.json(
        { error: "User data expired. Please register again." },
        { status: 400 }
      );
    }

    if (!userData.name || !userData.password) {
      return NextResponse.json(
        { error: "Invalid user data. Please register again." },
        { status: 400 }
      );
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await connectToDatabase();

    // ✅ Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // ✅ Save new user
    const newUser = new User({
      name: userData.name,
      email,
      password: hashedPassword,
      isVerified: true,
      provider: "email",
    });
    await newUser.save();

    // ✅ Remove OTP & temp user data from Redis
    await redis.del(`otp:${email}`);
    await redis.del(`register:${email}`);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
