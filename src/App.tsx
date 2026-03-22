import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import History from "./pages/History";
import LiveIndia from "./pages/LiveIndia";
import Population from "./pages/Population";
import Economy from "./pages/Economy";
import Flights from "./pages/Flights";
import Government from "./pages/Government";
import Geography from "./pages/Geography";
import Culture from "./pages/Culture";
import Infrastructure from "./pages/Infrastructure";
import SearchPage from "./pages/SearchPage";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/history" element={<History />} />
            <Route path="/live" element={<LiveIndia />} />
            <Route path="/population" element={<Population />} />
            <Route path="/economy" element={<Economy />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/government" element={<Government />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
