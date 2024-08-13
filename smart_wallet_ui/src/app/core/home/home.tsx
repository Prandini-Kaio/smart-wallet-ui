import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../features/lancamentos/lancamento.module';

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
