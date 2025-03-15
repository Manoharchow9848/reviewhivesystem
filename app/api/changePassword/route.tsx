import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { usersTable } from "../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';


export async function PUT(req: NextRequest) {
            const { password, email } = await req.json();
    // upadting password

    const userExist  = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if(userExist.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const updatedUser = await db.update(usersTable).set({
            password: hashedPassword
        }).where(eq(usersTable.email, email)).returning();
          const {password: _, ...safeUser } = updatedUser[0];
        return NextResponse.json({user:safeUser});
    } catch (error) {
       
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


    
}