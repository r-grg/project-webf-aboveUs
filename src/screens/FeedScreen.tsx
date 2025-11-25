// src/screens/FeedScreen.tsx
import { useState } from "react"
import { View, FlatList, StyleSheet, Image } from "react-native"
import { Appbar, Text, ActivityIndicator } from "react-native-paper"
import { useSightings } from "../context/SightingsContext"
import { SightingCard } from "../components/SightingCard"
import { SearchBar } from "../components/SearchBar"
import { SortOption } from "../types/Ufo"

export const FeedScreen = ({ navigation }: any) => {
  const { sightings, favorites, loading, toggleFavorite } = useSightings()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("Recent")

  const filteredSightings = sightings.filter(
    (sighting) =>
      sighting.witnessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sighting.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedSightings = [...filteredSightings].sort((a, b) => {
    const dateA = new Date(a.dateTime).getTime()
    const dateB = new Date(b.dateTime).getTime()

    if (sortOption === "Recent") {
      return dateB - dateA // nieuw → oud
    } else {
      return dateA - dateB // oud → nieuw
    }
  })

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 35, height: 35, marginRight: 8  }}
          />
          <Text style={{ fontSize: 35, fontWeight: "bold", color: "black" }}>
            AboveUs
          </Text>
        </View>
      </Appbar.Header>


      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        sortOption={sortOption}
        onChangeSortOption={setSortOption}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : sortedSightings.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            Geen waarnemingen gevonden
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedSightings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SightingCard
              sighting={item}
              isFavorite={favorites.includes(item.id)}
              onPress={() => navigation.navigate("Detail", { sighting: item })}
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
  },
  emptyText: {
    color: "#6B7280",
  },
})
