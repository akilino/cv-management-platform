import Card from "react-bootstrap/Card";
import "./ProfilePreview.css";
import { GravatarAvatar } from "../../utils/gravatar";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const ProfilePreview = ({ onSelect, profile }) => {
  const {
    email,
    fullName,
    nationality,
    profilePictureUrl,
    roleTitle,
    showEmail,
  } = profile;

  const initials = getInitials(fullName);
  const title = fullName || "Unnamed profile";

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(profile);
    }
  };

  return (
    <Card
      className="profile-preview-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(profile)}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${title} profile`}
    >
      <Card.Body className="profile-preview-body">
        {profilePictureUrl ? (
          <GravatarAvatar email={email} />
        ) : (
          <div className="profile-preview-avatar profile-preview-avatar-fallback">
            {initials || "CV"}
          </div>
        )}

        <div className="profile-preview-content">
          <h2>{title}</h2>

          <div className="profile-preview-meta">
            {nationality && <span>{nationality}</span>}
            {showEmail && email && <span>{email}</span>}
          </div>

          {roleTitle && (
            <p className="profile-preview-role">
              {roleTitle}
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProfilePreview;
