import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { APIProvider } from "./shared/services/api/api-context";
import Routes from './shared/config/routes';
import { Text } from "react-native";
import { EnvironmentProvider } from "../environments/environments";

export default function App() {
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
