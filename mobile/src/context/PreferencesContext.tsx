import * as React from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PreferencesContextType {
    reduceMotion: boolean;
    setReduceMotion: (value: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    userToken: string | null;
    setUserToken: (token: string | null) => Promise<void>;
    pairedDeviceId: string | null;
    setPairedDeviceId: (id: string | null) => Promise<void>;
}

const PreferencesContext = React.createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [reduceMotion, _setReduceMotion] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [userToken, _internalSetUserToken] = React.useState<string | null>(null);
    const [pairedDeviceId, _internalSetPairedDeviceId] = React.useState<string | null>(null);

    const setUserToken = async (token: string | null) => {
        _internalSetUserToken(token);
        try {
            if (token) {
                await AsyncStorage.setItem('userToken', token);
            } else {
                await AsyncStorage.removeItem('userToken');
            }
        } catch (e) {
            console.error('Failed to save userToken', e);
        }
    };

    const setPairedDeviceId = async (id: string | null) => {
        _internalSetPairedDeviceId(id);
        try {
            if (id) {
                await AsyncStorage.setItem('pairedDeviceId', id);
            } else {
                await AsyncStorage.removeItem('pairedDeviceId');
            }
        } catch (e) {
            console.error('Failed to save pairedDeviceId', e);
        }
    };

    React.useEffect(() => {
        // Load persisted preferences
        const loadPreferences = async () => {
            try {
                const savedReduceMotion = await AsyncStorage.getItem('reduceMotion');
                if (savedReduceMotion !== null) {
                    _setReduceMotion(JSON.parse(savedReduceMotion));
                }

                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    _internalSetUserToken(token);
                    setIsAuthenticated(true);
                }

                const savedDeviceId = await AsyncStorage.getItem('pairedDeviceId');
                if (savedDeviceId) {
                    _internalSetPairedDeviceId(savedDeviceId);
                }
            } catch (e) {
                console.error('Failed to load preferences', e);
            }
        };
        loadPreferences();
    }, []);

    const setReduceMotion = async (value: boolean) => {
        _setReduceMotion(value);
        try {
            await AsyncStorage.setItem('reduceMotion', JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save reduceMotion preference', e);
        }
    };

    return (
        <PreferencesContext.Provider
            value={{
                reduceMotion,
                setReduceMotion,
                isAuthenticated,
                setIsAuthenticated,
                userToken,
                setUserToken,
                pairedDeviceId,
                setPairedDeviceId,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = React.useContext(PreferencesContext);
    if (context === undefined) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
}
