import { Platform } from 'react-native';

// For development, you can use 'http://localhost:3000' or 'http://10.0.2.2:3000'
// Once deployed, use the production domain.
export const API_URL = 'https://www.cravex.net';
// export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const COLORS = {
    primary: '#dc2626',
    secondary: '#475569',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    subtext: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
};
