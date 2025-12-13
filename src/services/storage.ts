import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "aboveus_favorites";

export const storage = {
  async getFavorites(): Promise<number[]> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Fout bij het laden van favorieten:", error)
      return []
    }
  },

  async saveFavorites(favorites: number[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error("Fout bij het opslaan van favorieten:", error)
    }
  },
} 
