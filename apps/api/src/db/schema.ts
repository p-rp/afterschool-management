import { pgTable, serial, varchar, timestamp, text, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'trainer', 'student', 'parent', 'admin']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  role: userRoleEnum('role').default('user').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id).notNull(),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const activityLog = pgTable('activity_log', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  details: text('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const trainers = pgTable('trainers', {
  userId: serial('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

export const students = pgTable('students', {
  userId: serial('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

export const parents = pgTable('parents', {
  userId: serial('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

export const admin = pgTable('admin', {
  userId: serial('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type ActivityLog = typeof activityLog.$inferSelect;
export type Trainer = typeof trainers.$inferSelect;
export type NewTrainer = typeof trainers.$inferInsert;
export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
export type Parent = typeof parents.$inferSelect;
export type NewParent = typeof parents.$inferInsert;
export type Admin = typeof admin.$inferSelect;
export type NewAdmin = typeof admin.$inferInsert;
