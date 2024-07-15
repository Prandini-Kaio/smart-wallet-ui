import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Contas from '../Secondary/Contas';

const Stack = createNativeStackNavigator();

export default function Principal({navigation}: any) {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>

        <Stack.Screen
          name="Home"
          component={Home}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}
