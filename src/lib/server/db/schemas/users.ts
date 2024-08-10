import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 64 }).primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

export type DbUser = typeof users.$inferSelect;
export type InsertDbUser = typeof users.$inferInsert;
