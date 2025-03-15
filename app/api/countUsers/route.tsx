import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "../../../db";
import { usersTable } from "../../../db/schema";

export async function GET() {
    try {
        // Count users where role is "user"
        const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.role, "user"));

        return NextResponse.json({ count: users.length }); // Return user count
    } catch (error) {
        console.error("Error fetching user count:", error);
        return NextResponse.json({ error: "Failed to fetch user count" }, { status: 500 });
    }
}
