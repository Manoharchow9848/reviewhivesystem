import { NextResponse } from "next/server";
import db from "../../../db";
import { usersTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch emails of users who have the role 'store_owner'
    const storeOwners = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.role, "store-owner"));

    // Extract emails
    const emails = storeOwners.map((user) => user.email);

    return NextResponse.json({ emails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching store owner emails:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
