import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"; // Adicionado Outlet

import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toast";
import { FloatingWhatsApp } from "./components/whatsapp-floating-icon";
import { AppointmentPage } from "./pages/appointment";
import { AppointmentHistoryPage } from "./pages/appointment-history";
import { AppointmentsDashboard } from "./pages/appointments-dashboard";
import { BarbersPage } from "./pages/barbers";
import { DashboardPage } from "./pages/dashboard";
import { ThemeProvider } from "./providers/theme-provider";

const queryClient = new QueryClient();

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

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

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route
                  path="appointments"
                  element={<AppointmentsDashboard />}
                />
              </Route>
            </Routes>
            <FloatingWhatsApp />
            <Toaster />
          </BrowserRouter>
        </QueryClientProvider>
      </NuqsAdapter>
    </ThemeProvider>
  </StrictMode>,
);
