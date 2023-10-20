import { useAsyncList } from '@adobe/react-spectrum'
import { Place } from '../core/entities/place'
import { PlacesService } from '../core/services/PlacesService'

export default function NearPlaces({ place }: { place: Place }) {
  const places = useAsyncList<Place>({
    async load() {
      const placesService = new PlacesService()
      const nearPlaces = await placesService.fetchNearPlaces(place)

      return {
        items: nearPlaces
      }
    }
  })

  return places.isLoading ? 'Loading' : (
    <div>
      {places.items?.[0]?.name}
    </div>
  )
}
