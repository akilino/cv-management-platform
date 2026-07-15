import { useEffect, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfilePreview from "../../components/Profile/ProfilePreview";
import ProfileSection from "../../components/Profile/ProfileSection";
import {
  getProfileForAdmin,
  getProfilesPreviewForAdmin,
} from "../../api/services/profiles";
import LoadingPage from "../Loading/Loading";
import "./Dashboard.css";

/**
 * Dashboard Page View
 * Lists profile previews for admin users.
 */
export const Dashboard = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProfilesPreviewForAdmin();
      setProfiles(response.data?.data?.profilesForAdmin || []);
    } catch (err) {
      console.error("Failed to get profiles:", err);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const openProfile = async (profile) => {
    setProfileError("");
    setSelectedProfile(null);
    setProfileLoading(true);

    try {
      const response = await getProfileForAdmin(profile.id);
      setSelectedProfile(response.data?.data?.profileForAdmin || response.data);
    } catch (err) {
      console.error("Failed to get profile:", err);
      setProfileError("Unable to load this profile. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  const closeProfile = () => {
    setSelectedProfile(null);
    setProfileError("");
    setProfileLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching, setState runs after await
    fetchProfiles();
  }, [fetchProfiles]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container className="dashboard-page">
      <div className="dashboard-header">
        <h1>Profiles</h1>
      </div>

      <div className="profile-preview-grid">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfilePreview
              key={profile.id}
              profile={profile}
              onSelect={openProfile}
            />
          ))
        ) : (
          <p>No profile data available</p>
        )}
      </div>

      {(profileLoading || selectedProfile || profileError) && (
        <div
          className="dashboard-profile-overlay"
          role="presentation"
          onClick={closeProfile}
        >
          <div
            className="dashboard-profile-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Profile details"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard-profile-modal-header">
              <h2>Profile details</h2>
              <div className="dashboard-profile-modal-actions">
                {selectedProfile?.id && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/profile/${selectedProfile.id}`)}
                  >
                    Expand
                  </Button>
                )}
                <Button variant="outline-secondary" size="sm" onClick={closeProfile}>
                  Close
                </Button>
              </div>
            </div>

            {profileLoading && <p className="dashboard-profile-state">Loading profile...</p>}
            {profileError && <p className="dashboard-profile-error">{profileError}</p>}
            {selectedProfile && <ProfileSection profile={selectedProfile} />}
          </div>
        </div>
      )}
    </Container>
  );
};
