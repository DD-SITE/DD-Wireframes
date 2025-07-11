import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(20)
});

export const WireframeToCodeTable = pgTable("wireframetocode", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uid: varchar(),
    imageUrl: varchar(),
    model: varchar(),
    description: varchar(),
    code: json(),
    createdBy: varchar()
})