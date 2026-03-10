import React, { useState, useEffect, useRef } from "react";
import { Carousel } from "primereact/carousel";
import { ProductService } from "./ProductService";
import "./explorejourneyData.css";

export default function ExploreJourney() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    ProductService.getProductsSmall().then((data) =>
      setProducts(data.slice(0, 34))
    );
  }, []);

  // Track active slide via carousel's onPageChange
  const onPageChange = (e: any) => {
    setActiveIndex(e.page);
  };

  const productTemplate = (product: any) => {
    return (
      <div className="bl-slide">
        {/* Image */}
        <div className="bl-slide-image-wrap">
          <img
            src={`/images/itemsExplore/${product.image}`}
            alt={product.name}
            className="bl-slide-image"
            loading="lazy"
          />
          {/* Dark overlay gradient */}
          <div className="bl-slide-overlay" />
        </div>
      </div>
    );
  };

  const totalSlides = products.length;

  return (
    <section className="bl-explore-section">
      {/* Background texture */}
      <div className="bl-explore-bg" />

      {/* ── Header ── */}
      <div className="bl-explore-header">
        <div className="bl-explore-badge">
          <span className="bl-explore-badge-line" />
          Our Journey
          <span className="bl-explore-badge-line" />
        </div>

        <h2 className="bl-explore-title">
          Backup Logistics <em>in Action</em>
        </h2>

        <p className="bl-explore-subtitle">
          A visual showcase of our operations across the logistics landscape —
          from dispatch to delivery, see how we move freight forward.
        </p>
      </div>

      {/* ── Carousel ── */}
      <div className="bl-explore-carousel-wrap">
        <Carousel
          ref={carouselRef}
          value={products}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={3500}
          itemTemplate={productTemplate}
          onPageChange={onPageChange}
          showIndicators={false}
          className="bl-explore-carousel"
        />

        {/* ── Progress Bar ── */}
        {totalSlides > 0 && (
          <div className="bl-explore-progress-wrap">
            <div className="bl-explore-progress-bar">
              <div
                className="bl-explore-progress-fill"
                style={{
                  width: `${((activeIndex + 1) / totalSlides) * 100}%`,
                }}
              />
            </div>
            <div className="bl-explore-progress-text">
              <span className="bl-explore-progress-current">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="bl-explore-progress-divider">/</span>
              <span className="bl-explore-progress-total">
                {String(totalSlides).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}

        {/* ── Floating Stats ── */}
        <div className="bl-explore-stats">
          <div className="bl-explore-stat">
            <span className="bl-explore-stat-number">500+</span>
            <span className="bl-explore-stat-label">Loads Delivered</span>
          </div>
          <div className="bl-explore-stat-divider" />
          <div className="bl-explore-stat">
            <span className="bl-explore-stat-number">48</span>
            <span className="bl-explore-stat-label">States Covered</span>
          </div>
          <div className="bl-explore-stat-divider" />
          <div className="bl-explore-stat">
            <span className="bl-explore-stat-number">24/7</span>
            <span className="bl-explore-stat-label">Dispatch Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
