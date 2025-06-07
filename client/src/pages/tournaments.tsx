import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Eye, Gamepad2 } from "lucide-react";
import TournamentCard from "@/components/tournament-card";
import Leaderboard from "@/components/leaderboard";

export default function Tournaments() {
  const [filter, setFilter] = useState("all");

  const { data: tournaments = [], isLoading } = useQuery({
    queryKey: ["/api/tournaments"],
  });

  const filteredTournaments = tournaments.filter((tournament: any) => {
    if (filter === "all") return true;
    return tournament.status === filter;
  });

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-2xl font-gaming text-gaming-green">Loading tournaments...</div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-gaming text-4xl font-bold glow-text mb-4">FREE FIRE TOURNAMENTS</h1>
          <p className="text-xl text-gray-400">Dominate the battlefield and climb the leaderboards</p>
        </div>

        {/* Tournament Status Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-gaming-purple rounded-lg p-2 flex space-x-2">
            <Button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-bold ${
                filter === "all"
                  ? "bg-gaming-green text-gaming-dark"
                  : "text-gaming-cyan hover:bg-gaming-cyan/20"
              }`}
            >
              ALL
            </Button>
            <Button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-2 rounded-lg font-bold ${
                filter === "upcoming"
                  ? "bg-gaming-green text-gaming-dark"
                  : "text-gaming-cyan hover:bg-gaming-cyan/20"
              }`}
            >
              UPCOMING
            </Button>
            <Button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg font-bold ${
                filter === "active"
                  ? "bg-gaming-green text-gaming-dark"
                  : "text-gaming-green hover:bg-gaming-green/20"
              }`}
            >
              ACTIVE
            </Button>
            <Button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg font-bold ${
                filter === "completed"
                  ? "bg-gaming-green text-gaming-dark"
                  : "text-gaming-orange hover:bg-gaming-orange/20"
              }`}
            >
              COMPLETED
            </Button>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Trophy className="mx-auto mb-4 text-gaming-orange" size={64} />
              <h3 className="text-2xl font-gaming font-bold text-gray-400 mb-2">No Tournaments Found</h3>
              <p className="text-gray-500">No tournaments match the selected filter.</p>
            </div>
          ) : (
            filteredTournaments.map((tournament: any) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))
          )}
        </div>

        {/* Global Leaderboard */}
        <Leaderboard />
      </div>
    </div>
  );
}
