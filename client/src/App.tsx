import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Tournaments from "@/pages/tournaments";
import Admin from "@/pages/admin";
import Payment from "@/pages/payment";
import Contact from "@/pages/contact";
import Register from "@/pages/register";
import Navbar from "@/components/navbar";

function Router() {
  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tournaments" component={Tournaments} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/payment" component={Payment} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
