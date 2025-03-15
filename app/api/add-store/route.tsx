import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import db from "../../../db";
import { storesTable } from "../../../db/schema";

export async function POST(req: NextRequest) {
    try {
        const { name, email, description, address, storeProfilePic } = await req.json();

        // Validate required fields
        if (!name || !email || !address) {
            return NextResponse.json(
                { error: "Name, Email, and Address are required." },
                { status: 400 }
            );
        }

        const storeId = uuidv4(); // Generate unique store ID

        // Insert data into database
        //@ts-ignore
        await db.insert(storesTable).values({
            name,
            email,
            description,
            address,
            storeProfilePic,
            storeId
        });

        return NextResponse.json(
            { message: "Added successfully!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding store:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
