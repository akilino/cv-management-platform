import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./ProfileSection.css";
import { renderFormattedText } from "../../utils/renderFormattedText";
import { GravatarAvatar } from "../../utils/gravatar";

const formatProfileDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getUTCDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10
  ];
  const monthYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return `${day}${suffix} ${monthYear}`;
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const DetailItem = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="profile-detail">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
};

const ProfileSection = ({ profile }) => {
  const {
    aboutMe,
    birthDate,
    email,
    fullName,
    gender,
    homeAddress,
    nationality,
    phoneNumber,
    profilePictureUrl,
    showEmail,
    showHomeAddress,
    showPhone,
  } = profile;

  const initials = getInitials(fullName);

  return (
    <section className="profile-section-shell" aria-labelledby="profile-title">
      <Card className="profile-card">
        <Card.Body className="profile-card-body">
          <Row className="g-4 align-items-start">
            <Col xs={12} md="auto">
              {profilePictureUrl ? (
                <GravatarAvatar email={email} />
              ) : (
                <div className="profile-avatar profile-avatar-fallback">
                  {initials || "CV"}
                </div>
              )}
            </Col>

            <Col xs={12} md>
              <div className="profile-header">
                <p className="profile-eyebrow">Profile overview</p>
                <h2 id="profile-title">{fullName || "Unnamed profile"}</h2>
              </div>

              <Row className="g-4">
                <Col xs={12} lg={6}>
                  <h3 className="profile-group-title">Personal</h3>
                  <dl className="profile-detail-grid">
                    <DetailItem
                      label="Birth date"
                      value={formatProfileDate(birthDate)}
                    />
                    <DetailItem label="Nationality" value={nationality} />
                    <DetailItem label="Gender" value={gender} />
                  </dl>
                </Col>

                <Col xs={12} lg={6}>
                  <h3 className="profile-group-title">Contact</h3>
                  <dl className="profile-detail-grid">
                    <DetailItem
                      label="Email"
                      value={showEmail ? email : null}
                    />
                    <DetailItem
                      label="Phone"
                      value={showPhone ? phoneNumber : null}
                    />
                    <DetailItem
                      label="Address"
                      value={showHomeAddress ? homeAddress : null}
                    />
                  </dl>
                </Col>
              </Row>
            </Col>
          </Row>

          {aboutMe && (
            <section className="profile-about" aria-label="About me">
              <h3 className="profile-group-title">About Me</h3>
              <p>{renderFormattedText(aboutMe)}</p>
            </section>
          )}
        </Card.Body>
      </Card>
    </section>
  );
};

export default ProfileSection;
