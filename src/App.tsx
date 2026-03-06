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
    // 1. Inject Adsterra Social Bar (same uploaded picture product)
    const adsterraScript = document.createElement("script");
    adsterraScript.src = "https://heavinessslight.com/a8/56/22/a85622f541fd32b2627da5b38052d23d.js";
    adsterraScript.async = true;
    document.body.appendChild(adsterraScript);

    // 2. Inject PopAds Script
    const popScript = document.createElement("script");
    popScript.src = "//c1.popads.net/pop.js"; 
    popScript.async = true;
    document.body.appendChild(popScript);

    // 3. Cleanup bech ma n-khalouch el scripts m3awdin
    return () => {
      if (document.body.contains(adsterraScript)) {
        document.body.removeChild(adsterraScript);
      }
      if (document.body.contains(popScript)) {
        document.body.removeChild(popScript);
      }
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
