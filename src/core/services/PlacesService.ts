import { sleep } from "../../utils";
import { places } from "../constants";
import { Place } from "../entities/place";

export class PlacesService {
  async getPlaces() {
    await sleep(1000)
    return places.map(item => Place.create({ ...item, distance: 0 }))
  }

  getPlace(id: number) {
    return places.find(place => place.id === id);
  }

  async fetchNearPlaces(currentPlace: Place) {
    const data = await this.getPlaces();


    return data
      .map(place => place.createWithDistance(currentPlace))
      .filter(item => item.id !== currentPlace.id)
      .sort((a, b) => a.distance - b.distance)
  }
}
