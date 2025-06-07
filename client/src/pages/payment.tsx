import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CreditCard, Upload, Hash, Smartphone } from "lucide-react";

export default function Payment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [paymentForm, setPaymentForm] = useState({
    tournamentId: "",
    playerName: "",
    transactionId: "",
    paymentProof: "",
  });

  const [submissionForm, setSubmissionForm] = useState({
    userId: "",
    tournamentId: "",
    randomNumber: "",
  });

  const { data: tournaments } = useQuery({
    queryKey: ["/api/tournaments"],
  });

  const paymentMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", `/api/registrations/${data.registrationId}/payment`, data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Payment proof submitted successfully!",
      });
      setPaymentForm({ tournamentId: "", playerName: "", transactionId: "", paymentProof: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit payment proof",
        variant: "destructive",
      });
    },
  });

  const submissionMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/submissions", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Random number submitted successfully!",
      });
      setSubmissionForm({ userId: "", tournamentId: "", randomNumber: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit random number",
        variant: "destructive",
      });
    },
  });

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: In a real app, you'd need to get the registration ID first
    paymentMutation.mutate({ ...paymentForm, registrationId: 1 });
  };

  const handleSubmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submissionMutation.mutate({
      ...submissionForm,
      randomNumber: parseInt(submissionForm.randomNumber),
    });
  };

  const upcomingTournaments = tournaments?.filter((t: any) => t.status === "upcoming") || [];
  const completedTournaments = tournaments?.filter((t: any) => t.status === "completed") || [];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-gaming text-4xl font-bold glow-text mb-4">PAYMENT</h1>
          <p className="text-xl text-gray-400">Secure and instant tournament payments</p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-12">
          {/* Payment Info */}
          <Card className="tournament-card border-gaming-green/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-cyan">
                <CreditCard className="inline mr-2" size={24} />
                PAYMENT DETAILS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gaming-dark/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gaming-green font-bold">Tournament Fee</span>
                  <span className="text-2xl font-bold text-gaming-orange">₹10</span>
                </div>
                <p className="text-sm text-gray-400">Per tournament entry</p>
              </div>

              <div className="bg-gaming-dark/50 rounded-lg p-4">
                <h4 className="font-bold text-gaming-cyan mb-3">Payment Method</h4>
                <div className="flex items-center space-x-3 mb-2">
                  <Smartphone className="text-2xl text-blue-500" />
                  <span className="font-bold">Google Pay / PhonePe / Paytm</span>
                </div>
                <p className="text-gaming-orange font-bold text-lg">9514159632@fam</p>
              </div>

              <div className="bg-gaming-dark/50 rounded-lg p-4">
                <h4 className="font-bold text-gaming-cyan mb-3">Payment Instructions</h4>
                <ol className="text-sm text-gray-300 space-y-2">
                  <li>1. Send ₹10 to 9514159632@fam</li>
                  <li>2. Take screenshot of payment</li>
                  <li>3. Submit payment proof below</li>
                  <li>4. Registration will be confirmed within 24 hours</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Payment Proof Upload */}
          <Card className="tournament-card border-gaming-orange/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-orange">
                <Upload className="inline mr-2" size={24} />
                SUBMIT PAYMENT PROOF
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                  <Label className="text-gaming-cyan font-bold">Tournament Selection</Label>
                  <Select
                    value={paymentForm.tournamentId}
                    onValueChange={(value) => setPaymentForm({ ...paymentForm, tournamentId: value })}
                  >
                    <SelectTrigger className="bg-gaming-dark border-gaming-green/30 text-white">
                      <SelectValue placeholder="Select Tournament" />
                    </SelectTrigger>
                    <SelectContent className="bg-gaming-purple border-gaming-green/30">
                      {upcomingTournaments.map((tournament: any) => (
                        <SelectItem key={tournament.id} value={tournament.id.toString()}>
                          {tournament.name} - {tournament.game}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Player Name</Label>
                  <Input
                    value={paymentForm.playerName}
                    onChange={(e) => setPaymentForm({ ...paymentForm, playerName: e.target.value })}
                    placeholder="Enter your registered name"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Transaction ID</Label>
                  <Input
                    value={paymentForm.transactionId}
                    onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                    placeholder="Enter transaction ID"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gaming-cyan font-bold">Payment Screenshot URL</Label>
                  <Input
                    value={paymentForm.paymentProof}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentProof: e.target.value })}
                    placeholder="Upload screenshot and paste URL here"
                    className="bg-gaming-dark border-gaming-green/30 text-white"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload your payment screenshot to a cloud service and paste the URL here
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gaming-orange text-white font-bold py-4 text-lg neon-orange"
                  disabled={paymentMutation.isPending}
                >
                  {paymentMutation.isPending ? "Submitting..." : "SUBMIT PAYMENT PROOF"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Post-Tournament Number Submission */}
        <div className="max-w-2xl mx-auto">
          <Card className="tournament-card border-gaming-orange/20">
            <CardHeader>
              <CardTitle className="font-gaming text-2xl text-gaming-orange text-center">
                <Hash className="inline mr-2" size={24} />
                POST-TOURNAMENT SUBMISSION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-400 mb-6">
                Submit your random unique number within 48 hours after tournament completion
              </p>
              
              <form onSubmit={handleSubmissionSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gaming-orange font-bold">Tournament</Label>
                    <Select
                      value={submissionForm.tournamentId}
                      onValueChange={(value) => setSubmissionForm({ ...submissionForm, tournamentId: value })}
                    >
                      <SelectTrigger className="bg-gaming-dark border-gaming-orange/30 text-white">
                        <SelectValue placeholder="Select Completed Tournament" />
                      </SelectTrigger>
                      <SelectContent className="bg-gaming-purple border-gaming-orange/30">
                        {completedTournaments.map((tournament: any) => (
                          <SelectItem key={tournament.id} value={tournament.id.toString()}>
                            {tournament.name} - {tournament.game} (ENDED)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gaming-orange font-bold">Random Number</Label>
                    <Input
                      type="number"
                      value={submissionForm.randomNumber}
                      onChange={(e) => setSubmissionForm({ ...submissionForm, randomNumber: e.target.value })}
                      placeholder="Enter unique number"
                      className="bg-gaming-dark border-gaming-orange/30 text-white"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gaming-orange text-white font-bold py-3 neon-orange"
                  disabled={submissionMutation.isPending}
                >
                  {submissionMutation.isPending ? "Submitting..." : "SUBMIT NUMBER"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
