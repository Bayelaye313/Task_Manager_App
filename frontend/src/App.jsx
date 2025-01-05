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
