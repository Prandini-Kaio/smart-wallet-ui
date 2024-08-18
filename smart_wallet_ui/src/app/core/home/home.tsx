import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Lancamento from '../../features/lancamentos/lancamento.module';

const Stack = createNativeStackNavigator();

export default function Home({navigation}: any) {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>

        <Stack.Screen
          name="Home"
          component={Lancamento}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}
