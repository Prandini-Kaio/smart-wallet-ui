import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { APIProvider } from "./shared/services/api/api-context";
import Routes from "../../../src/routes";

export default function App(){
  return(
    <NavigationContainer>
      <APIProvider>
        <Routes />
    </APIProvider>
    <FlashMessage position={'top'} />
  </NavigationContainer>
)
}
