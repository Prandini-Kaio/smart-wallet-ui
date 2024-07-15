import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contas from '../Secondary/Contas';

const Stack = createNativeStackNavigator();

export default function Secondary({navigation}: any) {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>

        <Stack.Screen
          name="Contas"
          component={Contas}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}
