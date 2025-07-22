import React, { createContext, useContext, useState, useEffect } from "react";

const SiteSettingsContext = createContext();
export const useSiteSettings = () => useContext(SiteSettingsContext);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch("http://localhost:8080/settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
