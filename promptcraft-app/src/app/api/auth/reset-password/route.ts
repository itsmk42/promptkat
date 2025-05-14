import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/lib/auth-utils";

export async function POST(req: NextRequest) {
  try {
    const { token, email, password } = await req.json();

    if (!token || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Reset the password
    await resetPassword(email, token, password);

    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "An error occurred during password reset" },
      { status: 500 }
    );
  }
}
