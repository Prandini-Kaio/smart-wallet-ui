import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { green, white } from '../../utils/style-constants';;
import ButtonTabBar from '../../components/button-tabbar/button-tabbar';
import ContaScreen from '../../../core/contas/contas';
import Home from '../../../core/home/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLancamento from '../../../features/lancamentos/components/add-lancamento/add-lancamento';
import { VisualizarLancamentos } from '../../../features/visualizar-lancamentos/visualiza-lancamentos.module';
import Settings from '../../../core/settings/settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Pages() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabScreens" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="VisualizarLancamentos" component={VisualizarLancamentos} options={{ headerTitle: "Visualizar Lancamentos" }} />
      <Stack.Screen name="AddLancamento" component={AddLancamento} options={{ headerTitle: "Novo Lancamento" }} />
    </Stack.Navigator>
  );
}

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: green,
      }}>

      <Tab.Screen
        name="Principal"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTabBar
              defaultColor={white}
              color={color}
              focused={focused}
              icon={'home'}></ButtonTabBar>
          ),
        }}
      />

      <Tab.Screen
        name="Secondary"
        component={ContaScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTabBar
              defaultColor={white}
              color={color}
              focused={focused}
              icon={'cash'}></ButtonTabBar>
          ),
        }}
      />

      <Tab.Screen
        name="AppSettings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTabBar
              defaultColor={white}
              color={color}
              focused={focused}
              icon={'account-settings'}></ButtonTabBar>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
