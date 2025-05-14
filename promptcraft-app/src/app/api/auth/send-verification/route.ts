import { NextRequest, NextResponse } from "next/server";
import { generateVerificationCode, getUserByEmail } from "@/lib/auth-utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, type = "email" } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // For password reset, we need to check if the user exists
    if (type === "password-reset") {
      const user = await getUserByEmail(email);
      if (!user) {
        // For security reasons, don't reveal if the email exists or not
        return NextResponse.json({
          success: true,
          message: `If an account with this email exists, a password reset link has been sent.`,
        });
      }
    }

    // For new users, we'll create a temporary user record
    let userId;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      userId = existingUser.id;
    } else if (type === "email") {
      // For email verification during registration, create a temporary user
      const tempUser = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0], // Use part of email as name
        },
      });
      userId = tempUser.id;
    } else {
      // For security reasons, don't reveal if the email exists or not
      return NextResponse.json({
        success: true,
        message: `If an account with this email exists, a verification code has been sent.`,
      });
    }

    // Generate verification code
    const verificationCode = await generateVerificationCode(email, type);

    // In a real app, you would send an email with the verification code
    // For now, we'll just return the code in the response (for development only)
    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${email}`,
      code: verificationCode, // Remove this in production
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return NextResponse.json(
      { error: "An error occurred while sending verification code" },
      { status: 500 }
    );
  }
}
