import { useState } from "react";
import { Button } from "../../components/common/Button/Button";
import { userService } from "../../api/services/userService";
import './Home.css'

/**
 * Home Page View
 * This serves as the main entry landing view template
 */
export const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await userService.getProfile();
      setUser(data);
    } catch (err) {
      console.error("Failed to mock-fetch user data profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>Welcome to your New Project Starter</h1>
        <p>
          Edit <code>src/pages/Home/Home.jsx</code> to begin customizing this
          dashboard.
        </p>
      </header>

      <section className="home-content">
        <Button onClick={fetchUserData} disabled={loading}>
            {loading ? 'Fetching Profile...':'Test API Connection'}
        </Button>

        {user && (
            <div className="user-card">
                <h3>Connected as: {user.name}</h3>
            </div>
        )}
      </section>
    </main>
  );
};
