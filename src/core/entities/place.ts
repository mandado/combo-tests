import { PlaceItem } from "../../types/places";
import haversine from 'haversine-distance'

type PlaceProps = PlaceItem & { distance: number }

export class Place {
  constructor(private data: PlaceProps) {}

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get description() {
    return this.data.description;
  }

  get country() {
    return this.data.country;
  }

  get climate() {
    return this.data.climate;
  }

  get currency() {
    return this.data.currency;
  }

  get coordinates() {
    return { 
      latitude: this.data.latitude, 
      longitude: this.data.longitude 
    }
  }

  get latitude() {
    return this.data.latitude;
  }

  get longitude() {
    return this.data.longitude;
  }

  get distance() {
    return this.data.distance;
  }

  static create(data: PlaceProps) {
    return new Place(data);
  }

  createWithDistance(referencePlace: Place) {
    const distance = haversine(this.coordinates, {
      latitude: referencePlace.latitude,
      longitude: referencePlace.longitude
    }) ?? 0;

    return new Place({
      ...this.data,
      distance
    });
  }
}