import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Place } from '../entities/place';

type PlaceContextProps = {
  selectedPlace: Place | null;
  error: string | null;
  setSelectedPlace: (place: Place | null) => void;
  setErrorMessage: (message: string | null) => void;
};

const PlaceContext = createContext<PlaceContextProps>({
  selectedPlace: null,
  error: null,
  setSelectedPlace: () => {},
  setErrorMessage: () => {},
});

export function PlaceProvider({ children }: PropsWithChildren) {
  const [selectedPlace, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setSelectedPlace = (place: Place | null) => setPlace(place);
  const setErrorMessage = (message: string | null) => setError(message);

  return (
    <PlaceContext.Provider
      value={{ setSelectedPlace, setErrorMessage, error, selectedPlace }}
    >
      {children}
    </PlaceContext.Provider>
  );
}

export const usePlaceContext = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error('usePlaceContext must be used inside of ThemeProvider');
  }
  return context;
};
