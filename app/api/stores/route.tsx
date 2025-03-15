import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { storesTable } from "../../../db/schema";

export async function GET(req: NextRequest) {
  try {
    const stores = await db.select().from(storesTable);
    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 });
  }
}
