import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, UserPlus, Gamepad2, Crown, Users, Star } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-dark via-gaming-purple to-gaming-dark"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-gaming-green rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-gaming-cyan rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gaming-orange rotate-45"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="font-gaming text-5xl md:text-7xl font-black mb-6 glow-text">
              GAMING REPUBLIC
            </h1>
            <h2 className="font-gaming text-2xl md:text-4xl font-bold text-gaming-cyan mb-4">
              OF KANNIYAKUMARI
            </h2>
            <div className="w-32 h-1 bg-gaming-green mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
              Join the ultimate gaming community. Compete in tournaments, climb the leaderboards, and prove your skills in the arena.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tournaments">
                <Button className="bg-gaming-green text-gaming-dark hover:bg-gaming-green/90 px-8 py-4 text-lg font-bold neon-green">
                  <Trophy className="mr-2" size={20} />
                  JOIN TOURNAMENT
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="border-gaming-green text-gaming-green hover:bg-gaming-green hover:text-gaming-dark px-8 py-4 text-lg font-bold"
                >
                  <UserPlus className="mr-2" size={20} />
                  REGISTER NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gaming-purple/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-gaming text-4xl font-bold glow-text mb-4">WHY CHOOSE GRK?</h2>
            <p className="text-xl text-gray-400">Experience competitive gaming like never before</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="tournament-card border-gaming-green/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gaming-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-gaming-green" size={32} />
                </div>
                <h3 className="font-gaming text-xl font-bold mb-4 text-gaming-green">COMPETITIVE TOURNAMENTS</h3>
                <p className="text-gray-300">
                  Participate in regular tournaments across multiple games. Entry fee just ₹10 per tournament.
                </p>
              </CardContent>
            </Card>

            <Card className="tournament-card border-gaming-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gaming-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="text-gaming-cyan" size={32} />
                </div>
                <h3 className="font-gaming text-xl font-bold mb-4 text-gaming-cyan">LEADERBOARDS</h3>
                <p className="text-gray-300">
                  Track your progress and compete for the top spot in our global leaderboard system.
                </p>
              </CardContent>
            </Card>

            <Card className="tournament-card border-gaming-orange/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gaming-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-gaming-orange" size={32} />
                </div>
                <h3 className="font-gaming text-xl font-bold mb-4 text-gaming-orange">GAMING COMMUNITY</h3>
                <p className="text-gray-300">
                  Join a vibrant community of gamers from Kanniyakumari and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-gaming font-bold text-gaming-green mb-2">100+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-gaming font-bold text-gaming-cyan mb-2">50+</div>
              <div className="text-gray-400">Tournaments Held</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-gaming font-bold text-gaming-orange mb-2">5</div>
              <div className="text-gray-400">Game Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-gaming font-bold text-gaming-green mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gaming-purple/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-gaming text-4xl font-bold glow-text mb-4">READY TO DOMINATE?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of gamers in the ultimate competitive experience</p>
          <Link href="/tournaments">
            <Button className="bg-gaming-green text-gaming-dark hover:bg-gaming-green/90 px-12 py-6 text-xl font-bold neon-green">
              <Gamepad2 className="mr-2" size={24} />
              START GAMING NOW
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gaming-purple border-t border-gaming-green/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gaming-green rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-gaming-dark font-bold" size={16} />
              </div>
              <span className="font-gaming text-xl font-bold glow-text">GAMING REPUBLIC OF KANNIYAKUMARI</span>
            </div>
            <p className="text-gray-400 mb-4">Join the ultimate gaming community and compete with the best players</p>
            <div className="border-t border-gaming-green/20 pt-4">
              <p className="text-sm text-gray-500">© 2024 Gaming Republic of Kanniyakumari. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
