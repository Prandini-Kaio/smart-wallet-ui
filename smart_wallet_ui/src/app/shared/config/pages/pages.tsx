import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from '../../../core/home/home';
import Settings from '../../../core/settings/settings';
import AddConta from '../../../features/contas/components/form-conta/form-conta';
import AddLancamento from '../../../features/lancamentos/components/add-lancamento/add-lancamento';
import { VisualizarLancamentos } from '../../../features/visualizar-lancamentos/visualiza-lancamentos.module';
import ButtonTabBar from '../../components/button-tabbar/button-tabbar';
import { midnightGreen, richBlack, secondaryColor, textLightColor, white } from '../../utils/style-constants';
;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Pages() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabScreens" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="VisualizarLancamentos" component={VisualizarLancamentos} options={{ headerTitle: "Novo Lancamento", headerStyle: { backgroundColor: secondaryColor, }, headerTitleStyle: { color: textLightColor } }} />
      <Stack.Screen name="AddContas" component={AddConta} options={{ headerTitle: "Nova Conta", headerStyle: { backgroundColor: secondaryColor, }, headerTitleStyle: { color: textLightColor } }} />
      <Stack.Screen name="AddLancamento" component={AddLancamento} options={{ headerTitle: "Novo Lancamento", headerStyle: { backgroundColor: secondaryColor, }, headerTitleStyle: { color: textLightColor } }} />
    </Stack.Navigator>
  );
}

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: midnightGreen,
        tabBarStyle: {
          backgroundColor: richBlack,
          height: 60,
          ...styles.shadow,
        },
        tabBarItemStyle: {
          borderRadius: 15,
        },
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
              icon={'home'}
            >

            </ButtonTabBar>
          ),
        }}
      />

      {/* <Tab.Screen
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
      /> */}

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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});