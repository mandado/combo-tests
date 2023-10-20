import { ComboBox, Item, useAsyncList } from '@adobe/react-spectrum';
import { useEffect, useState } from 'react';
import './App.css';
import PlaceCard from './components/place-card';
import { Place } from './core/entities/place';
import { PlacesService } from './core/services/PlacesService';

function App() {

  const [place, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState<string | null>(null);

  const list = useAsyncList<Place>({
    getKey: item => item.name,
    async load({ filterText, cursor }) {
      const service = new PlacesService();
      let data: Place[] = []

      if (filterText && filterText === 'fail') {
        console.log('filterText', filterText)
        throw new Error('Failed to load places');
      }

      if (filterText && filterText !== '') {
        const response = await service.getPlaces();

        data = data.concat(
          response.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()))
        )
      }

      return {
        items: filterText === '' ? [] : data,
        cursor: cursor ?? undefined,
      };
    }
  });

  useEffect(() => {
    if (list.error) {
      setError(list.error.message)
      setTimeout(() => setError(null), 3000);
    }
  }, [list.error])

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full flex-col flex justify-center items-center max-w-screen-md">
        <ComboBox
          width={300}
          label="Location"
          items={list.items}
          inputValue={list.filterText}
          onInputChange={list.setFilterText}
          loadingState={list.loadingState}
          onLoadMore={list.loadMore}
          onSelectionChange={(key) => {
            console.log('key', key)
            setPlace(
              list.getItem(key)
            )
          }}
        >
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </ComboBox>

        <div className='flex mt-10'>
          {place && <PlaceCard place={place} />}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default App
