import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Eye, Gamepad2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TournamentCardProps {
  tournament: any;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async () => {
      // Note: In a real app, you'd get the user ID from authentication
      await apiRequest("POST", "/api/registrations", {
        userId: 1, // This should come from auth
        tournamentId: tournament.id,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully registered for tournament!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/tournaments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="status-upcoming bg-gaming-cyan/20 text-gaming-cyan font-bold">
            UPCOMING
          </Badge>
        );
      case "active":
        return (
          <Badge className="status-active bg-gaming-green/20 text-gaming-green font-bold">
            LIVE
          </Badge>
        );
      case "completed":
        return (
          <Badge className="status-completed bg-gaming-orange/20 text-gaming-orange font-bold">
            ENDED
          </Badge>
        );
      default:
        return null;
    }
  };

  const getActionButton = () => {
    switch (tournament.status) {
      case "upcoming":
        return (
          <Button
            onClick={() => registerMutation.mutate()}
            className="w-full bg-gaming-green text-gaming-dark font-bold py-3 neon-green"
            disabled={registerMutation.isPending}
          >
            <Gamepad2 className="mr-2" size={16} />
            {registerMutation.isPending ? "Registering..." : "REGISTER"}
          </Button>
        );
      case "active":
        return (
          <Button className="w-full bg-gaming-orange text-white font-bold py-3 neon-orange">
            <Eye className="mr-2" size={16} />
            WATCH LIVE
          </Button>
        );
      case "completed":
        return (
          <Button className="w-full bg-gaming-cyan text-gaming-dark font-bold py-3 neon-cyan">
            <Trophy className="mr-2" size={16} />
            VIEW RESULTS
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="tournament-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-gaming text-xl font-bold">{tournament.name}</h3>
          {getStatusBadge(tournament.status)}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Mode:</span>
            <span className="text-white font-bold capitalize">
              {tournament.game?.replace('freefire-', '').replace('br', 'Battle Royale').replace('cs', 'Clash Squad').replace('ranked', 'Ranked').replace('custom', 'Custom') || 'Free Fire'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Entry Fee:</span>
            <span className="text-gaming-green font-bold">₹{tournament.entryFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Players:</span>
            <span className="text-white">
              {tournament.playerCount || 0}/{tournament.maxPlayers}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">
              {tournament.status === "completed" ? "Ended:" : "Start Time:"}
            </span>
            <span className="text-white">
              {new Date(tournament.startTime).toLocaleDateString()},{" "}
              {new Date(tournament.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        
        {getActionButton()}
      </CardContent>
    </Card>
  );
}
