import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth-utils";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Register user
    const { user, verificationToken } = await registerUser(email, password, name);

    // In a real app, you would send an email with the verification link
    // For now, we'll just return the token in the response
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      verificationToken: token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
