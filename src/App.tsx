import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function TempoRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {import.meta.env.VITE_TEMPO && <TempoRoutes />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          {import.meta.env.VITE_TEMPO && (
            <Route path="/tempobook/*" element={<div />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
