import { NextResponse } from "next/server";
import { storesTable } from "../../../db/schema";
import db from "../../../db";


export async function GET() {
    try {
        const stores = await db.select().from(storesTable).execute();

        return NextResponse.json({ stores }, { status: 200 });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}