//src\screens\CreateReportScreen.tsx
"use client"

import { useState, useRef } from "react"
import { View, ScrollView, StyleSheet, Image } from "react-native"
import { Appbar, TextInput, Button, Text, Snackbar, HelperText, } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
//import * as Location from "expo-location"
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps"
import { useSightings } from "../context/SightingsContext"
import { Ufo } from "../types/Ufo"

export const CreateReportScreen = () => {
  const [witnessName, setWitnessName] = useState("")
  const [description, setDescription] = useState("")
  const [witnessContact, setWitnessContact] = useState("")
  const [imageUri, setImageUri] = useState("")
  const { createRemoteSighting  } = useSightings()
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 50.8503,
    longitude: 4.3517,
    latitudeDelta: 2,
    longitudeDelta: 2,
  })
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const mapRef = useRef<MapView | null>(null)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  }

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    setLocation({ latitude, longitude })
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!witnessName.trim()) {
      newErrors.witnessName = "Naam is verplicht"
    }
    if (!description.trim()) {
      newErrors.description = "Beschrijving is verplicht"
    }
    if (!witnessContact.trim()) {
      newErrors.witnessContact = "E-mailadres is verplicht"
    } else if (!/\S+@\S+\.\S+/.test(witnessContact)) {
      newErrors.witnessContact = "Ongeldig e-mailadres"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }
    if (!location) {
      setSnackbarMessage("Selecteer een locatie")
      setSnackbarVisible(true)
      return
    }
    setSubmitting(true)
    try {
      const newSighting: Omit<Ufo, "id"> = {
        witnessName,
        description,
        witnessContact,
        picture:
          imageUri || "https://sampleapis.assimilate.be/assets/images/ufosighting.webp",
        location,
        status: "unconfirmed",
        dateTime: new Date(),
      }
      await createRemoteSighting(newSighting)
      setSnackbarMessage("Melding verzonden!")
      setSnackbarVisible(true)

      setWitnessName("")
      setDescription("")
      setWitnessContact("")
      setImageUri("")
      setLocation(null)
      setErrors({})
    } catch (error) {
      console.error("Fout bij verzenden:", error)
      setSnackbarMessage("Fout bij verzenden. Probeer het later opnieuw.")
      setSnackbarVisible(true)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
          <Text variant="headlineLarge" style={{ color: "black" }}>
            Indienen
          </Text>
        </View>
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Text variant="titleLarge" style={styles.heading}>
          Nieuwe UFO-sighting
        </Text>
        <TextInput
          label="Naam getuige"
          value={witnessName}
          onChangeText={setWitnessName}
          mode="outlined"
          style={styles.input}
          error={!!errors.witnessName}
        />
        <HelperText type="error" visible={!!errors.witnessName}>
          {errors.witnessName}
        </HelperText>
        <TextInput
          label="Beschrijving"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
          error={!!errors.description}
        />
        <HelperText type="error" visible={!!errors.description}>
          {errors.description}
        </HelperText>
        <TextInput
          label="E-mailadres"
          value={witnessContact}
          onChangeText={setWitnessContact}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          error={!!errors.witnessContact}
        />
        <HelperText type="error" visible={!!errors.witnessContact}>
          {errors.witnessContact}
        </HelperText>
        <Button mode="outlined" onPress={pickImage} style={styles.button} icon="camera">
          {imageUri ? "Afbeelding wijzigen" : "Afbeelding toevoegen"}
        </Button>
        {imageUri ? (
          <View style={styles.imagePreviewContainer}>
            <Text style={styles.imageLabel}>Geselecteerde afbeelding:</Text>
            <Image
              source={{ uri: imageUri }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          </View>
        ) : null}
        <Text variant="bodyMedium" style={{marginTop: 16, marginBottom: 8, fontWeight: "600" }}>
          Selecteer een locatie op de kaart
        </Text>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={setMapRegion}
          onPress={handleMapPress}
          rotateEnabled={false}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={submitting}
          disabled={submitting}
        >
          Verzenden
        </Button>
      </ScrollView>
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
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
    padding: 16,
  },
  heading: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 4,
  },
  button: {
    marginVertical: 8,
  },
  map: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 32,
  },
  imagePreviewContainer: {
  marginTop: 8,
  marginBottom: 16,
  },
  imageLabel: {
    marginBottom: 4,
    color: "#4B5563",
    fontSize: 12,
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },

})
