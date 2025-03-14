import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { usersTable } from "../../../db/schema";
import { eq } from "drizzle-orm";


export async function PUT(req: NextRequest) {
    const { name, email, address, profilePic } = await req.json();
    
    const userExist  = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if(userExist.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
     
        const updatedUser = await db.update(usersTable).set({
            name,
            address,
               // @ts-ignore
            profilePic: profilePic as string
        }).where(eq(usersTable.email, email)).returning();
          const {password: _, ...safeUser } = updatedUser[0];
        return NextResponse.json({user:safeUser});
    } catch (error) {
       
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }



     


}