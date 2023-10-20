import { ComboBox, Item, useAsyncList } from '@adobe/react-spectrum';
import { useEffect } from 'react';
import { usePlaceContext } from '../../core/contexts/PlaceContext';
import { Place } from '../../core/entities/place';
import { PlacesService } from '../../core/services/PlacesService';

export function PlacesComboBox() {
  const { setErrorMessage, error, selectedPlace, setSelectedPlace } =
    usePlaceContext();

  const list = useAsyncList<Place>({
    getKey: (item) => item.name,
    initialFilterText: selectedPlace?.name,
    initialSelectedKeys: selectedPlace ? [selectedPlace.name] : [],
    async load({ filterText, cursor }) {
      const service = new PlacesService();
      let data: Place[] = [];

      if (filterText && filterText === 'fail') {
        throw new Error('Failed to load places');
      }

      if (filterText && filterText !== '') {
        const response = await service.getPlaces();

        data = data.concat(
          response.filter((item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase()),
          ),
        );
      }

      return {
        items: filterText === '' ? [] : data,
        cursor: cursor ?? undefined,
      };
    },
  });

  useEffect(() => {
    if (list.error) {
      setErrorMessage(list.error.message);
      setSelectedPlace(null);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  }, [list.error]);

  useEffect(() => {
    if (selectedPlace) {
      list.setFilterText(selectedPlace.name);
      list.setSelectedKeys(new Set([selectedPlace.name]));
    }
  }, [selectedPlace]);

  return (
    <>
      <ComboBox
        width={300}
        label="Location"
        items={list.items}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
        onSelectionChange={(key) => {
          setSelectedPlace(list.getItem(key));
        }}
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </ComboBox>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
