import React from "react";
import "./PrivacyPolicy.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>
          At <strong>StyleWear</strong>, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Your name, email, and contact details</li>
          <li>Shipping and billing address</li>
          <li>Order history and saved preferences</li>
          <li>Website usage through cookies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process orders and deliver products</li>
          <li>To send order updates and promotional offers</li>
          <li>To improve user experience and our services</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>
          We implement secure technologies and procedures to protect your information from unauthorized access, loss, or misuse.
        </p>

        <h2>4. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal information. We only share your data with trusted partners like shipping providers, under strict privacy obligations.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Cookies help us understand how you use our site and offer personalized experiences. You can control cookie preferences in your browser settings.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You can access, modify, or delete your personal data by contacting us at <a href="mailto:support@stylewear.com">support@stylewear.com</a>.
        </p>

        <h2>7. Changes to Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage you to review it periodically.
        </p>

        <p className="last-updated">Last Updated: June 2025</p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
