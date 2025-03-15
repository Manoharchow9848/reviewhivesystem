import { NextResponse } from "next/server";
import { storesTable } from "../../../db/schema";
import db from "../../../db";


export async function GET() {
    try {
        const stores = await db.select().from(storesTable).execute();    
        return NextResponse.json({ count: stores.length }); // Return store count
    } catch (error) {
        console.error("Error fetching store count:", error);
        return NextResponse.json({ error: "Failed to fetch store count" }, { status: 500 });
    }
}