import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {green, white} from '../../utils/style-constants';;
import ButtonTabBar from '../../components/button-tabbar/button-tabbar';
import ContaScreen from '../../../core/contas/contas';
import Home from '../../../core/home/home';

const Tab = createBottomTabNavigator();

export default function Pages() {
  return (
    <>
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
            tabBarIcon: ({color, focused}) => (
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
            tabBarIcon: ({color, focused}) => (
              <ButtonTabBar
                defaultColor={white}
                color={color}
                focused={focused}
                icon={'cash'}></ButtonTabBar>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
