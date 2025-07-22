import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
import "./Aboutus.css";

const Aboutus = () => {
  const settings = useSiteSettings();

  return (
    <div className="aboutus-page">
      <Navbar />     
      <div>     
        <img className="bannerimg" src={settings?.aboutImage} alt="About Banner" />
      </div>
      <div className="aboutus-content">
        <h2>About us ShopSwift</h2>

        <h3>A global product based business</h3>
        <p>
          Welcome to ShopSwift — your trusted destination for stylish and
          premium-quality clothing for Men, Women, and Children. We specialize
          in curating and importing unique, trend-forward apparel that you won’t
          find anywhere else. At ShopSwift, we believe in offering more than
          just fashion — we offer personality, confidence, and distinction in
          every outfit. Our team handpicks clothing from top international
          sources to bring fresh, exclusive styles directly to the market —
          helping you stay ahead in both comfort and design. Whether you’re
          dressing up for work, casual wear, or a special occasion, ShopSwift
          ensures that every customer, regardless of age or style, finds
          something they love.
        </p>
        <h3>Our Vision</h3>
        <p>To redefine everyday fashion in India by delivering high-quality, distinctive clothing that blends comfort with modern aesthetics.</p>
        <h3>Our Promise</h3>
        <p>
            <tr>
                <li>Unique designs, imported with care</li>
                <li>Quality that lasts, prices that don’t break the bank</li>
                <li>Fashion for every family member — Men, Women, and Kids</li>
            </tr>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
