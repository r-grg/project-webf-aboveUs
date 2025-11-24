import { MD3LightTheme as DefaultTheme } from "react-native-paper"

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
     // BRAND COLORS
    primary: "#4B3D8F",          
    onPrimary: "#FFFFFF",
    primaryContainer: "#bcb3d8ff", 

    secondary: "#FF7A45",        
    onSecondary: "#FFFFFF",
    secondaryContainer: "#FFE2D5",

    tertiary: "#3A8CCB",         
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#D3ECFF",

    // APP BACKGROUNDS
    background: "#F8F7FC",       
    onBackground: "#1A1A1A",

    surface: "#FFFFFF",          
    onSurface: "#1A1A1A",

    surfaceVariant: "#E6E1F2",
    onSurfaceVariant: "#47455A",

    // ERROR
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",

    // OUTLINES & BORDERS
    outline: "#7A758A",
    outlineVariant: "#C9C4D6",

    // SHADOW & ELEVATION
    // shadow: "#000000",
    // scrim: "#000000",
  },
}
