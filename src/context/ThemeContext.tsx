'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TenantConfig, defaultTenantConfig } from '../config/tenantTheme';

interface ThemeContextType {
  config: TenantConfig;
  updateConfig: (newConfig: Partial<TenantConfig>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<TenantConfig>(defaultTenantConfig);

  // Apply colors to root element as CSS variables whenever they change
  useEffect(() => {
    const root = document.documentElement;
    
    // Injects variables into the root (html/body) element
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);

    // Dynamic browser title and favicon updates
    document.title = config.appTitle;
    
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = config.faviconUrl;
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = config.faviconUrl;
      document.head.appendChild(newFavicon);
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<TenantConfig>) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        ...newConfig,
        colors: {
          ...prev.colors,
          ...(newConfig.colors || {}),
        },
        features: {
          ...prev.features,
          ...(newConfig.features || {}),
        },
      };
      return updated;
    });
  };

  return (
    <ThemeContext.Provider value={{ config, updateConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
