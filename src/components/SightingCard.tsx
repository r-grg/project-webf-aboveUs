import { View, StyleSheet } from "react-native"
import { Card, Text, IconButton } from "react-native-paper"
import type { Ufo } from "../types/Ufo"
import { FavoriteToggle } from "./FavoriteToggle"

interface SightingCardProps {
  sighting: Ufo
  isFavorite?: boolean
  onPress?: () => void
  onFavoriteToggle: () => void
}

export const SightingCard = ({ sighting, isFavorite = false, onPress, onFavoriteToggle }: SightingCardProps) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover
        source={
          sighting.picture
            ? { uri: sighting.picture }
            : { uri: "https://via.placeholder.com/400x200?text=UFO+Sighting" }
        }
        style={styles.cover}
      />
      <Card.Content style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.name}>
            {sighting.witnessName || "Anoniem"}
          </Text>
          <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
            {sighting.description || "Geen beschrijving"}
          </Text>
        </View>

        <FavoriteToggle
          isFavorite={isFavorite}
          onToggle={onFavoriteToggle}
          size={25}
        />
      </Card.Content>
    </Card>
  )
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  cover: {
    backgroundColor: "#E5E7EB",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
  description: {
    color: "#6B7280",
  },
})
//src\components\SightingCard.tsx