import { db } from "@/configs/db";
import { usersTable, WireframeToCodeTable } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { description, imageUrl, model, uid, email } = await req.json();
    console.log(uid);

    if (!email || !uid || !description || !imageUrl || !model) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const creditResult = await db.select().from(usersTable)
      .where(eq(usersTable.email, email));

    if (creditResult[0]?.credits && creditResult[0]?.credits > 0) {
      const result = await db.insert(WireframeToCodeTable).values({
        uid: uid.toString(),
        description,
        imageUrl,
        model,
        createdBy: email,
      }).returning({ id: WireframeToCodeTable.id });

      await db.update(usersTable).set({
        credits: creditResult[0].credits - 1
      }).where(eq(usersTable.email, email));

      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: "Not enough credits" }, { status: 403 });
    }
  } catch (error: any) {
    console.error("POST /api/wireframe-to-code error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const email = searchParams.get("email");

    if (uid) {
      const result = await db.select()
        .from(WireframeToCodeTable)
        .where(eq(WireframeToCodeTable.uid, uid));

      return NextResponse.json(result[0] ?? { error: "Not found" }, { status: result[0] ? 200 : 404 });
    }

    if (email) {
      const result = await db.select()
        .from(WireframeToCodeTable)
        .where(eq(WireframeToCodeTable.createdBy, email))
        .orderBy(desc(WireframeToCodeTable.id));

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Missing uid or email in query" }, { status: 400 });

  } catch (error: any) {
    console.error("GET /api/wireframe-to-code error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { uid, codeResp } = await req.json();

    if (!uid || !codeResp) {
      return NextResponse.json({ error: "Missing uid or codeResp" }, { status: 400 });
    }

    const result = await db.update(WireframeToCodeTable)
      .set({ code: codeResp })
      .where(eq(WireframeToCodeTable.uid, uid))
      .returning({ uid: WireframeToCodeTable.uid });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("PUT /api/wireframe-to-code error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
