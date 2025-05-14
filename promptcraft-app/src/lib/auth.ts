import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Get the current session
export async function getSession() {
  return await getServerSession(authOptions);
}

// Check if user is authenticated
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}
