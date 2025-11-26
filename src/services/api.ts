import { Ufo } from "../types/Ufo";

const API_UFO = "https://sampleapis.assimilate.be/ufo/sightings";

export const api = {
  async getSightings(): Promise<Ufo[]> {
    try {
      const response = await fetch(API_UFO);
      if (!response.ok) {
        throw new Error("Failed to fetch sightings");
      }
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        dateTime: new Date(item.dateTime || Date.now()),
      }));
    } catch (error) {
      console.error("Error fetching sightings:", error);
      throw error;
    }
  },
};