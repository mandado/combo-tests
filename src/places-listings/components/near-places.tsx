import { ActionButton, Flex, useAsyncList } from '@adobe/react-spectrum';
import { Place } from '../../core/entities/place';
import { PlacesService } from '../../core/services/PlacesService';
import { usePlaceContext } from '../../core/contexts/PlaceContext';
import { useCallback, useEffect } from 'react';

export default function NearPlaces() {
  const { selectedPlace: place, setSelectedPlace } = usePlaceContext();

  const places = useAsyncList<Place>({
    async load() {
      if (!place) {
        return {
          items: [],
        };
      }

      const placesService = new PlacesService();
      const nearPlaces = await placesService.fetchNearPlaces(place);

      return {
        items: nearPlaces.slice(0, 5),
      };
    },
  });

  const updateDetail = useCallback(
    (item: Place) => {
      setSelectedPlace(item);
      places.reload();
    },
    [places, setSelectedPlace],
  );

  useEffect(() => {
    if (place) {
      places.reload();
    }
  }, [place]);

  return places.isLoading ? (
    <>Loading</>
  ) : (
    <Flex direction="row" wrap="wrap" width="100%" gap="size-100">
      {places.items.map((item) => (
        <ActionButton onPress={() => updateDetail(item)} key={item.id}>
          {item.name}
        </ActionButton>
      ))}
    </Flex>
  );
}
