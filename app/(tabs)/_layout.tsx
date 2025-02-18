import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FilterScreen from "./filter";
import SettingsScreen from "./setting";
import HomeScreen from "./home";

const Tab = createBottomTabNavigator();

export default function RootContainer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="filter" component={FilterScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
