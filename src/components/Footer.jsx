import { Link } from "react-router-dom";

const FacebookIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const socials = [
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <TwitterIcon />, label: "Twitter" },
  { icon: <YoutubeIcon />, label: "Youtube" },
];

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        {/* Brand */}
        <div style={styles.brand}>
          <Link to="/" style={styles.logo}>
            Shop<span style={styles.logoAccent}>Nova</span>
          </Link>
          <p style={styles.tagline}>
            Your favorite destination for quality products at the best prices.
          </p>
          <div style={styles.socials}>
            {socials.map((s) => (
              <span key={s.label} style={styles.socialIcon} title={s.label}>
                {s.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div style={styles.linksGroup}>
          <p style={styles.groupTitle}>Shop</p>
          {[
            { label: "All Products", path: "/products" },
            { label: "New Arrivals", path: "/products" },
            { label: "My Cart", path: "/cart" },
          ].map((l) => (
            <Link key={l.label} to={l.path} style={styles.link}>{l.label}</Link>
          ))}
        </div>

        {/* Account Links */}
        <div style={styles.linksGroup}>
          <p style={styles.groupTitle}>Account</p>
          {[
            { label: "Login", path: "/login" },
            { label: "Register", path: "/register" },
            { label: "My Orders", path: "/cart" },
          ].map((l) => (
            <Link key={l.label} to={l.path} style={styles.link}>{l.label}</Link>
          ))}
        </div>

        {/* Contact */}
        <div style={styles.linksGroup}>
          <p style={styles.groupTitle}>Contact</p>
          <div style={styles.contactRow}>
            <MailIcon />
            <span style={styles.contactText}>support@shopnova.com</span>
          </div>
          <div style={styles.contactRow}>
            <PhoneIcon />
            <span style={styles.contactText}>+20 100 000 0000</span>
          </div>
          <div style={styles.contactRow}>
            <LocationIcon />
            <span style={styles.contactText}>Cairo, Egypt</span>
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.bottom}>
        <p style={styles.copy}>© 2026 ShopNova. All rights reserved.</p>
        <p style={styles.copy}>Made with love for the React course</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, var(--primary-dark), var(--primary))",
    color: "white",
    padding: "48px 32px 24px",
    marginTop: "auto",
  },
  top: {
    display: "flex",
    gap: "48px",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "220px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "white",
    textDecoration: "none",
    letterSpacing: "-0.5px",
  },
  logoAccent: {
    color: "rgba(255,255,255,0.6)",
  },
  tagline: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    lineHeight: "1.6",
  },
  socials: {
    display: "flex",
    gap: "10px",
    marginTop: "4px",
  },
  socialIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    transition: "background 0.2s",
  },
  linksGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  groupTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "4px",
  },
  link: {
    textDecoration: "none",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    transition: "color 0.2s",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255,255,255,0.7)",
  },
  contactText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.15)",
    margin: "32px 0 20px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
  },
  copy: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
  },
};