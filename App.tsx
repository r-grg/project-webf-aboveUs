import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { SightingsProvider } from "./src/context/SightingsContext";
import { BottomTabs } from "./src/navigation/BottomTabs";
import { paperTheme } from "./src/theme/paperTheme";

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <SightingsProvider>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </SightingsProvider>
    </PaperProvider>
  );
}
