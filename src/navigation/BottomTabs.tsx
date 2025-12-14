import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { paperTheme } from "../theme/paperTheme";
import { RootStack } from "../navigation/RootStack";
import { MapScreen } from "../screens/MapScreen";
import { CreateReportScreen } from "../screens/CreateReportScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: paperTheme.colors.primary,
        tabBarInactiveTintColor: paperTheme.colors.primaryContainer,
        tabBarLabelStyle: {
          fontFamily: "Exo2_400Regular", 
          fontSize: 11,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="FeedScreen"
        component={RootStack}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ufo-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Kaart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker-radius" color={color} size={size}/>          ),
        }}
      />
      <Tab.Screen
        name="Indienen"
        component={CreateReportScreen}
        options={{
          tabBarLabel: "Indienen",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus-circle" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorieten"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorieten",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="star" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
