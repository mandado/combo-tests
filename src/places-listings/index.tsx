import { PlaceProvider } from '../core/contexts/PlaceContext';
import { PlacesComboBox } from './components/combo-box';
import PlaceCard from './components/place-card';

export default function PlaceListings() {
  return (
    <PlaceProvider>
      <div className="h-full flex justify-center items-center">
        <div className="w-full gap-10 flex-col flex justify-center items-center max-w-screen-md">
          <PlacesComboBox />
          <PlaceCard />
        </div>
      </div>
    </PlaceProvider>
  );
}
