import "./AdminSettingsForm.css";
import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080/";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    heroText: "",
    heroImage: "",
    loginImage: "",
    footerEmail: "",
    footerAddress: "",
    footerPhone: "",
    footerCopyright: "",
    logo: "",
    aboutImage: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [heroImageFile, setheroImageFile] = useState(null);
  const [loginImageFile, setloginImageFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.settings);
        }
      });
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "logo") setLogoFile(files[0]);
    if (name === "aboutImage") setAboutImageFile(files[0]);
    if (name === "heroImage") setheroImageFile(files[0]);
    if (name === "loginImage") setloginImageFile(files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in settings) formData.append(key, settings[key]);
    if (logoFile) formData.append("logo", logoFile);
    if (aboutImageFile) formData.append("aboutImage", aboutImageFile);
    if (heroImageFile) formData.append("heroImage", heroImageFile);
    if (loginImageFile) formData.append("loginImage", loginImageFile);

    await fetch("http://localhost:8080/settings", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    alert("Settings updated!");
  };

  return (
    <div className="admin-settings">
      <h2>Update Site Settings</h2>
      <form onSubmit={handleSave} encType="multipart/form-data">
        <h4>Page Name</h4>
        <input
          name="siteName"
          value={settings.siteName}
          onChange={handleChange}
          placeholder="Site Name"
        />

        <h4>Dest.</h4>
        <input
          name="heroText"
          value={settings.heroText}
          onChange={handleChange}
          placeholder="Hero Text"
        />

        <h4>Email</h4>
        <input
          name="footerEmail"
          value={settings.footerEmail}
          onChange={handleChange}
          placeholder="Footer Email"
        />

        <h4>Phone</h4>
        <input
          name="footerPhone"
          value={settings.footerPhone}
          onChange={handleChange}
          placeholder="Footer Phone"
        />

        <h4>Address</h4>
        <input
          name="footerAddress"
          value={settings.footerAddress}
          onChange={handleChange}
          placeholder="Footer Address"
        />

        <h4>Footer Copyright</h4>
        <input
          name="footerCopyright"
          value={settings.footerCopyright}
          onChange={handleChange}
          placeholder="Footer Copyright"
        />

        <div>
          <label>Logo:</label>
          {settings.logo && (
            <div className="image-preview">
              <img src={`http://localhost:8080${settings.logo}`} alt="Logo" width="120" />
            </div>
          )}
          <input type="file" name="logo" onChange={handleFileChange} />
        </div>

        <div>
          <label>Hero Image:</label>
          {settings.heroImage && (
            <div className="image-preview">
              <img src={`http://localhost:8080${settings.heroImage}`} alt="Hero" width="150" />
            </div>
          )}
          <input type="file" name="heroImage" onChange={handleFileChange} />
        </div>


        <div>
          <label>Login Image:</label>
          {settings.loginImage && (
            <div className="image-preview">
              <img src={`http://localhost:8080${settings.loginImage}`} alt="Login" width="150" />
            </div>
          )}
          <input type="file" name="loginImage" onChange={handleFileChange} />
        </div>


        <div>
          <label>About Page Image:</label>
          {settings.aboutImage && (
            <div className="image-preview">
              <img src={settings.aboutImage} alt="About" width="150" />
            </div>
          )}
          <input type="file" name="aboutImage" onChange={handleFileChange} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
