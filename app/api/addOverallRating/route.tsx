import { eq } from "drizzle-orm";
import db from "../../../db";
import { storesTable } from "../../../db/schema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { storeId, overallRating } = await req.json();

    // convert  overallRating to integer
    
    
    const storeexist = await db.select().from(storesTable).where(eq(storesTable.storeId, storeId));

    if (storeexist.length === 0) {
        return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    try {
        //@ts-ignore
        await db.update(storesTable).set({ overallRating }).where(eq(storesTable.storeId, storeId)).returning();
        return NextResponse.json({ message: "Added successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error adding overall rating:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }




}
        