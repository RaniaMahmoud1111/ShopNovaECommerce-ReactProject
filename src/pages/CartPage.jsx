import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    clearCart();
    navigate("/order-shipped");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>My Cart</h1>

        {items.length === 0 ? (
          <div style={styles.empty}>
            <svg width="64" height="64" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p style={styles.emptyText}>Your cart is empty</p>
            <button style={styles.shopBtn} onClick={() => navigate("/products")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={styles.content}>
            {/* Items */}
            <div style={styles.itemsList}>
              {items.map(item => (
                <div key={item.id} style={styles.card}>
                  <img
                    src={item.thumbnail || item.image}
                    alt={item.title}
                    style={styles.itemImage}
                    onError={e => e.target.src = "https://via.placeholder.com/80"}
                  />
                  <div style={styles.itemInfo}>
                    <p style={styles.itemTitle}>{item.title}</p>
                    <p style={styles.itemPrice}>${item.price}</p>
                  </div>
                  <div style={styles.qtyRow}>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>${totalPrice.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Shipping</span>
                <span style={{ ...styles.summaryValue, color: "var(--success)" }}>Free</span>
              </div>
              <div style={styles.divider} />
              <div style={styles.summaryRow}>
                <span style={{ ...styles.summaryLabel, fontWeight: "700", color: "var(--text-primary)" }}>Total</span>
                <span style={{ ...styles.summaryValue, fontSize: "20px", fontWeight: "700", color: "var(--primary)" }}>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                style={styles.buyBtn}
                onClick={handleBuyNow}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
              >
                Buy Now
              </button>
              <button style={styles.continueBtn} onClick={() => navigate("/products")}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 32px", flex: 1, width: "100%" },
  title: { fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "32px", fontFamily: "'Poppins', sans-serif" },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "80px 0" },
  emptyText: { fontSize: "18px", color: "var(--text-secondary)", fontWeight: "500" },
  shopBtn: { background: "linear-gradient(90deg, var(--primary), var(--primary-light))", color: "white", border: "none", padding: "12px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  content: { display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" },
  itemsList: { flex: 2, minWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" },
  card: { background: "var(--surface)", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 2px 12px rgba(124,58,237,0.07)" },
  itemImage: { width: "72px", height: "72px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" },
  itemPrice: { fontSize: "13px", color: "var(--text-secondary)" },
  qtyRow: { display: "flex", alignItems: "center", gap: "8px" },
  qtyBtn: { width: "28px", height: "28px", borderRadius: "8px", border: "1.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)" },
  qty: { fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", minWidth: "20px", textAlign: "center" },
  itemTotal: { fontSize: "15px", fontWeight: "700", color: "var(--primary)", minWidth: "60px", textAlign: "right" },
  removeBtn: { background: "transparent", border: "none", cursor: "pointer", color: "var(--danger)", padding: "4px" },
  summary: { flex: 1, minWidth: "260px", background: "var(--surface)", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(124,58,237,0.07)", position: "sticky", top: "88px" },
  summaryTitle: { fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px" },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  summaryLabel: { fontSize: "14px", color: "var(--text-secondary)" },
  summaryValue: { fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" },
  divider: { height: "1px", background: "var(--border)", margin: "16px 0" },
  buyBtn: { width: "100%", background: "linear-gradient(90deg, var(--primary), var(--primary-light))", color: "white", border: "none", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", cursor: "pointer", marginTop: "20px", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" },
  continueBtn: { width: "100%", background: "transparent", color: "var(--primary)", border: "2px solid var(--primary)", padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
};