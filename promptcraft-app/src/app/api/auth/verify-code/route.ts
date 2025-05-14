import { NextRequest, NextResponse } from "next/server";
import { verifyCode } from "@/lib/auth-utils";

export async function POST(req: NextRequest) {
  try {
    const { email, code, type = "email" } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    // Verify the code
    await verifyCode(email, code, type);

    return NextResponse.json({
      success: true,
      message: "Verification successful",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "An error occurred during verification" },
      { status: 500 }
    );
  }
}
