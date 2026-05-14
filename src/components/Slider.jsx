import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    title: "New Season Arrivals",
    subtitle: "Discover the latest trends in fashion & lifestyle",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    title: "Exclusive Deals",
    subtitle: "Up to 50% off on selected items this week",
    cta: "Explore Deals",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    title: "Premium Collection",
    subtitle: "Handpicked products for the finest taste",
    cta: "View Collection",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    setCurrent(index);
  };

  const slide = slides[current];

  return (
    <div style={styles.wrapper}>
      {/* Image */}
      <div style={styles.imageWrapper}>
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          style={{
            ...styles.image,
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(1.03)" : "scale(1)",
          }}
        />
        {/* Overlay */}
        <div style={styles.overlay} />
      </div>

      {/* Content */}
      <div
        style={{
          ...styles.content,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(16px)" : "translateY(0)",
        }}
      >
        <p style={styles.badge}>✦ Featured Collection</p>
        <h2 style={styles.title}>{slide.title}</h2>
        <p style={styles.subtitle}>{slide.subtitle}</p>
        <button
          style={styles.btn}
          onClick={() => window.location.href = "/products"}
        >
          {slide.cta}
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div style={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              ...styles.dot,
              ...(i === current ? styles.dotActive : {}),
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        style={{ ...styles.arrow, left: "16px" }}
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        aria-label="Previous"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        style={{ ...styles.arrow, right: "16px" }}
        onClick={() => goTo((current + 1) % slides.length)}
        aria-label="Next"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "480px",
    overflow: "hidden",
    borderRadius: "0 0 24px 24px",
  },
  imageWrapper: {
    position: "absolute",
    inset: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(91,33,182,0.75) 0%, rgba(0,0,0,0.2) 100%)",
  },
  content: {
    position: "absolute",
    bottom: "80px",
    left: "48px",
    maxWidth: "480px",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  },
  badge: {
    fontSize: "12px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "700",
    color: "white",
    lineHeight: "1.2",
    marginBottom: "12px",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "white",
    color: "var(--primary)",
    border: "none",
    padding: "14px 28px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  dots: {
    position: "absolute",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.4)",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.3s",
  },
  dotActive: {
    width: "24px",
    borderRadius: "4px",
    background: "white",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};