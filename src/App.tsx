import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // --- Adsterra Social Bar Injection ---
    const adsterraScript = document.createElement("script");
    adsterraScript.src = "https://heavinessslight.com/a8/56/22/a85622f541fd32b2627da5b38052d23d.js";
    adsterraScript.async = true;
    document.body.appendChild(adsterraScript);

    // --- PopAds Script Injection ---
    // Note: Ba3d ma PopAds ya3mlou verification lel meta tag, 
    // bech ya3tiwak script akher fih "Website ID", 7otto hna:
    const popScript = document.createElement("script");
    popScript.src = "//c1.popads.net/pop.js"; // Hedha script el base
    popScript.async = true;
    document.body.appendChild(popScript);

    return () => {
      document.body.removeChild(adsterraScript);
      document.body.removeChild(popScript);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
