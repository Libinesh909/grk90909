import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertUserSchema } from "@shared/schema";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  UserPlus, 
  Youtube, 
  Instagram, 
  MessageCircle,
  Users
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    email: "",
    phone: "",
    preferredGame: "",
    experience: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message sent successfully! We'll get back to you soon.",
      });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/users/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Registration successful! Check your email for confirmation.",
      });
      setRegistrationForm({
        username: "",
        email: "",
        phone: "",
        preferredGame: "",
        experience: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Registration failed. Please check your details and try again.",
        variant: "destructive",
      });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

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
          <h1 className="font-gaming text-4xl font-bold glow-text mb-4">CONTACT US</h1>
          <p className="text-xl text-gray-400">Get in touch with the GRK gaming community</p>
        </div>

        {/* Player Registration Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="tournament-card border-gaming-green/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-green text-center">
                <UserPlus className="inline mr-2" size={24} />
                PLAYER REGISTRATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-400 mb-6">
                Join the arena and compete with the best
              </p>

              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gaming-cyan font-bold">Player Name</Label>
                    <Input
                      value={registrationForm.username}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, username: e.target.value })}
                      placeholder="Enter your gaming name"
                      className="bg-gaming-dark border-gaming-green/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gaming-cyan font-bold">Email</Label>
                    <Input
                      type="email"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-gaming-dark border-gaming-green/30 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gaming-cyan font-bold">Phone Number</Label>
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
                    <Label className="text-gaming-cyan font-bold">Preferred Game</Label>
                    <Input
                      value="Free Fire"
                      className="bg-gaming-dark border-gaming-green/30 text-white"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Gaming Experience</Label>
                  <Textarea
                    value={registrationForm.experience}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, experience: e.target.value })}
                    placeholder="Tell us about your gaming experience..."
                    className="bg-gaming-dark border-gaming-green/30 text-white h-24"
                  />
                </div>

                <div className="bg-gaming-dark/50 rounded-lg p-4">
                  <h4 className="font-bold text-gaming-orange mb-2">Registration Rules:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Tournament entry fee: ₹10 per tournament</li>
                    <li>• Registration details will be sent to libineshr7@gmail.com</li>
                    <li>• Payment to be made to 9514159632@fam</li>
                    <li>• Submit random unique number within 48 hours after tournament</li>
                    <li>• All tournament rules must be followed</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gaming-green text-gaming-dark font-bold py-4 text-lg neon-green"
                  disabled={registrationMutation.isPending}
                >
                  {registrationMutation.isPending ? "Registering..." : "REGISTER NOW"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="tournament-card border-gaming-green/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-cyan">
                <Mail className="inline mr-2" size={24} />
                SEND MESSAGE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gaming-cyan font-bold">Name</Label>
                    <Input
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-gaming-dark border-gaming-green/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gaming-cyan font-bold">Email</Label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-gaming-dark border-gaming-green/30 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Subject</Label>
                  <Select
                    value={contactForm.subject}
                    onValueChange={(value) => setContactForm({ ...contactForm, subject: value })}
                  >
                    <SelectTrigger className="bg-gaming-dark border-gaming-green/30 text-white">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gaming-purple border-gaming-green/30">
                      <SelectItem value="registration">Registration Query</SelectItem>
                      <SelectItem value="payment">Payment Issue</SelectItem>
                      <SelectItem value="tournament">Tournament Information</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Message</Label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Your message..."
                    className="bg-gaming-dark border-gaming-green/30 text-white h-32"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gaming-green text-gaming-dark font-bold py-4 text-lg neon-green"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : (
                    <>
                      <Send className="mr-2" size={20} />
                      SEND MESSAGE
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="tournament-card border-gaming-green/20">
              <CardHeader>
                <CardTitle className="font-gaming text-2xl text-gaming-cyan">
                  <Phone className="inline mr-2" size={24} />
                  GET IN TOUCH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gaming-green/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-gaming-green" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gaming-green">Email</h4>
                    <p className="text-gray-300">libineshr7@gmail.com</p>
                    <p className="text-sm text-gray-400">For registrations and queries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gaming-orange/20 rounded-lg flex items-center justify-center">
                    <Phone className="text-gaming-orange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gaming-orange">Payment</h4>
                    <p className="text-gray-300">9514159632@fam</p>
                    <p className="text-sm text-gray-400">Google Pay / PhonePe / Paytm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gaming-cyan/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-gaming-cyan" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gaming-cyan">Location</h4>
                    <p className="text-gray-300">Kanniyakumari, Tamil Nadu</p>
                    <p className="text-sm text-gray-400">Gaming Republic Headquarters</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="tournament-card border-gaming-green/20">
              <CardHeader>
                <CardTitle className="font-gaming text-2xl text-gaming-cyan">
                  <Users className="inline mr-2" size={24} />
                  FOLLOW US
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 bg-gaming-dark/50 border-red-500 text-red-500 hover:bg-red-500/20 p-4 h-auto"
                  >
                    <Youtube size={24} />
                    <span className="font-bold">YouTube</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 bg-gaming-dark/50 border-pink-500 text-pink-500 hover:bg-pink-500/20 p-4 h-auto"
                  >
                    <Instagram size={24} />
                    <span className="font-bold">Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 bg-gaming-dark/50 border-purple-500 text-purple-500 hover:bg-purple-500/20 p-4 h-auto"
                  >
                    <MessageCircle size={24} />
                    <span className="font-bold">Discord</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 bg-gaming-dark/50 border-blue-500 text-blue-500 hover:bg-blue-500/20 p-4 h-auto"
                  >
                    <Send size={24} />
                    <span className="font-bold">Telegram</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
