import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/api"
import type { Ufo } from "../types/Ufo"

type SightingsContextValue = {
  sightings: Ufo[]
  favorites: number[]
  loading: boolean
  toggleFavorite: (id: number) => void
  createRemoteSighting: (sighting: Omit<Ufo, "id">) => Promise<void>
  refreshSightings: () => Promise<void>
}

const SightingsContext = createContext<SightingsContextValue | undefined>(undefined)

const LOCAL_SIGHTINGS_KEY = "local_sightings"

export const SightingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [remoteSightings, setRemoteSightings] = useState<Ufo[]>([])
  const [localSightings, setLocalSightings] = useState<Ufo[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const loadSightings = async () => {
    try {
      setLoading(true)
      const [remote, localJson] = await Promise.all([
        api.getSightings(),
        AsyncStorage.getItem(LOCAL_SIGHTINGS_KEY),
      ])

      setRemoteSightings(remote)

      if (localJson) {
        const parsed: Ufo[] = JSON.parse(localJson)
        setLocalSightings(parsed)
      } else {
        setLocalSightings([])
      }
    } catch (e) {
      console.error("Fout tijdens het ophalen van sightings:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSightings()
  }, [])

  const refreshSightings = async () => {
    await loadSightings()
  }

  const sightings = [...localSightings, ...remoteSightings]

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const createRemoteSighting = async (sighting: Omit<Ufo, "id">) => {
    const created = await api.createSighting(sighting)
    const full: Ufo = {
      ...sighting,
      id: created.id ?? Date.now(),
      dateTime: created.dateTime ?? new Date(),
    }
    const updatedLocal = [full, ...localSightings]
    setLocalSightings(updatedLocal)
    await AsyncStorage.setItem(LOCAL_SIGHTINGS_KEY, JSON.stringify(updatedLocal))
  }

  return (
    <SightingsContext.Provider
      value={{
        sightings,
        favorites,
        loading,
        toggleFavorite,
        createRemoteSighting,
        refreshSightings,
      }}
    >
      {children}
    </SightingsContext.Provider>
  )
}

export const useSightings = () => {
  const ctx = useContext(SightingsContext)
  if (!ctx) throw new Error("useSightings kan alleen gebruikt worden binnen een SightingsProvider.")
  return ctx
}
