import React, { useState } from "react";
import "./servicesData.css";

// ═══════════════════════════════════════════
// SERVICE DATA — Update image paths to your actual images
// Place images in: src/images/services/
// ═══════════════════════════════════════════
interface Service {
  title: string;
  description: string;
  icon: string;       // PrimeIcon class (fallback if no image)
  image?: string;     // Optional: path to image file
}

interface ServiceCategory {
  category: string;
  tagline: string;
  icon: string;
  services: Service[];
}

const serviceData: ServiceCategory[] = [
  {
    category: "Long Haul",
    tagline: "Cross-country freight transportation with reliability and precision",
    icon: "pi pi-map",
    services: [
      {
        title: "Hot Shot / Flatbed",
        description:
          "Time-critical flatbed freight delivery for oversized, heavy, or urgent loads across the country. Fast dispatch, dedicated drivers.",
        icon: "pi pi-bolt",
        // image: require("../images/services/hotshot.webp"),  // ← Uncomment when image is ready
      },
      {
        title: "Straight Van",
        description:
          "Enclosed straight van transport for protected, weather-safe delivery of dry goods, electronics, and packaged freight.",
        icon: "pi pi-box",
        // image: require("../images/services/straightvan.jpg"),
      },
      {
        title: "Auto Carrier",
        description:
          "Specialized vehicle transport on open or enclosed auto carriers. Safe pickup and delivery for cars, trucks, and fleet vehicles.",
        icon: "pi pi-car",
        // image: require("../images/services/autocarrier.jpg"),
      },
    ],
  },
  {
    category: "Final Mile",
    tagline: "Last-mile delivery solutions with care, precision, and customer satisfaction",
    icon: "pi pi-home",
    services: [
      {
        title: "Blanket Wrap Delivery",
        description:
          "Protective blanket-wrapped transport for furniture, fixtures, and fragile items. Damage-free guaranteed delivery to your door.",
        icon: "pi pi-shield",
        // image: require("../images/services/blanketwrap.jpg"),
      },
      {
        title: "Room Of Choice Delivery",
        description:
          "We deliver and place items in your preferred room — not just the doorstep. Professional, courteous in-home service.",
        icon: "pi pi-building",
        // image: require("../images/services/roomofchoice.jpg"),
      },
      {
        title: "White Glove Delivery",
        description:
          "Premium full-service delivery with unpacking, assembly, and placement. The highest standard of care for your shipments.",
        icon: "pi pi-star",
        // image: require("../images/services/whiteglove.jpg"),
      },
      {
        title: "Furniture Delivery",
        description:
          "Dedicated furniture logistics from warehouse to home. Careful handling, on-time delivery, and optional assembly services.",
        icon: "pi pi-inbox",
        // image: require("../images/services/furniture.jpg"),
      },
      {
        title: "Curb Side Delivery",
        description:
          "Efficient curbside drop-off for large items. Perfect for commercial deliveries, retail orders, and bulk shipments.",
        icon: "pi pi-truck",
        // image: require("../images/services/curbside.jpg"),
      },
      {
        title: "Appliances Delivery",
        description:
          "Safe transport and delivery of household appliances — washers, dryers, refrigerators, and more. Handling with care.",
        icon: "pi pi-cog",
        // image: require("../images/services/appliances.jpg"),
      },
    ],
  },
];

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="bl-services-section">
      <div className="bl-services-bg" />

      {/* ── Header ── */}
      <div className="bl-services-header">
        <div className="bl-services-badge">
          <span className="bl-services-badge-line" />
          What We Do
          <span className="bl-services-badge-line" />
        </div>

        <h2 className="bl-services-title">
          Our <em>Services</em>
        </h2>

        <p className="bl-services-subtitle">
          From coast-to-coast long haul freight to white glove final mile delivery
          — we handle every step of your logistics chain.
        </p>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bl-services-tabs">
        {serviceData.map((cat, index) => (
          <button
            key={index}
            className={`bl-services-tab ${activeCategory === index ? "bl-services-tab-active" : ""}`}
            onClick={() => setActiveCategory(index)}
          >
            <i className={cat.icon} />
            <span>{cat.category}</span>
          </button>
        ))}
      </div>

      {/* ── Category Tagline ── */}
      <p className="bl-services-cat-tagline">
        {serviceData[activeCategory].tagline}
      </p>

      {/* ── Service Cards Grid ── */}
      <div className="bl-services-grid">
        {serviceData[activeCategory].services.map((service, index) => (
          <div
            className="bl-service-card"
            key={`${activeCategory}-${index}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {/* Image or Icon Placeholder */}
            <div className="bl-service-card-visual">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="bl-service-card-img"
                />
              ) : (
                <div className="bl-service-card-icon-placeholder">
                  <i className={service.icon} />
                </div>
              )}
              {/* Category badge on card */}
              <div className="bl-service-card-badge">
                {serviceData[activeCategory].category}
              </div>
            </div>

            {/* Content */}
            <div className="bl-service-card-content">
              <h4 className="bl-service-card-title">{service.title}</h4>
              <p className="bl-service-card-desc">{service.description}</p>
            </div>

            {/* Bottom accent line */}
            <div className="bl-service-card-accent" />
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bl-services-cta">
        <p className="bl-services-cta-text">
          Need a custom logistics solution?
        </p>
        <a href="tel:6099004245" className="bl-services-cta-btn">
          <i className="pi pi-phone" />
          Call (609) 900-4245
        </a>
      </div>
    </section>
  );
};

export default Services;
