"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Ufo } from "../types/Ufo"
import { api } from "../services/api"
import { storage } from "../services/storage"

interface SightingsContextType {
  sightings: Ufo[]
  favorites: number[]
  //drafts: any[]
  loading: boolean
  error: string | null
  toggleFavorite: (id: number) => void
  //addDraft: (draft: any) => void
  //removeDraft: (index: number) => void
  refreshSightings: () => Promise<void>
}

const SightingsContext = createContext<SightingsContextType | undefined>(undefined)

export const SightingsProvider = ({ children }: { children: ReactNode }) => {
  const [sightings, setSightings] = useState<Ufo[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  //const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [fetchedSightings, storedFavorites] = await Promise.all([
        api.getSightings(),
        storage.getFavorites(),
        //storage.getDrafts(),
      ])
      setSightings(fetchedSightings)
      setFavorites(storedFavorites)
      //setDrafts(storedDrafts)
      setError(null)
    } catch (err) {
      setError("Failed to load data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  const toggleFavorite = async (id: number) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id]
    setFavorites(newFavorites)
    await storage.saveFavorites(newFavorites)
  }

  // const addDraft = async (draft: any) => {
  //   const newDrafts = [...drafts, draft]
  //   setDrafts(newDrafts)
  //   await storage.saveDrafts(newDrafts)
  // }

  // const removeDraft = async (index: number) => {
  //   const newDrafts = drafts.filter((_, i) => i !== index)
  //   setDrafts(newDrafts)
  //   await storage.saveDrafts(newDrafts)
  // }

  const refreshSightings = async () => {
    try {
      setLoading(true)
      const fetchedSightings = await api.getSightings()
      setSightings(fetchedSightings)
      setError(null)
    } catch (err) {
      setError("Failed to refresh data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SightingsContext.Provider
      value={{
        sightings,
        favorites,
        //drafts,
        loading,
        error,
        toggleFavorite,
        //addDraft,
        //removeDraft,
        refreshSightings,
      }}
    >
      {children}
    </SightingsContext.Provider>
  )
}

export const useSightings = () => {
  const context = useContext(SightingsContext)
  if (!context) {
    throw new Error("useSightings must be used within SightingsProvider")
  }
  return context
}