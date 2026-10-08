import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "./components/ui/toast";
import { AppointmentPage } from "./pages/appointment";
import { AppointmentHistoryPage } from "./pages/appointment-history";
import { BarbersPage } from "./pages/barbers";
import { DashboardPage } from "./pages/dashboard";
import { ThemeProvider } from "./providers/theme-provider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<BarbersPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/history" element={<AppointmentHistoryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </QueryClientProvider>
      </NuqsAdapter>
    </ThemeProvider>
  </StrictMode>,
);
