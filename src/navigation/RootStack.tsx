import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FeedScreen } from "../screens/FeedScreen"
import { DetailScreen } from "../screens/DetailScreen"

const Stack = createNativeStackNavigator()

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}
