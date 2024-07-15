import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {green, white} from './shared/styleConstants';
import Principal from './Principal/principal';
import ButtonTabBar from './components/ButtonTabBar';
import Contas from './Secondary/Contas';
import Secondary from './Secondary/secondary';

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
          component={Principal}
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
          component={Secondary}
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
