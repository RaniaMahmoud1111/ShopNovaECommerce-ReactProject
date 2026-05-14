import { useNavigate } from "react-router-dom";

export default function OrderShippedPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={styles.blobTop} />
      <div style={styles.blobBottom} />

      <div style={styles.card}>
        {/* Success icon */}
        <div style={styles.iconWrapper}>
          <svg width="48" height="48" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <h1 style={styles.title}>Order Shipped!</h1>
        <p style={styles.subtitle}>
          Your order has been placed successfully and is on its way to you.
        </p>

        {/* Tracking steps */}
        <div style={styles.stepsWrapper}>
          {[
            { label: "Order Placed", done: true },
            { label: "Processing", done: true },
            { label: "Shipped", done: true },
            { label: "Delivered", done: false },
          ].map((step, i, arr) => (
            <div key={i} style={styles.stepItem}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                {i !== 0 && (
                  <div style={{
                    ...styles.line,
                    background: step.done ? "var(--primary)" : "var(--border)"
                  }} />
                )}
                <div style={{
                  ...styles.stepDot,
                  background: step.done ? "var(--primary)" : "var(--border)",
                  boxShadow: step.done ? "0 0 0 4px rgba(124,58,237,0.15)" : "none"
                }}>
                  {step.done ? (
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  ) : (
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white" }} />
                  )}
                </div>
              </div>
              <span style={{
                ...styles.stepLabel,
                color: step.done ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: step.done ? "600" : "400"
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div style={styles.infoBox}>
          <svg width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path strokeLinecap="round" d="M12 8v4M12 16h.01"/>
          </svg>
          <p style={styles.infoText}>
            You will receive a confirmation email shortly. Estimated delivery: <strong>3-5 business days</strong>
          </p>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/products")}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Continue Shopping
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/")}
            onMouseEnter={e => e.target.style.background = "rgba(124,58,237,0.06)"}
            onMouseLeave={e => e.target.style.background = "transparent"}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--background)",
    padding: "32px",
    position: "relative",
    overflow: "hidden",
  },
  blobTop: {
    position: "absolute",
    top: "-100px",
    right: "-100px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(124,58,237,0.08)",
    zIndex: 0,
  },
  blobBottom: {
    position: "absolute",
    bottom: "-100px",
    left: "-100px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(168,85,247,0.07)",
    zIndex: 0,
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "var(--surface)",
    borderRadius: "24px",
    padding: "48px 40px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 40px rgba(124,58,237,0.12)",
  },
  iconWrapper: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "12px",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    marginBottom: "36px",
  },
  stepsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    padding: "0 8px",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    flex: 1,
  },
  line: {
    position: "absolute",
    right: "100%",
    width: "100%",
    height: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  stepDot: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    position: "relative",
    zIndex: 1,
  },
  stepLabel: {
    fontSize: "11px",
    textAlign: "center",
    lineHeight: "1.3",
  },
  infoBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    background: "rgba(124,58,237,0.06)",
    borderRadius: "12px",
    padding: "14px 16px",
    marginBottom: "28px",
    textAlign: "left",
  },
  infoText: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
    margin: 0,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  primaryBtn: {
    background: "linear-gradient(90deg, var(--primary), var(--primary-light))",
    color: "white",
    border: "none",
    padding: "14px 28px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
  },
  secondaryBtn: {
    background: "transparent",
    color: "var(--primary)",
    border: "2px solid var(--primary)",
    padding: "12px 28px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};