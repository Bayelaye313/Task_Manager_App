import React from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { UserContextProvider, useUserContext } from "./context/UserContext";

// Import des composants
import App from "./App.jsx";
import ResgisterPage from "./layouts/ResgisterPage";
import LoginPage from "./layouts/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import PageEmailverif from "./components/verify-email/[verificationToken]/verifEmailPage";
import ForgotPassword from "./layouts/ForgotPassword";
import ResetPassword from "./components/reset-password/[resetToken]/resetPassword";
import PendingTask from "./layouts/PendingTask";
import CompletedTask from "./layouts/CompletedTask";
import OverdueTask from "./layouts/OverdueTask";

// Route privée
const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  return user && user.email ? children : <Navigate to="/login" />;
};

// Gestion des routes
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserContextProvider>
        <Routes>
          {/* Wrapper principal */}
          <Route path="/" element={<App />}>
            {/* Routes publiques */}
            <Route path="/register" element={<ResgisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pending" element={<PendingTask />} />
            <Route path="/completed" element={<CompletedTask />} />
            <Route path="/overdue" element={<OverdueTask />} />

            <Route
              path="/verify-email/:verificationToken"
              element={<PageEmailverif />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />

            {/* Routes privées */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster />
      </UserContextProvider>
    </Router>
  </StrictMode>
);
