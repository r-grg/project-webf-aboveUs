"use client"
import { useState } from "react"
import { View, ScrollView, StyleSheet, Linking } from "react-native"
import { Appbar, Card, Text, Button, Snackbar } from "react-native-paper"
import { useSightings } from "../context/SightingsContext"
import { Ufo } from "../types/Ufo"

export const DetailScreen = ({ route, navigation }: any) => {
  const { sighting } = route.params as { sighting: Ufo }
  const { favorites, toggleFavorite } = useSightings()
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const isFavorite = favorites.includes(sighting.id)

  const handleToggleFavorite = () => {
    toggleFavorite(sighting.id)
  }

  const handleContactWitness = () => {
    if (sighting.witnessContact) {
      Linking.openURL(`mailto:${sighting.witnessContact}`)
    }
  }

  const handleShowOnMap = () => {
    navigation.navigate("Map", { sighting })
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Text style={{ fontSize: 35, fontFamily: "Orbitron_700Bold", color: "black" }}>
            Terug
          </Text>
        </View>
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Cover
            source={
              sighting.picture
                ? { uri: sighting.picture }
                : { uri: "https://via.placeholder.com/400x300?text=UFO+Sighting" }
            }
            style={styles.cover}
          />
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineSmall" style={styles.title}>
              {sighting.witnessName || "Anoniem"}
            </Text>
            <Text variant="bodyMedium" style={styles.date}>
              Datum: {formatDate(sighting.dateTime)}
            </Text>
          </Card.Content>
        </Card>
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Status
          </Text>
          <Text variant="bodyMedium" style={styles.sectionText}>
            {sighting.status || "N/A"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Locatie
          </Text>
          <Text variant="bodyMedium" style={styles.sectionText}>
            Lat: {sighting.location?.latitude || "N/A"}, Lng: {sighting.location?.longitude || "N/A"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Beschrijving
          </Text>
          <Text variant="bodyMedium" style={styles.sectionText}>
            {sighting.description || "Geen beschrijving beschikbaar"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Contact getuige
          </Text>
          <Text variant="bodyMedium" style={styles.sectionText}>
            {sighting.witnessContact || "Niet beschikbaar"}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleShowOnMap} style={styles.button} icon="map-marker">
            Toon op Kaart
          </Button>
          <Button
            mode="contained-tonal"
            onPress={handleContactWitness}
            style={styles.button}
            icon="email"
            disabled={!sighting.witnessContact}
          >
            Contact getuige
          </Button>
          <Button
            mode="contained-tonal"
            onPress={handleToggleFavorite}
            style={styles.button}
            icon={isFavorite ? "star" : "star-outline"}
          >
            {isFavorite ? "Verwijder favoriet" : "Favoriet"}
          </Button>
        </View>
      </ScrollView>
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  cover: {
    backgroundColor: "#E5E7EB",
  },
  cardContent: {
    paddingTop: 16,
  },
  title: {
    marginBottom: 8,
  },
  date: {
    color: "#6B7280",
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionText: {
    color: "#374151",
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  button: {
    width: "100%",
  },
})
