import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ContractInteract from "./components/admin/ContractInteract";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Admin } from "./components/admin/Admin";
import { initGA } from "./lib/googleAnalytics";

const queryClient = new QueryClient();

initGA();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/interact" element={<ContractInteract />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/:contractAddress" element={<App />} />
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </SnackbarProvider>,
);
