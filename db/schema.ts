import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 60 }).notNull(), // Name validation
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 16 }).notNull(), // Password validation
  address: varchar({ length: 400 }).notNull(),
  role: varchar({ length: 20 }).notNull(),
  profilePic: varchar({ length: 500 }).default(""),
  userId: varchar({ length: 40 }).notNull().unique(),
 

});
