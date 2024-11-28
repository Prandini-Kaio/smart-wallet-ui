import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { APIProvider } from "./shared/services/api/api-context";
import Routes from './shared/config/routes';
import { LogBox, Text } from "react-native";
import { EnvironmentProvider } from "../environments/environments";
import { useEffect } from "react";
import { handleApiError } from "./shared/utils/errorHandler";

export default function App() {

  useEffect(() => {
    // Ignorar warnings específicos
    LogBox.ignoreLogs(['Warning: ...']);

    // Configurar o handler global de erros
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      handleApiError(error);
    });
  }, []);

  return (
    <NavigationContainer>
      <EnvironmentProvider>
        <APIProvider>
          <Routes />
        </APIProvider>
      </EnvironmentProvider>
      <FlashMessage position={'top'} />
    </NavigationContainer>
  )
}
