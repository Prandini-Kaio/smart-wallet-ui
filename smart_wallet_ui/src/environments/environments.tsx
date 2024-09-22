import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";

export const IP_URL = 'http://192.168.1.27:8080/api/v1';

interface EnvironmentContextType {
    apiUrl: string;
    setApiUrl: (url: string) => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const EnvironmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apiUrl, setApiUrl] = useState(IP_URL);

    useEffect(() => {
        showMessage({
            message: 'Url alterada com sucesso',
            type: 'info',
            duration: 1000,
        });
    }, [apiUrl])

    return (
        <EnvironmentContext.Provider value={{ apiUrl, setApiUrl }}>
            {children}
        </EnvironmentContext.Provider>
    );
};

export const useEnvironment = () => {
    const context = useContext(EnvironmentContext);
    if (context === undefined) {
        throw new Error('useEnvironment must be used within an EnvironmentProvider');
    }
    return context;
};