import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.header}>
          <h2 style={styles.title}>Featured Products</h2>
        </div>
        <div style={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={styles.skeleton} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <span style={styles.badge}>✦ Hand Picked</span>
          <h2 style={styles.title}>Featured Products</h2>
          <p style={styles.subtitle}>Our most popular picks just for you</p>
        </div>
        <button
          style={styles.viewAllBtn}
          onClick={() => navigate("/products")}
          onMouseEnter={e => { e.target.style.background = "var(--primary)"; e.target.style.color = "white"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--primary)"; }}
        >
          View All →
        </button>
      </div>

      <div style={styles.grid}>
        {products.map(product => (
          <div
            key={product.id}
            style={styles.card}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            {/* Discount badge */}
            {product.discountPercentage > 0 && (
              <div style={styles.discountBadge}>
                -{Math.round(product.discountPercentage)}%
              </div>
            )}

            {/* Image */}
            <div
              style={styles.imageWrapper}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={styles.image}
                onError={e => e.target.src = "https://via.placeholder.com/300"}
              />
            </div>

            {/* Info */}
            <div style={styles.info}>
              <p style={styles.category}>{product.category}</p>
              <h3
                style={styles.productTitle}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.title}
              </h3>

              {/* Rating */}
              <div style={styles.ratingRow}>
                <span style={styles.star}>★</span>
                <span style={styles.ratingText}>{product.rating}</span>
              </div>

              {/* Price + Add to cart */}
              <div style={styles.bottom}>
                <span style={styles.price}>${product.price}</span>
                <button
                  style={styles.addBtn}
                  onClick={() => addToCart(product)}
                  onMouseEnter={e => e.target.style.background = "var(--primary-dark)"}
                  onMouseLeave={e => e.target.style.background = "var(--primary)"}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "64px 32px",
    background: "var(--background)",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "16px",
  },
  badge: {
    display: "inline-block",
    background: "rgba(124,58,237,0.1)",
    color: "var(--primary)",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: "0 0 4px",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    margin: 0,
  },
  viewAllBtn: {
    background: "transparent",
    color: "var(--primary)",
    border: "2px solid var(--primary)",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  skeleton: {
    height: "340px",
    borderRadius: "16px",
    background: "linear-gradient(90deg, #f0e6ff 25%, #e8d5ff 50%, #f0e6ff 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  },
  card: {
    background: "var(--surface)",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(124,58,237,0.08)",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "var(--danger)",
    color: "white",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "8px",
    zIndex: 1,
  },
  imageWrapper: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  info: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  category: {
    fontSize: "11px",
    fontWeight: "600",
    color: "var(--primary)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  productTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-primary)",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    cursor: "pointer",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  star: {
    color: "#FBBF24",
    fontSize: "14px",
  },
  ratingText: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--text-primary)",
  },
  addBtn: {
    background: "var(--primary)",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};