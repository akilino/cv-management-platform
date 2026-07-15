import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { loginRequest } from "../../api/services/auth"
import LoginForm from "../../components/Login/LoginForm";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  if (user) {
    return <Navigate to="/profiles" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await loginRequest(email, password);

      setUser(res.data);

      navigate("/profiles");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.error || "Invalid credentials.");
      } else {
        setError("Server is unreachable. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Login;
