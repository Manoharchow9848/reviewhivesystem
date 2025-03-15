
import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from 'uuid';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 60 }).notNull(), // Name validation
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(), // Password validation
  address: varchar({ length: 400 }).notNull(),
  role: varchar({ length: 20 }).notNull(),
  profilePic: varchar(),
  userId: varchar({ length: 40 }).notNull().unique(),
 

});

export const storesTable = pgTable("stores", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 60 }).notNull(),
  address: varchar({ length: 400 }).notNull(),
  description: varchar({ length: 400 }).notNull(),
  rating: jsonb().default([]), // Default empty array instead of null
  email: varchar({ length: 255 }).notNull().references(() => usersTable.email, { onDelete: "cascade" }),
  storeProfilePic: varchar(),
  storeId: varchar().notNull().unique(),
});