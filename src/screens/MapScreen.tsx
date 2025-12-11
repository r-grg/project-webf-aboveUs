//src\screens\MapScreen.tsx
"use client"
import { useState, useRef, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { Appbar, Text, Button } from "react-native-paper"
import MapView, { Marker, Region } from "react-native-maps"
import * as Location from "expo-location"
import { useFocusEffect } from "@react-navigation/native"
import type { Ufo } from "../types/Ufo"

interface MapScreenProps {
  route: { params?: { sighting?: Ufo } }
}

export const MapScreen = ({ route }: MapScreenProps) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const mapRef = useRef<MapView | null>(null)

  const sighting = route?.params?.sighting
  const sightingLatRaw = sighting?.location?.latitude
  const sightingLngRaw = sighting?.location?.longitude

  const sightingLat =
    typeof sightingLatRaw === "number" ? sightingLatRaw : Number(sightingLatRaw)
  const sightingLng =
    typeof sightingLngRaw === "number" ? sightingLngRaw : Number(sightingLngRaw)

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
      let currentLocation = await Location.getLastKnownPositionAsync()
      if (!currentLocation) {
        currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest,
        })
      }
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
        1000,
      )
    } catch (error) {
      setErrorMsg("Kon locatie niet ophalen")
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (hasSightingLocation && mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: sightingLat,
            longitude: sightingLng,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          },
          1000,
        )
      }
    }, [hasSightingLocation, sightingLat, sightingLng]),
  )

  const initialRegion: Region = hasSightingLocation
    ? {
        latitude: sightingLat,
        longitude: sightingLng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 51.2194,
        longitude: 4.4025,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
          <Text variant="headlineLarge" style={{ color: "black" }}>
            Kaart
          </Text>
        </View>
      </Appbar.Header>
      <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
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
            title="Uw Locatie"
          />
        )}
      </MapView>
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
})
