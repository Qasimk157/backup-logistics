import React from "react";
import aboutus from "../images/aboutus.png";
import "./about.css";

const missionPoints = [
  {
    icon: "pi pi-bolt",
    title: "AI-Driven Efficiency",
    text: "Our mission at Backup Logistics is to revolutionize logistics with AI-driven efficiency and innovation.",
  },
  {
    icon: "pi pi-users",
    title: "Empowering Partners",
    text: "We aim to empower truck owners by enhancing transportation solutions for a better tomorrow.",
  },
  {
    icon: "pi pi-cog",
    title: "Cutting-Edge Technology",
    text: "Our commitment to cutting-edge technology and dedicated collaboration ensures that our partners achieve their fullest potential.",
  },
  {
    icon: "pi pi-heart",
    title: "Customer First",
    text: "We love our customers, so feel free to call us during normal business hours.",
  },
];

const About: React.FC = () => {
  return (
    <section className="bl-about-section">
      {/* Background effects */}
      <div className="bl-about-bg" />

      {/* ── Header ── */}
      <div className="bl-about-header">
        <div className="bl-about-badge">
          <span className="bl-about-badge-line" />
          Who We Are
          <span className="bl-about-badge-line" />
        </div>

        <h2 className="bl-about-title">
          About <em>Backup Logistics</em>
        </h2>

        <p className="bl-about-subtitle">
          Driven by innovation, powered by technology — delivering freight
          solutions that move America forward.
        </p>
      </div>

      {/* ── Content Grid ── */}
      <div className="bl-about-container">
        {/* Left: Mission Points */}
        <div className="bl-about-content">
          <div className="bl-about-mission-label">
            <i className="pi pi-flag" />
            Our Mission
          </div>

          <div className="bl-about-cards">
            {missionPoints.map((point, index) => (
              <div
                className="bl-about-card"
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bl-about-card-icon">
                  <i className={point.icon} />
                </div>
                <div className="bl-about-card-body">
                  <h4 className="bl-about-card-title">{point.title}</h4>
                  <p className="bl-about-card-text">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image + Stats */}
        <div className="bl-about-image-col">
          <div className="bl-about-image-wrap">
            <div className="bl-about-image-glow" />
            <img
              src={aboutus}
              alt="About Backup Logistics"
              className="bl-about-image"
            />

            {/* Experience badge */}
            <div className="bl-about-exp-badge">
              <span className="bl-about-exp-number">24/7</span>
              <span className="bl-about-exp-label">Dispatch<br />Support</span>
            </div>
          </div>

          {/* Stats row below image */}
          <div className="bl-about-stats">
            <div className="bl-about-stat">
              <span className="bl-about-stat-number">500+</span>
              <span className="bl-about-stat-label">Loads Moved</span>
            </div>
            <div className="bl-about-stat-divider" />
            <div className="bl-about-stat">
              <span className="bl-about-stat-number">48</span>
              <span className="bl-about-stat-label">States</span>
            </div>
            <div className="bl-about-stat-divider" />
            <div className="bl-about-stat">
              <span className="bl-about-stat-number">100%</span>
              <span className="bl-about-stat-label">Dedicated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
