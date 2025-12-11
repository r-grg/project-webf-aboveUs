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

    displayLarge:   { ...DefaultTheme.fonts.displayLarge,   fontFamily: "Orbitron_700Bold" },
    displayMedium:  { ...DefaultTheme.fonts.displayMedium,  fontFamily: "Orbitron_700Bold" },
    displaySmall:   { ...DefaultTheme.fonts.displaySmall,   fontFamily: "Orbitron_700Bold" },

    headlineLarge:  { ...DefaultTheme.fonts.headlineLarge,  fontFamily: "Orbitron_700Bold" },
    headlineMedium: { ...DefaultTheme.fonts.headlineMedium, fontFamily: "Orbitron_700Bold" },
    headlineSmall:  { ...DefaultTheme.fonts.headlineSmall,  fontFamily: "Orbitron_700Bold" },

    titleLarge:     { ...DefaultTheme.fonts.titleLarge,     fontFamily: "Orbitron_700Bold" },
    titleMedium:    { ...DefaultTheme.fonts.titleMedium,    fontFamily: "Orbitron_700Bold" },
    titleSmall:     { ...DefaultTheme.fonts.titleSmall,     fontFamily: "Orbitron_700Bold" },

    labelLarge:     { ...DefaultTheme.fonts.labelLarge,     fontFamily: "Exo2_400Regular" },
    labelMedium:    { ...DefaultTheme.fonts.labelMedium,    fontFamily: "Exo2_400Regular" },
    labelSmall:     { ...DefaultTheme.fonts.labelSmall,     fontFamily: "Exo2_400Regular" },

    bodyLarge:      { ...DefaultTheme.fonts.bodyLarge,      fontFamily: "Exo2_400Regular" },
    bodyMedium:     { ...DefaultTheme.fonts.bodyMedium,     fontFamily: "Exo2_400Regular" },
    bodySmall:      { ...DefaultTheme.fonts.bodySmall,      fontFamily: "Exo2_400Regular" },
  },
}
