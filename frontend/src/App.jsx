import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserContextProvider, useUserContext } from "./context/UserContext";
import ResgisterPage from "./layouts/ResgisterPage";
import LoginPage from "./layouts/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import PageEmailverif from "./components/verify-email/[verificationToken]/verifEmailPage";
import ForgotPassword from "./layouts/ForgotPassword";
import ResetPassword from "./components/reset-password/[resetToken]/resetPassword";

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  return user && user.email ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/register" element={<ResgisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/verify-email/:verificationToken"
            element={<PageEmailverif />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
