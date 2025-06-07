import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertUserSchema } from "@shared/schema";
import { 
  UserPlus, 
  Gamepad2, 
  Mail, 
  Phone, 
  Target,
  Trophy,
  Users,
  Clock
} from "lucide-react";

export default function Register() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    email: "",
    phone: "",
    preferredGame: "freefire",
    experience: "",
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/users/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to GRK! Check your email for confirmation.",
      });
      setRegistrationForm({
        username: "",
        email: "",
        phone: "",
        preferredGame: "freefire",
        experience: "",
      });
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "Please check your details and try again.",
        variant: "destructive",
      });
    },
  });

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = insertUserSchema.parse(registrationForm);
      registrationMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-gaming text-4xl font-bold glow-text mb-4">
            <Gamepad2 className="inline mr-2" size={40} />
            FREE FIRE REGISTRATION
          </h1>
          <p className="text-xl text-gray-400">Join the ultimate Free Fire gaming community</p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <Card className="tournament-card border-gaming-green/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-green text-center">
                <UserPlus className="inline mr-2" size={24} />
                BECOME A WARRIOR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <div>
                  <Label className="text-gaming-cyan font-bold flex items-center">
                    <Target className="mr-2" size={16} />
                    Player Name (In-Game ID)
                  </Label>
                  <Input
                    value={registrationForm.username}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, username: e.target.value })}
                    placeholder="Enter your Free Fire ID"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Use your exact Free Fire in-game name</p>
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold flex items-center">
                    <Mail className="mr-2" size={16} />
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    value={registrationForm.email}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold flex items-center">
                    <Phone className="mr-2" size={16} />
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    value={registrationForm.phone}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                    placeholder="+91 XXXXXXXXXX"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Free Fire Experience</Label>
                  <Textarea
                    value={registrationForm.experience}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, experience: e.target.value })}
                    placeholder="Tell us about your Free Fire experience, rank, favorite modes..."
                    className="bg-gaming-dark border-gaming-green/30 text-white h-24"
                  />
                </div>

                <div className="bg-gaming-dark/50 rounded-lg p-4">
                  <h4 className="font-bold text-gaming-orange mb-3 flex items-center">
                    <Trophy className="mr-2" size={16} />
                    Registration Benefits:
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Access to exclusive Free Fire tournaments</li>
                    <li>• Priority registration for special events</li>
                    <li>• Leaderboard tracking and rankings</li>
                    <li>• Community Discord access</li>
                    <li>• Tournament notifications and updates</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gaming-green text-gaming-dark font-bold py-4 text-lg neon-green"
                  disabled={registrationMutation.isPending}
                >
                  {registrationMutation.isPending ? "Registering..." : (
                    <>
                      <Gamepad2 className="mr-2" size={20} />
                      JOIN THE BATTLEFIELD
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Tournament Rules */}
            <Card className="tournament-card border-gaming-orange/20">
              <CardHeader>
                <CardTitle className="font-gaming text-xl text-gaming-orange">
                  <Clock className="inline mr-2" size={20} />
                  TOURNAMENT RULES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gaming-dark/50 rounded-lg p-4">
                  <h4 className="font-bold text-gaming-green mb-2">Entry Requirements:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Tournament entry fee: ₹10 per tournament</li>
                    <li>• Payment to: 9514159632@fam</li>
                    <li>• Free Fire level 30+ required</li>
                    <li>• Valid phone number for communication</li>
                  </ul>
                </div>
                
                <div className="bg-gaming-dark/50 rounded-lg p-4">
                  <h4 className="font-bold text-gaming-cyan mb-2">Match Rules:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Battle Royale and Clash Squad modes</li>
                    <li>• No hacks, mods, or cheating allowed</li>
                    <li>• Follow room ID and password instructions</li>
                    <li>• Be online 15 minutes before start time</li>
                  </ul>
                </div>

                <div className="bg-gaming-dark/50 rounded-lg p-4">
                  <h4 className="font-bold text-gaming-orange mb-2">Post-Tournament:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Submit random unique number within 48 hours</li>
                    <li>• Screenshots required for verification</li>
                    <li>• Winners announced within 24 hours</li>
                    <li>• Prize distribution via UPI/PayTM</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="tournament-card border-gaming-cyan/20">
              <CardHeader>
                <CardTitle className="font-gaming text-xl text-gaming-cyan">
                  <Users className="inline mr-2" size={20} />
                  COMMUNITY STATS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-gaming font-bold text-gaming-green mb-1">150+</div>
                    <div className="text-xs text-gray-400">Active Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-gaming font-bold text-gaming-orange mb-1">25+</div>
                    <div className="text-xs text-gray-400">Tournaments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-gaming font-bold text-gaming-cyan mb-1">₹5000+</div>
                    <div className="text-xs text-gray-400">Prize Pool</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-gaming font-bold text-gaming-green mb-1">24/7</div>
                    <div className="text-xs text-gray-400">Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="tournament-card border-gaming-green/20">
              <CardHeader>
                <CardTitle className="font-gaming text-xl text-gaming-green">NEED HELP?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gaming-green" size={16} />
                  <span className="text-sm">libineshr7@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-gaming-orange" size={16} />
                  <span className="text-sm">9514159632@fam</span>
                </div>
                <p className="text-xs text-gray-400">
                  Registration details will be sent to the admin email automatically.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}