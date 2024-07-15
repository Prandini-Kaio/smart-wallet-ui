import { NavigationContainer } from "@react-navigation/native";
import { APIProvider } from "./context/api/api";
import Routes from "./routes";


export default function App(){
  return(
    <NavigationContainer>
      <APIProvider>
        <Routes />
      </APIProvider>
    </NavigationContainer>
  )
}