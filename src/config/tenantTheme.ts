export interface TenantConfig {
  organizationName: string;
  appTitle: string;
  logoUrl: string;
  faviconUrl: string;
  colors: {
    primary: string; // hex color e.g., '#2563eb'
    secondary: string; // hex color e.g., '#4f46e5'
    accent: string; // hex color e.g., '#06b6d4'
  };
  features: {
    enableResumeAudit: boolean;
    enableMatching: boolean;
  };
}

// Default configuration for YourRecruiter
export const defaultTenantConfig: TenantConfig = {
  organizationName: 'YourRecruiter',
  appTitle: 'YourRecruiter - Enterprise Resume Auditor',
  logoUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=80&auto=format&fit=crop&q=60', // Placeholder premium-looking logo
  faviconUrl: '/favicon.ico',
  colors: {
    primary: '#6366f1',   // Indigo 500
    secondary: '#4f46e5', // Indigo 600
    accent: '#10b981',    // Emerald 500
  },
  features: {
    enableResumeAudit: true,
    enableMatching: true,
  },
};
