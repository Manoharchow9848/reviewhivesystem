import db from "../../../db";
import { usersTable } from "../../../db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if user exists
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const validPassword = bcrypt.compareSync(password, user[0].password);

    // Check if password is correct
    if (validPassword === false) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }
    const { password: _, ...safeUser } = user[0];

    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
