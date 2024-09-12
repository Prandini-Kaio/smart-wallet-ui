import { ReactNode, createContext, useContext, useState } from "react";

export const IP_URL = 'http://192.168.1.27:8080/api/v1';

interface EnvironmentContextType {
    apiUrl: string;
    setApiUrl: (url: string) => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const EnvironmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apiUrl, setApiUrl] = useState(IP_URL);

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