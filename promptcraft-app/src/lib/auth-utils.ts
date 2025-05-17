import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "./prisma";

// User registration
export async function registerUser(email: string, password: string, name?: string) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || email.split("@")[0], // Use part of email as name if not provided
    },
  });

  // Create verification token
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // Token expires in 24 hours

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
      type: "email",
      userId: user.id,
    },
  });

  return { user, verificationToken: token };
}

// Verify user credentials
export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    role: user.role,
  };
}

// Generate verification code
export async function generateVerificationCode(email: string, type = "email") {
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate verification code (6 digits)
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Create or update verification token
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 30); // Token expires in 30 minutes

  // Delete any existing tokens for this user and type
  await prisma.verificationToken.deleteMany({
    where: {
      userId: user.id,
      type,
    },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: verificationCode,
      expires,
      type,
      userId: user.id,
    },
  });

  return verificationCode;
}

// Verify code
export async function verifyCode(email: string, code: string, type = "email") {
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Find the verification token
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      userId: user.id,
      identifier: email,
      token: code,
      type,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!verificationToken) {
    throw new Error("Invalid or expired verification code");
  }

  // If it's an email verification, mark the email as verified
  if (type === "email") {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
  }

  // Delete the used token
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return true;
}

// Reset password
export async function resetPassword(email: string, token: string, newPassword: string) {
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Find the verification token
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      userId: user.id,
      identifier: email,
      token,
      type: "password-reset",
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!verificationToken) {
    throw new Error("Invalid or expired token");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  // Delete the used token
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return true;
}

// Get user by email
export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    role: user.role,
  };
}
