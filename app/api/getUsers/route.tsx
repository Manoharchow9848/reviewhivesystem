import { NextResponse } from "next/server";
import db from "../../../db";
import { usersTable } from "../../../db/schema"; 

export async function GET() {
    try {
        const users = await db
            .select({
                id: usersTable.id,
                name: usersTable.name,
                email: usersTable.email,
                address: usersTable.address,
                role: usersTable.role
            })
            .from(usersTable);

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
