import { NextResponse } from "next/server";
import db from "../../../db";
import { usersTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
   try {
      // Count total store owners (users with role 'store_owner')
      const storeOwners = await db
         .select()
         .from(usersTable)
         .where(eq(usersTable.role, "store-owner"))
         .execute();

      return NextResponse.json({ count: storeOwners.length });
   } catch (error) {
      return NextResponse.json({ error: "Failed to fetch store owners count" }, { status: 500 });
   }
}
