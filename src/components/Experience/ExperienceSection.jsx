import Card from "react-bootstrap/Card";
import "./ExperienceSection.css";
import { renderFormattedText } from "../../utils/renderFormattedText";

const ExperienceSection = ({ experience }) => {
  const {
    companyName,
    location,
    startDate,
    endDate,
    roleTitle,
    description,
    highlights,
    technologies,
    methodology,
  } = experience;

  return (
    <section
      className="experience-section-shell"
      aria-labelledby="experience-title"
    >
      <Card className="experience-card">
        
        <div className="experience-card-date-badge">
          <span>
            🗓️ {startDate} - {endDate ? endDate.toUpperCase() : "PRESENT"}
          </span>
        </div>

        <Card.Body className="experience-card-body">
          <div className="experience-header">
            <div className="company-info">
              <div className="company-location">🏢 {companyName}</div>
              <p className="location">- {location}</p>
            </div>

            <div className="experience-badges">
              <div className="custom-badge methodology-badge-color">
                {methodology}
              </div>

              <div className="custom-badge role-badge-color">
                🧠 {roleTitle}
              </div>
            </div>
          </div>

          {description && (
            <section
              className="project-description"
              aria-label="job description"
            >
              <h3 className="profile-group-title">Description</h3>
              <p>{renderFormattedText(description)}</p>
            </section>
          )}

          {highlights && (
            <section
              className="project-highlights"
              aria-label="highlights-heading"
            >
              <h3 className="profile-group-title">Project Highlights</h3>
              <p>{renderFormattedText(highlights)}</p>
            </section>
          )}


          {technologies.length > 0 && (
            <section className="project-technologies" aria-label="tech-heading">
              <h3 id="tech-heading" className="profile-group-title">
                Project Technologies
              </h3>

              {technologies.map((tech, index) => (
                <div
                  className="custom-badge technology-badge-color"
                  key={`${tech}-${index}`}
                >
                  {tech}
                </div>
              ))}
            </section>
          )}
        </Card.Body>
      </Card>
    </section>
  );
};

export default ExperienceSection;
