import { Ufo } from "../types/Ufo";

const API_UFO = "https://sampleapis.assimilate.be/ufo/sightings"

export const api = {
  async getSightings(): Promise<Ufo[]> {
    try {
      const response = await fetch(API_UFO )
      if (!response.ok) {
        throw new Error("Failed to fetch sightings")
      }
      const data = await response.json()
      return data.map((item: any) => ({
        ...item,
        dateTime: new Date(item.dateTime || Date.now()),
      }))
    } catch (error) {
      console.error("Error fetching sightings:", error)
      throw error
    }
  },

  async createSighting(sighting: Omit<Ufo, "id">): Promise<Ufo> {
    try {
      const response = await fetch(API_UFO , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sighting),
      })
      if (!response.ok) {
        throw new Error("Failed to create sighting")
      }
      return await response.json()
    } catch (error) {
      console.error("Error creating sighting:", error)
      throw error
    }
  },

  async updateSighting(id: number, sighting: Partial<Ufo>): Promise<Ufo> {
    try {
      const response = await fetch(`${API_UFO }/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sighting),
      })
      if (!response.ok) {
        throw new Error("Failed to update sighting")
      }
      return await response.json()
    } catch (error) {
      console.error("Error updating sighting:", error)
      throw error
    }
  },
}