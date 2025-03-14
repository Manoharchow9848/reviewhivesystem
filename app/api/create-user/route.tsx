import db from '../../../db';
import { v4 as uuidv4 } from 'uuid';
import { usersTable } from '../../../db/schema';
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, address } = await req.json();
        const role = "user";
        const userId = uuidv4();

        // Check if user already exists
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Insert new user
        const newUser = await db.insert(usersTable).values({
            name,
            email,
            password,
            address,
            role,
            userId
        }).returning();  // Ensure it returns the inserted row (for PostgreSQL, use `.returning('*')`)

        return NextResponse.json(newUser[0]); // Return the first inserted record
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
