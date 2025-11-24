"use client"

import { useState, useEffect, useRef } from "react"
import { View, StyleSheet } from "react-native"
import { Appbar, Text, Button } from "react-native-paper"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"

export const MapScreen = ({ route }: any) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const mapRef = useRef<MapView | null>(null)

  // 👇 Sighting passed from DetailScreen
  const sighting = route?.params?.sighting

  // Safely extract latitude/longitude from sighting.location
  const sightingLat = sighting?.location?.latitude
  const sightingLng = sighting?.location?.longitude

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Toestemming voor locatie geweigerd")
        return
      }

      const currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)

      // Zoom to user's location
      mapRef.current?.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      )
    } catch (error) {
      setErrorMsg("Kon locatie niet ophalen")
    }
  }

  useEffect(() => {
    requestLocation()
  }, [])

  // 👇 Optionally zoom to sighting when screen opens
  useEffect(() => {
    if (sightingLat && sightingLng && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: sightingLat,
          longitude: sightingLng,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        },
        1000
      )
    }
  }, [sightingLat, sightingLng])

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Kaart" />
      </Appbar.Header>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: sightingLat || 52.3676,   // fallback: Amsterdam
          longitude: sightingLng || 4.9041,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* 👇 Sighting Marker */}
        {sightingLat && sightingLng && (
          <Marker
            coordinate={{
              latitude: sightingLat,
              longitude: sightingLng,
            }}
            title={sighting.witnessName || "Onbekende getuige"}
            description={sighting.description || ""}
          />
        )}

        {/* 👇 User Location Marker */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="blue"
            title="Uw Locatie"
          />
        )}
      </MapView>

      <Button mode="contained" onPress={requestLocation} style={styles.button} icon="crosshairs-gps">
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
})
