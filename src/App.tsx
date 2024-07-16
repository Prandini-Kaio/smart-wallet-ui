import { NavigationContainer } from "@react-navigation/native";
import { APIProvider } from "./context/api/api";
import Routes from "./routes";
import FlashMessage from "react-native-flash-message";


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