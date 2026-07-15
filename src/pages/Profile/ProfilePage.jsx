import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import ProfileSection from "../../components/Profile/ProfileSection";
import { getProfileForAdmin } from "../../api/services/profiles";
import { getExperiencesByUserId } from "../../api/services/experiences";
import { getUserIdFromToken } from "../../utils/authToken";
import LoadingPage from "../Loading/Loading";
import "./ProfilePage.css";
import ExperienceSection from "../../components/Experience/ExperienceSection";

export const ProfilePage = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    const response = await getProfileForAdmin(profileId);
    setProfile(response.data?.data?.profileForAdmin || response.data);
  }, [profileId]);

  const fetchExperiences = useCallback(async () => {
    const userId = getUserIdFromToken();
    console.log("User ID from JWT:", userId);

    if (!userId) {
      setExperiences([]);
      return;
    }

    const response = await getExperiencesByUserId(userId);
    setExperiences(response.data?.data?.experiencesByUserId || []);
  }, []);

  useEffect(() => {
    const fetchProfilePageData = async () => {
      setLoading(true);
      setError("");

      try {
        await Promise.all([fetchProfile(), fetchExperiences()]);
      } catch (err) {
        console.error("Failed to load profile page data:", err);
        setProfile(null);
        setExperiences([]);
        setError("Unable to load this profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePageData();
  }, [fetchProfile, fetchExperiences]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container className="profile-page">
      <div className="profile-page-header">
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/profiles")}
        >
          Back to profiles
        </Button>
      </div>

      {error && <p className="profile-page-error">{error}</p>}
      {profile && <ProfileSection profile={profile} />}

      <h2>Work experience</h2>

      {experiences.length > 0 && (
        <section className="profile-page-experiences">
          {experiences.map((experience) => (
            <ExperienceSection
              key={experience.id || experience.companyName}
              experience={experience}
            />
          ))}
        </section>
      )}
    </Container>
  );
};
