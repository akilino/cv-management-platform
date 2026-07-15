import { Form, Button, Alert, Card } from "react-bootstrap";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
  isSubmitting,
}) => {
  return (
    <Card
      className="shadow-sm border-0"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <Card.Body className="p-4">
        <Card.Title className="text-center h3 mb-4">
          <h1>CV Management Platform</h1>
        </Card.Title>

        {/* Bootstrap Alert for errors */}
        {error && (
          <Alert variant="danger" className="py-2 text-center">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
