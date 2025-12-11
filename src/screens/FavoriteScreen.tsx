import { View, FlatList, StyleSheet } from "react-native"
import { Appbar, Text } from "react-native-paper"
import { useSightings } from "../context/SightingsContext"
import { SightingCard } from "../components/SightingCard"
import { useNavigation } from "@react-navigation/native"

export const FavoriteScreen = () => {
  const { sightings, favorites, toggleFavorite } = useSightings()
  const navigation = useNavigation()
  const favoriteSightings = sightings.filter((sighting) => favorites.includes(sighting.id))
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
          <Text variant="headlineLarge" style={{ color: "black" }}>
            Favorieten
          </Text>
        </View>
      </Appbar.Header>
      {favoriteSightings.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            Nog geen favorieten
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteSightings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SightingCard
              sighting={item}
              isFavorite={true}
              onPress={() =>
                (navigation as any).navigate("FeedScreen", {
                  screen: "Detail",
                  params: { sighting: item },
                })
              }
              onFavoriteToggle={() => toggleFavorite(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  list: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    color: "#6B7280",
    marginBottom: 8,
  },
  emptySubtext: {
    color: "#9CA3AF",
    textAlign: "center",
  },
})
//