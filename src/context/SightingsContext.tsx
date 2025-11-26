import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/api"
import type { Ufo } from "../types/Ufo"

type SightingsContextValue = {
  sightings: Ufo[]
  favorites: number[]
  loading: boolean
  toggleFavorite: (id: number) => void
  createLocalSighting: (sighting: Omit<Ufo, "id">) => Promise<void>
}

const SightingsContext = createContext<SightingsContextValue | undefined>(undefined)

const LOCAL_SIGHTINGS_KEY = "local_sightings"

export const SightingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [remoteSightings, setRemoteSightings] = useState<Ufo[]>([])
  const [localSightings, setLocalSightings] = useState<Ufo[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  // Load remote + local on mount
  useEffect(() => {
    const load = async () => {
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
        }
      } catch (e) {
        console.error("Error loading sightings:", e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const sightings = [...localSightings, ...remoteSightings]

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const createLocalSighting = async (sighting: Omit<Ufo, "id">) => {
    // generate a negative id for local-only items
    const minId = localSightings.reduce((min, s) => Math.min(min, s.id), 0)
    const newId = minId <= 0 ? minId - 1 : -1

    const fullSighting: Ufo = {
      ...sighting,
      id: newId,
    }

    const updatedLocal = [fullSighting, ...localSightings]
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
        createLocalSighting,
      }}
    >
      {children}
    </SightingsContext.Provider>
  )
}

export const useSightings = () => {
  const ctx = useContext(SightingsContext)
  if (!ctx) throw new Error("useSightings must be used within SightingsProvider")
  return ctx
}
