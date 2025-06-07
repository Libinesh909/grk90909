import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  preferredGame: text("preferred_game").notNull().default("freefire"),
  experience: text("experience"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  game: text("game").notNull().default("freefire"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  entryFee: decimal("entry_fee").default("10"),
  maxPlayers: integer("max_players").default(100),
  status: text("status").notNull().default("upcoming"), // upcoming, active, completed
  winnerId: integer("winner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  tournamentId: integer("tournament_id").notNull().references(() => tournaments.id),
  paymentStatus: text("payment_status").default("pending"), // pending, paid, verified
  transactionId: text("transaction_id"),
  paymentProof: text("payment_proof"), // file path or URL
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  tournamentId: integer("tournament_id").notNull().references(() => tournaments.id),
  position: integer("position").notNull(),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const postTournamentSubmissions = pgTable("post_tournament_submissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  tournamentId: integer("tournament_id").notNull().references(() => tournaments.id),
  randomNumber: integer("random_number").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTournamentSchema = createInsertSchema(tournaments).omit({
  id: true,
  createdAt: true,
}).extend({
  startTime: z.coerce.date(),
  endTime: z.coerce.date().optional().nullable(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registeredAt: true,
});

export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({
  id: true,
  createdAt: true,
});

export const insertPostTournamentSubmissionSchema = createInsertSchema(postTournamentSubmissions).omit({
  id: true,
  submittedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Tournament = typeof tournaments.$inferSelect;
export type InsertTournament = z.infer<typeof insertTournamentSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Leaderboard = typeof leaderboard.$inferSelect;
export type InsertLeaderboard = z.infer<typeof insertLeaderboardSchema>;
export type PostTournamentSubmission = typeof postTournamentSubmissions.$inferSelect;
export type InsertPostTournamentSubmission = z.infer<typeof insertPostTournamentSubmissionSchema>;
