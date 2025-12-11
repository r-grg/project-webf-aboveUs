// src/services/api.ts
import { Ufo } from "../types/Ufo";

const API_UFO = "https://sampleapis.assimilate.be/ufo/sightings";

export const api = {
  async getSightings(): Promise<Ufo[]> {
    try {
      const response = await fetch(API_UFO);
      if (!response.ok) {
        throw new Error("Kon sightings niet ophalen.");
      }
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        dateTime: new Date(item.dateTime || Date.now()),
      }));
    } catch (error) {
      console.error("Fout tijdens het ophalen van sightings:", error);
      throw error;
    }
  },

  async createSighting(newSighting: Omit<Ufo, "id">): Promise<Ufo> {
    try {
      const response = await fetch(API_UFO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSighting),
      });

      console.log("POST /ufo/sightings status:", response.status);

      // Als de demo-API POST niet accepteert (bijv. 404/405/500)
      if (!response.ok) {
        console.warn(
          "API accepteert POST niet (read-only?). Gebruik lokale fallback."
        );
        return {
          ...newSighting,
          id: Date.now(),
          dateTime: new Date(),
        } as Ufo;
      }

      const created = await response.json();

      return {
        ...created,
        dateTime: new Date(created.dateTime || Date.now()),
      };
    } catch (error) {
      console.error("Fout tijdens POST request:", error);
      return {
        ...newSighting,
        id: Date.now(),
        dateTime: new Date(),
      } as Ufo;
    }
  },
};
