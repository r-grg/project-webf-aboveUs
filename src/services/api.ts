import { Ufo } from "../types/Ufo"

const API_UFO = "https://sampleapis.assimilate.be/ufo/sightings"
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhYmluLmd1cnVuZ0BzdHVkZW50LmFwLmJlIiwiaWF0IjoxNzY1NzA1MTYxfQ.FCjepmro-Cqq5ywluXt8DfegK2HvrpmvEBNkgiHiRGI"

export const api = {
  async getSightings(): Promise<Ufo[]> {
    const response = await fetch(API_UFO)
    if (!response.ok) throw new Error("Kon sightings niet ophalen.")
    const data = await response.json()

    return data.map((item: any) => ({
      ...item,
      dateTime: typeof item.dateTime === "string" ? item.dateTime : new Date().toISOString(),
    }))
  },

  async createSighting(newSighting: Omit<Ufo, "id">): Promise<Ufo> {
    const response = await fetch(API_UFO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(newSighting),
    })

    const text = await response.text().catch(() => "")

    if (!response.ok) {
      return {
        ...newSighting,
        id: Date.now(),
        dateTime: new Date().toISOString(),
      }
    }

    const created = text ? JSON.parse(text) : {}
    return {
      ...created,
      dateTime: typeof created.dateTime === "string" ? created.dateTime : new Date().toISOString(),
    } as Ufo
  },
}
