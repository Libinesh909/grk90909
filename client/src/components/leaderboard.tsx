import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["/api/leaderboard/global"],
  });

  if (isLoading) {
    return (
      <Card className="tournament-card border-gaming-cyan/20">
        <CardContent className="p-6 text-center">
          <div className="text-gaming-cyan">Loading leaderboard...</div>
        </CardContent>
      </Card>
    );
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-orange-500" size={20} />;
      default:
        return <Trophy className="text-gaming-green" size={20} />;
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-500 text-black";
      case 2:
        return "bg-gray-400 text-black";
      case 3:
        return "bg-orange-500 text-black";
      default:
        return "bg-gaming-green text-gaming-dark";
    }
  };

  return (
    <Card className="tournament-card border-gaming-cyan/20">
      <CardHeader>
        <CardTitle className="font-gaming text-2xl font-bold text-gaming-cyan text-center">
          <Crown className="inline mr-2" size={24} />
          GLOBAL LEADERBOARD
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!leaderboard || leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Trophy size={64} className="mx-auto mb-4 text-gaming-orange" />
            <h3 className="text-xl font-bold mb-2">No Rankings Yet</h3>
            <p>Complete tournaments to appear on the leaderboard!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gaming-green/30">
                  <th className="text-left py-3 text-gaming-green font-bold">RANK</th>
                  <th className="text-left py-3 text-gaming-green font-bold">PLAYER</th>
                  <th className="text-left py-3 text-gaming-green font-bold">WINS</th>
                  <th className="text-left py-3 text-gaming-green font-bold">POINTS</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player: any, index: number) => (
                  <tr
                    key={player.userId}
                    className="border-b border-gray-700 hover:bg-gaming-green/10 transition-colors"
                  >
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankBadge(
                            index + 1
                          )}`}
                        >
                          {index + 1}
                        </span>
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="py-3 font-bold">{player.username || "Unknown Player"}</td>
                    <td className="py-3 text-gaming-cyan font-bold">{player.totalWins || 0}</td>
                    <td className="py-3 text-gaming-orange font-bold">
                      {player.totalPoints?.toLocaleString() || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
