import {
  users,
  tournaments,
  registrations,
  leaderboard,
  postTournamentSubmissions,
  type User,
  type InsertUser,
  type Tournament,
  type InsertTournament,
  type Registration,
  type InsertRegistration,
  type Leaderboard,
  type InsertLeaderboard,
  type PostTournamentSubmission,
  type InsertPostTournamentSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tournament operations
  getAllTournaments(): Promise<Tournament[]>;
  getTournament(id: number): Promise<Tournament | undefined>;
  createTournament(tournament: InsertTournament): Promise<Tournament>;
  updateTournament(id: number, updates: Partial<Tournament>): Promise<Tournament>;
  
  // Registration operations
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrationsByTournament(tournamentId: number): Promise<Registration[]>;
  getRegistrationsByUser(userId: number): Promise<Registration[]>;
  updateRegistration(id: number, updates: Partial<Registration>): Promise<Registration>;
  
  // Leaderboard operations
  getLeaderboardByTournament(tournamentId: number): Promise<Leaderboard[]>;
  createLeaderboardEntry(entry: InsertLeaderboard): Promise<Leaderboard>;
  getGlobalLeaderboard(): Promise<any[]>;
  
  // Post-tournament submissions
  createPostTournamentSubmission(submission: InsertPostTournamentSubmission): Promise<PostTournamentSubmission>;
  getPostTournamentSubmissions(tournamentId: number): Promise<PostTournamentSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Tournament operations
  async getAllTournaments(): Promise<Tournament[]> {
    return await db.select().from(tournaments).orderBy(desc(tournaments.startTime));
  }

  async getTournament(id: number): Promise<Tournament | undefined> {
    const [tournament] = await db.select().from(tournaments).where(eq(tournaments.id, id));
    return tournament;
  }

  async createTournament(tournamentData: InsertTournament): Promise<Tournament> {
    const [tournament] = await db
      .insert(tournaments)
      .values(tournamentData)
      .returning();
    return tournament;
  }

  async updateTournament(id: number, updates: Partial<Tournament>): Promise<Tournament> {
    const [tournament] = await db
      .update(tournaments)
      .set(updates)
      .where(eq(tournaments.id, id))
      .returning();
    return tournament;
  }

  // Registration operations
  async createRegistration(registrationData: InsertRegistration): Promise<Registration> {
    const [registration] = await db
      .insert(registrations)
      .values(registrationData)
      .returning();
    return registration;
  }

  async getRegistrationsByTournament(tournamentId: number): Promise<Registration[]> {
    return await db
      .select()
      .from(registrations)
      .where(eq(registrations.tournamentId, tournamentId));
  }

  async getRegistrationsByUser(userId: number): Promise<Registration[]> {
    return await db
      .select()
      .from(registrations)
      .where(eq(registrations.userId, userId));
  }

  async updateRegistration(id: number, updates: Partial<Registration>): Promise<Registration> {
    const [registration] = await db
      .update(registrations)
      .set(updates)
      .where(eq(registrations.id, id))
      .returning();
    return registration;
  }

  // Leaderboard operations
  async getLeaderboardByTournament(tournamentId: number): Promise<Leaderboard[]> {
    return await db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.tournamentId, tournamentId))
      .orderBy(leaderboard.position);
  }

  async createLeaderboardEntry(entryData: InsertLeaderboard): Promise<Leaderboard> {
    const [entry] = await db
      .insert(leaderboard)
      .values(entryData)
      .returning();
    return entry;
  }

  async getGlobalLeaderboard(): Promise<any[]> {
    return await db
      .select({
        userId: leaderboard.userId,
        username: users.username,
        totalWins: sql<number>`COUNT(CASE WHEN ${leaderboard.position} = 1 THEN 1 END)`,
        totalPoints: sql<number>`SUM(${leaderboard.points})`,
      })
      .from(leaderboard)
      .leftJoin(users, eq(leaderboard.userId, users.id))
      .groupBy(leaderboard.userId, users.username)
      .orderBy(sql`SUM(${leaderboard.points}) DESC`);
  }

  // Post-tournament submissions
  async createPostTournamentSubmission(submissionData: InsertPostTournamentSubmission): Promise<PostTournamentSubmission> {
    const [submission] = await db
      .insert(postTournamentSubmissions)
      .values(submissionData)
      .returning();
    return submission;
  }

  async getPostTournamentSubmissions(tournamentId: number): Promise<PostTournamentSubmission[]> {
    return await db
      .select()
      .from(postTournamentSubmissions)
      .where(eq(postTournamentSubmissions.tournamentId, tournamentId));
  }
}

export const storage = new DatabaseStorage();
