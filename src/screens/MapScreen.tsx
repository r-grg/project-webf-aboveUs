"use client"

import { useState, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Appbar, Text, Button } from "react-native-paper"
import MapView, { Marker, Region } from "react-native-maps"
import * as Location from "expo-location"
import type { Ufo } from "../types/Ufo"

interface MapScreenProps {
  route: { params?: { sighting?: Ufo } }
}

export const MapScreen = ({ route }: MapScreenProps) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const mapRef = useRef<MapView | null>(null)

  const sighting = route?.params?.sighting

  const sightingLat = Number(sighting?.location?.latitude)
  const sightingLng = Number(sighting?.location?.longitude)

  const hasSightingLocation =
    Number.isFinite(sightingLat) && Number.isFinite(sightingLng)

  const requestLocation = async () => {
    setErrorMsg(null)

    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Toestemming voor locatie geweigerd")
        return
      }

      const currentLocation =
        (await Location.getLastKnownPositionAsync()) ??
        (await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest,
        }))

      if (!currentLocation) {
        setErrorMsg("Geen locatie beschikbaar")
        return
      }
      setLocation(currentLocation)
      mapRef.current?.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        800,
      )
    } catch {
      setErrorMsg("Kon locatie niet ophalen")
    }
  }

  const initialRegion: Region = hasSightingLocation
    ? {
        latitude: sightingLat,
        longitude: sightingLng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 50.8503,
        longitude: 4.3517,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Text variant="headlineLarge" style={{ color: "black", marginLeft: 10 }}>
          Kaart
        </Text>
      </Appbar.Header>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={() => {
          if (hasSightingLocation) {
            mapRef.current?.animateToRegion(
              {
                latitude: sightingLat,
                longitude: sightingLng,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              },
              800,
            )
          }
        }}
      >
        {hasSightingLocation && (
          <Marker
            coordinate={{ latitude: sightingLat, longitude: sightingLng }}
            title={sighting?.witnessName || "Onbekende getuige"}
            description={sighting?.description || ""}
          />
        )}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="blue"
            title="Uw locatie"
          />
        )}
      </MapView>
      {!hasSightingLocation && (
        <Text style={styles.infoText}>
          Geen sighting geselecteerd.
        </Text>
      )}
      <Button
        mode="contained"
        onPress={requestLocation}
        style={styles.button}
        icon="crosshairs-gps"
      >
        Mijn locatie ophalen
      </Button>
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    margin: 16,
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 16,
  },
  infoText: {
    textAlign: "center",
    marginTop: 8,
    color: "#6B7280",
  },
})
