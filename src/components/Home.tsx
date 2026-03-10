import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import homePage from "../images/taxslips-home-img.png";
import "./home.css";

const Home: React.FC = () => {
  return (
    <section className="bl-hero-section">
      {/* Background effects */}
      <div className="bl-hero-bg" />
      <div className="bl-hero-grid-lines" />

      <div className="bl-hero-container">
        {/* ── LEFT: Text Content ── */}
        <div className="bl-hero-content">
          <div className="bl-hero-badge">
            <span className="bl-hero-badge-dot" />
            Freight Logistics &amp;  Transportation
          </div>

          <h1 className="bl-hero-title">
            Revolutionizing Logistics with{" "}
            <em>AI-Driven</em> Efficiency
          </h1>

          <p className="bl-hero-subtitle">
            Streamline your freight operations with intelligent dispatch,
            real-time tracking, and seamless carrier coordination — all powered
            by cutting-edge technology.
          </p>

          <div className="bl-hero-actions">
            <Link
              to="https://backup-logistics.vercel.app/#/create-an-account"
              className="bl-hero-btn-primary"
            >
              <span>Get Started</span>
              <i className="pi pi-arrow-right" />
            </Link>

            <a href="#contact" className="bl-hero-btn-secondary">
              <i className="pi pi-phone" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="bl-hero-trust">
            <div className="bl-hero-trust-item">
              <i className="pi pi-verified bl-hero-trust-icon" />
              <span>Licensed &amp; Insured</span>
            </div>
            <div className="bl-hero-trust-divider" />
            <div className="bl-hero-trust-item">
              <i className="pi pi-map-marker bl-hero-trust-icon" />
              <span>Houston, TX</span>
            </div>
            <div className="bl-hero-trust-divider" />
            <div className="bl-hero-trust-item">
              <i className="pi pi-clock bl-hero-trust-icon" />
              <span>24/7 Dispatch</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div className="bl-hero-image-col">
          <div className="bl-hero-image-wrap">
            {/* Decorative glow behind image */}
            <div className="bl-hero-image-glow" />
            <img
              src={homePage}
              alt="Backup Logistics Dashboard"
              className="bl-hero-image"
            />
            {/* Floating stat card */}
            <div className="bl-hero-float-card">
              <div className="bl-hero-float-icon">
                <i className="pi pi-truck" />
              </div>
              <div className="bl-hero-float-text">
                <span className="bl-hero-float-number">500+</span>
                <span className="bl-hero-float-label">Loads Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="bl-hero-bottom-fade" />
    </section>
  );
};

export default Home;
