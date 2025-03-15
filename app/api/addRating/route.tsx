import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { storesTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { storeId, rating, email } = await req.json();

    if (!storeId || rating == null) {
      return NextResponse.json({ error: "storeId and rating are required" }, { status: 400 });
    }

    // Get the current store details
    const store = await db
      .select()
      .from(storesTable)
      .where(eq(storesTable.storeId, storeId))
      .limit(1);

    if (!store.length) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const currentCount = store[0].count || 0;

    const currentRatings = store[0].rating || []; // Ensure it's an array

    // Append the new rating with email
    // @ts-ignore
    const updatedRatings = [...currentRatings, { email, rating }];
    

    // Update store rating and increment count
    await db
      .update(storesTable)
      .set({
      // Add new rating to total
         //@ts-ignore
        count: currentCount + 1,
        rating: updatedRatings, // Increment count
      })
      .where(eq(storesTable.storeId, storeId));

    return NextResponse.json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Error submitting rating:", error);
    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 });
  }
}
