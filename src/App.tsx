import { ComboBox, Item, useAsyncList } from '@adobe/react-spectrum'
import './App.css'
import { Place, Places, fetchApi } from './fake-api';
import { useState } from 'react';
import PlaceCard from './components/place-card';

function App() {
  const [place, setPlace] = useState<Place | null>(null);

  const list = useAsyncList<Place>({
    getKey: item => item.name,
    async load({ filterText, cursor }) {
      let data: Places = []

      if (filterText && filterText !== '') {
        const response = await fetchApi();

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

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full flex-col flex justify-center items-center max-w-screen-md">
        <ComboBox
          label="Location"
          items={list.items}
          inputValue={list.filterText}
          onInputChange={list.setFilterText}
          loadingState={list.loadingState}
          onLoadMore={list.loadMore}
          onSelectionChange={(key) => {
            setPlace(
              list.getItem(key)
            )
          }}
        >
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </ComboBox>

        <div className='flex mt-10'>
          {place && <PlaceCard place={place} />}
        </div>
      </div>
    </div>
  )
}

export default App
