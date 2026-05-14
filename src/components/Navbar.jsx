import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Shop<span style={styles.logoAccent}>Nova</span>
      </Link>

      <ul style={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === link.path ? styles.navLinkActive : {}),
              }}
            >
              {link.label}
              {location.pathname === link.path && <span style={styles.activeDot} />}
            </Link>
          </li>
        ))}
      </ul>

      <div style={styles.actions}>
        <Link to="/cart" style={styles.cartBtn}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
        </Link>

        {user && (
          <div style={styles.userArea}>
            <div style={styles.avatar}>
              {(user.name || user.email || "U")[0].toUpperCase()}
            </div>
            <span style={styles.userName}>
              {user.name || user.email?.split("@")[0]}
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        )}

        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barTop : {}) }} />
          <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barBot : {}) }} />
        </button>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.mobileLink,
                ...(location.pathname === link.path ? styles.mobileLinkActive : {}),
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={styles.mobileLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "68px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)",
    boxShadow: "0 2px 16px rgba(124,58,237,0.07)",
    flexWrap: "wrap",
    gap: "12px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "var(--text-primary)",
    textDecoration: "none",
    letterSpacing: "-0.5px",
  },
  logoAccent: { color: "var(--primary)" },
  navLinks: {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    position: "relative",
    textDecoration: "none",
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    transition: "color 0.2s",
  },
  navLinkActive: { color: "var(--primary)", fontWeight: "600" },
  activeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--primary)",
    display: "block",
  },
  actions: { display: "flex", alignItems: "center", gap: "16px" },
  cartBtn: {
    position: "relative",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    padding: "8px",
    borderRadius: "12px",
    cursor: "pointer",
  },
  cartBadge: {
    position: "absolute",
    top: "2px",
    right: "2px",
    background: "var(--primary)",
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userArea: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
  },
  userName: {
    fontSize: "13px",
    fontWeight: "500",
    color: "var(--text-primary)",
    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  logoutBtn: {
    background: "transparent",
    border: "1.5px solid var(--border)",
    borderRadius: "10px",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: "500",
    color: "var(--text-secondary)",
    cursor: "pointer",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    display: "block",
    width: "22px",
    height: "2px",
    background: "var(--text-primary)",
    borderRadius: "2px",
    transition: "all 0.3s",
  },
  barTop: { transform: "translateY(7px) rotate(45deg)" },
  barBot: { transform: "translateY(-7px) rotate(-45deg)" },
  mobileMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "12px 0",
    borderTop: "1px solid var(--border)",
  },
  mobileLink: {
    textDecoration: "none",
    color: "var(--text-secondary)",
    fontSize: "15px",
    fontWeight: "500",
    padding: "10px 8px",
    borderRadius: "10px",
  },
  mobileLinkActive: {
    color: "var(--primary)",
    background: "rgba(124,58,237,0.06)",
    fontWeight: "600",
  },
  mobileLogout: {
    background: "transparent",
    border: "none",
    color: "var(--danger)",
    fontSize: "15px",
    fontWeight: "500",
    padding: "10px 8px",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: "10px",
  },
};