import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.blobTop} />
      <div style={styles.blobBottom} />

      <div style={styles.container}>
        <div style={styles.left}>
          <span style={styles.badge}>✦ New Collection 2026</span>
          <h1 style={styles.title}>
            Discover Your
            <span style={styles.titleAccent}> Perfect Style</span>
          </h1>
          <p style={styles.desc}>
            Explore thousands of premium products curated just for you.
            Quality, style, and affordability — all in one place.
          </p>
          <div style={styles.actions}>
            <Button onClick={() => navigate("/products")} variant="primary" fullWidth={false}>
              Shop Now
            </Button>
            <Button onClick={() => navigate("/products")} variant="secondary" fullWidth={false}>
              View All Products
            </Button>
          </div>

          <div style={styles.stats}>
            {[
              { value: "10K+", label: "Products" },
              { value: "5K+", label: "Customers" },
              { value: "4.9", label: "Rating" },
            ].map((s) => (
              <div key={s.label} style={styles.stat}>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.imageCard}>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
              alt="Fashion"
              style={styles.heroImage}
            />
            <div style={styles.floatingCard}>
              <div style={styles.floatingIcon}>
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p style={styles.floatingTitle}>Free Delivery</p>
                <p style={styles.floatingSubtitle}>On orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    overflow: "hidden",
    padding: "64px 32px",
    background: "var(--background)",
  },
  blobTop: {
    position: "absolute",
    top: "-80px",
    right: "-80px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(124,58,237,0.08)",
    zIndex: 0,
  },
  blobBottom: {
    position: "absolute",
    bottom: "-60px",
    left: "-60px",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background: "rgba(168,85,247,0.07)",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "64px",
    flexWrap: "wrap",
  },
  left: {
    flex: 1,
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  badge: {
    display: "inline-block",
    background: "rgba(124,58,237,0.1)",
    color: "var(--primary)",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    padding: "6px 14px",
    borderRadius: "20px",
    width: "fit-content",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    lineHeight: "1.15",
    color: "var(--text-primary)",
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
  },
  titleAccent: {
    color: "var(--primary)",
    display: "block",
  },
  desc: {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    maxWidth: "420px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  stats: {
    display: "flex",
    gap: "32px",
    paddingTop: "8px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--primary)",
    fontFamily: "'Poppins', sans-serif",
  },
  statLabel: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  right: {
    flex: 1,
    minWidth: "280px",
    display: "flex",
    justifyContent: "center",
  },
  imageCard: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
  },
  heroImage: {
    width: "100%",
    height: "420px",
    objectFit: "cover",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(124,58,237,0.2)",
  },
  floatingCard: {
    position: "absolute",
    bottom: "24px",
    left: "-20px",
    background: "white",
    borderRadius: "16px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
  floatingIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  floatingTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  floatingSubtitle: {
    fontSize: "11px",
    color: "var(--text-secondary)",
    margin: 0,
  },
};