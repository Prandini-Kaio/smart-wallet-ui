import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contas from '../../features/contas/components/contas';

const Stack = createNativeStackNavigator();

export default function ContaScreen({navigation}: any) {
  return (
    <Stack.Navigator
      initialRouteName={'Contas'}
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
