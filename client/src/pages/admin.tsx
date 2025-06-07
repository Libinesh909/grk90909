import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Plus, Users, Trophy, Clock } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    game: "freefire-br",
    startTime: "",
    maxPlayers: 100,
  });

  const { data: tournaments } = useQuery({
    queryKey: ["/api/tournaments"],
  });

  const createTournamentMutation = useMutation({
    mutationFn: async (tournamentData: any) => {
      await apiRequest("POST", "/api/admin/tournaments", tournamentData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Tournament created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/tournaments"] });
      setTournamentForm({ name: "", game: "freefire-br", startTime: "", maxPlayers: 100 });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create tournament",
        variant: "destructive",
      });
    },
  });

  const updateTournamentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      await apiRequest("PATCH", `/api/admin/tournaments/${id}`, updates);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Tournament updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/tournaments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update tournament",
        variant: "destructive",
      });
    },
  });

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    createTournamentMutation.mutate(tournamentForm);
  };

  const handleStatusChange = (tournamentId: number, status: string) => {
    updateTournamentMutation.mutate({
      id: tournamentId,
      updates: { status },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-gaming-cyan";
      case "active": return "text-gaming-green";
      case "completed": return "text-gaming-orange";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-gaming text-4xl font-bold glow-text mb-4">
            <Shield className="inline mr-2" size={40} />
            ADMIN PANEL
          </h1>
          <p className="text-xl text-gray-400">Manage tournaments and platform settings</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Create Tournament */}
          <Card className="tournament-card border-gaming-green/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-green">
                <Plus className="inline mr-2" size={24} />
                CREATE TOURNAMENT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTournament} className="space-y-6">
                <div>
                  <Label className="text-gaming-cyan font-bold">Tournament Name</Label>
                  <Input
                    value={tournamentForm.name}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, name: e.target.value })}
                    placeholder="Enter tournament name"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Game Mode</Label>
                  <Select
                    value={tournamentForm.game}
                    onValueChange={(value) => setTournamentForm({ ...tournamentForm, game: value })}
                  >
                    <SelectTrigger className="bg-gaming-dark border-gaming-green/30 text-white">
                      <SelectValue placeholder="Select Free Fire mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-gaming-purple border-gaming-green/30">
                      <SelectItem value="freefire-br">Battle Royale</SelectItem>
                      <SelectItem value="freefire-cs">Clash Squad</SelectItem>
                      <SelectItem value="freefire-ranked">Ranked Match</SelectItem>
                      <SelectItem value="freefire-custom">Custom Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Start Time</Label>
                  <Input
                    type="datetime-local"
                    value={tournamentForm.startTime}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, startTime: e.target.value })}
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Max Players</Label>
                  <Input
                    type="number"
                    value={tournamentForm.maxPlayers}
                    onChange={(e) => setTournamentForm({ ...tournamentForm, maxPlayers: parseInt(e.target.value) })}
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    min="1"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gaming-green text-gaming-dark font-bold py-3 neon-green"
                  disabled={createTournamentMutation.isPending}
                >
                  {createTournamentMutation.isPending ? "Creating..." : "CREATE TOURNAMENT"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tournament Stats */}
          <Card className="tournament-card border-gaming-orange/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-orange">
                <Trophy className="inline mr-2" size={24} />
                TOURNAMENT CONTROL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Tournaments</span>
                  <span className="text-gaming-green font-bold text-xl">
                    {tournaments?.filter((t: any) => t.status === "active").length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Upcoming Tournaments</span>
                  <span className="text-gaming-cyan font-bold text-xl">
                    {tournaments?.filter((t: any) => t.status === "upcoming").length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completed Tournaments</span>
                  <span className="text-gaming-orange font-bold text-xl">
                    {tournaments?.filter((t: any) => t.status === "completed").length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Registrations</span>
                  <span className="text-gaming-green font-bold text-xl">
                    {tournaments?.reduce((sum: number, t: any) => sum + (t.playerCount || 0), 0) || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Management */}
        <Card className="tournament-card border-gaming-cyan/20">
          <CardHeader>
            <CardTitle className="font-gaming text-2xl text-gaming-cyan">
              <Clock className="inline mr-2" size={24} />
              MANAGE TOURNAMENTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tournaments?.map((tournament: any) => (
                <div
                  key={tournament.id}
                  className="bg-gaming-dark/50 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">{tournament.name}</h3>
                    <p className="text-gray-400">
                      {tournament.game} • {tournament.playerCount}/{tournament.maxPlayers} players
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(tournament.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`font-bold uppercase ${getStatusColor(tournament.status)}`}>
                      {tournament.status}
                    </span>
                    <Select
                      value={tournament.status}
                      onValueChange={(status) => handleStatusChange(tournament.id, status)}
                    >
                      <SelectTrigger className="w-40 bg-gaming-purple border-gaming-green/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gaming-purple border-gaming-green/30">
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              {!tournaments?.length && (
                <div className="text-center py-8 text-gray-400">
                  No tournaments created yet. Create your first tournament above!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
