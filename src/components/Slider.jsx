import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1681488216686-b20dbbf421a8?w=1600&auto=format&fit=crop&q=80",
    title: "Smart Shopping Experience",
    subtitle: "Discover premium products curated for your everyday needs.",
    cta: "Shop Now",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1600&auto=format&fit=crop&q=80",
    title: "Curated Product Collection",
    subtitle: "Explore carefully selected items across multiple categories.",
    cta: "Explore Now",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80",
    title: "Premium Accessories",
    subtitle: "High-quality essentials designed for everyday use.",
    cta: "View Collection",
  },

  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop&q=80",
    title: "Modern Home Collection",
    subtitle: "Elegant furniture and decor for a comfortable living space.",
    cta: "Shop Home",
  },

  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&auto=format&fit=crop&q=80",
    title: "Capture Every Moment",
    subtitle: "Professional cameras and gear for perfect photography.",
    cta: "Explore Cameras",
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
    height: "560px",
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
  objectPosition: "center",
  transition: "opacity 0.7s ease, transform 1.2s ease",
},
overlay: {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg, rgba(17,24,39,0.62) 0%, rgba(88,28,135,0.35) 45%, rgba(0,0,0,0.12) 100%)",
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
  fontSize: "48px",
  fontWeight: "800",
  color: "white",
  lineHeight: "1.1",
  marginBottom: "14px",
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
  color: "#6D28D9",
  border: "none",
  padding: "15px 30px",
  borderRadius: "16px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
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