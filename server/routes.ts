import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTournamentSchema, insertRegistrationSchema, insertPostTournamentSubmissionSchema } from "@shared/schema";
import { sendEmail } from "./lib/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post('/api/users/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser(userData);

      // Send email notification
      await sendEmail({
        to: process.env.REGISTRATION_EMAIL || "libineshr7@gmail.com",
        subject: "New Player Registration - GRK",
        text: `New player registered: ${user.username} (${user.email})\nGame: ${user.preferredGame}\nPhone: ${user.phone}`,
      });

      res.json(user);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Registration failed" });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Tournament routes
  app.get('/api/tournaments', async (req, res) => {
    try {
      const tournaments = await storage.getAllTournaments();
      
      // Add player count for each tournament
      const tournamentsWithCount = await Promise.all(
        tournaments.map(async (tournament) => {
          const registrations = await storage.getRegistrationsByTournament(tournament.id);
          return {
            ...tournament,
            playerCount: registrations.length,
          };
        })
      );
      
      res.json(tournamentsWithCount);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tournaments" });
    }
  });

  app.get('/api/tournaments/:id', async (req, res) => {
    try {
      const tournament = await storage.getTournament(parseInt(req.params.id));
      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
      res.json(tournament);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tournament" });
    }
  });

  // Admin route to create tournament
  app.post('/api/admin/tournaments', async (req, res) => {
    try {
      const tournamentData = insertTournamentSchema.parse(req.body);
      const tournament = await storage.createTournament(tournamentData);
      res.json(tournament);
    } catch (error) {
      console.error("Tournament creation error:", error);
      res.status(400).json({ message: "Failed to create tournament" });
    }
  });

  // Admin route to update tournament status
  app.patch('/api/admin/tournaments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const tournament = await storage.updateTournament(id, updates);
      res.json(tournament);
    } catch (error) {
      res.status(400).json({ message: "Failed to update tournament" });
    }
  });

  // Registration routes
  app.post('/api/registrations', async (req, res) => {
    try {
      const registrationData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(registrationData);
      res.json(registration);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Failed to register for tournament" });
    }
  });

  app.get('/api/tournaments/:id/registrations', async (req, res) => {
    try {
      const registrations = await storage.getRegistrationsByTournament(parseInt(req.params.id));
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch registrations" });
    }
  });

  // Payment proof upload
  app.post('/api/registrations/:id/payment', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { transactionId, paymentProof } = req.body;
      
      const registration = await storage.updateRegistration(id, {
        transactionId,
        paymentProof,
        paymentStatus: 'paid'
      });
      
      res.json(registration);
    } catch (error) {
      res.status(400).json({ message: "Failed to update payment information" });
    }
  });

  // Leaderboard routes
  app.get('/api/tournaments/:id/leaderboard', async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboardByTournament(parseInt(req.params.id));
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  app.get('/api/leaderboard/global', async (req, res) => {
    try {
      const leaderboard = await storage.getGlobalLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch global leaderboard" });
    }
  });

  // Post-tournament submission
  app.post('/api/submissions', async (req, res) => {
    try {
      const submissionData = insertPostTournamentSubmissionSchema.parse(req.body);
      
      // Check if tournament ended within 48 hours
      const tournament = await storage.getTournament(submissionData.tournamentId);
      if (!tournament || !tournament.endTime) {
        return res.status(400).json({ message: "Tournament not found or not ended" });
      }
      
      const hoursSinceEnd = (Date.now() - new Date(tournament.endTime).getTime()) / (1000 * 60 * 60);
      if (hoursSinceEnd > 48) {
        return res.status(400).json({ message: "Submission window has expired (48 hours)" });
      }
      
      const submission = await storage.createPostTournamentSubmission(submissionData);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ message: "Failed to submit random number" });
    }
  });

  // Contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      await sendEmail({
        to: process.env.CONTACT_EMAIL || "libineshr7@gmail.com",
        subject: `Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
      
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
