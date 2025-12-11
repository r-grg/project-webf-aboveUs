import { MD3LightTheme as DefaultTheme } from "react-native-paper"

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4B3D8F",
    onPrimary: "#FFFFFF",
    primaryContainer: "#bcb3d8ff",
  },

  fonts: {
    ...DefaultTheme.fonts,

    headlineLarge:  { ...DefaultTheme.fonts.headlineLarge,  fontFamily: "Orbitron_700Bold" },
    headlineSmall:  { ...DefaultTheme.fonts.headlineSmall,  fontFamily: "Orbitron_700Bold" },

    titleLarge:     { ...DefaultTheme.fonts.titleLarge,     fontFamily: "Orbitron_700Bold" },
    titleMedium:    { ...DefaultTheme.fonts.titleMedium,    fontFamily: "Orbitron_700Bold" },
    
    bodyLarge:      { ...DefaultTheme.fonts.bodyLarge,      fontFamily: "Exo2_400Regular" },
    bodyMedium:     { ...DefaultTheme.fonts.bodyMedium,     fontFamily: "Exo2_400Regular" },
  },
}
