import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import LoadingPage from "./pages/Loading/Loading"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useAuth } from "./context/AuthContext";

// A "Gatekeeper" component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingPage />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 2. Home Page */}
        <Route
          path="/profiles"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:profileId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/profiles" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
