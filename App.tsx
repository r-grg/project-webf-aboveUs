import { NavigationContainer } from "@react-navigation/native"
import { Provider as PaperProvider } from "react-native-paper"
import { SightingsProvider } from "./src/context/SightingsContext"
import { BottomTabs } from "./src/navigation/BottomTabs"
import { paperTheme } from "./src/theme/paperTheme"

import { useFonts } from "expo-font"
import { Orbitron_700Bold } from "@expo-google-fonts/orbitron"
import { Exo2_400Regular } from "@expo-google-fonts/exo-2"

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_700Bold,
    Exo2_400Regular,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <PaperProvider theme={paperTheme}>
      <SightingsProvider>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </SightingsProvider>
    </PaperProvider>
  )
}
