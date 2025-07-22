import "./Footer.css";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";

const Footer = () => {
  const siteSettings = useSiteSettings();
  const settings = useSiteSettings();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <div>
            <img  src={settings?.aboutImage} alt="About Banner" />
          </div>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <p>{siteSettings?.footerEmail}</p>
          <p>{siteSettings?.footerAddress}</p>
          <p>{siteSettings?.footerPhone}</p>
        </div>

        <div className="footer-section">
          <h3>Quick Link</h3>
          <p>
            <a href="/PrivacyPolicy">Privacy Policy</a>
          </p>
          <p>
            <a href="/signup">Login / Register</a>
          </p>
          <p>
            <a href="/Cart">Cart</a>
          </p>

          <p>
            <a href="/Home">Shop</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{siteSettings?.footerCopyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
