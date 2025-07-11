
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

// POST /api/user
export async function POST(req: NextRequest) {
  try {
    const { userEmail, userName } = await req.json();

    if (!userEmail || !userName) {
      return NextResponse.json(
        { error: "Missing userEmail or userName" },
        { status: 400 }
      );
    }

    console.log("✅ userEmail received:", userEmail);

    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (userExists.length === 0) {
      const insertResult = await db
        .insert(usersTable)
        .values({
          name: userName,
          email: userEmail,
          credits: 20,
        })
        .returning();

      return NextResponse.json(insertResult[0], { status: 201 }); // Created
    }

    return NextResponse.json(userExists[0]); // Already exists

  } catch (error: any) {
    console.error("❌ POST /api/user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/user?email=example@example.com
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);

  } catch (error: any) {
    console.error("❌ GET /api/user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
