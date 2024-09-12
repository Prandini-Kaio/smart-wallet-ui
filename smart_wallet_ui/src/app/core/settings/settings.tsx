import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsModule from '../../features/settings/settings-modulo';

const Stack = createNativeStackNavigator();

export default function Settings({navigation}: any) {
  return (
    <Stack.Navigator
      initialRouteName={'Settings'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>

        <Stack.Screen
          name="Settings"
          component={SettingsModule}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
