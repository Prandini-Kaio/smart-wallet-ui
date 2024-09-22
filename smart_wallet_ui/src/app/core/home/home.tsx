import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../features/lancamentos/lancamento.module';

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
          component={HomeScreen}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}