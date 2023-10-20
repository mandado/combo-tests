import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import NearPlaces from './near-places';
import { usePlaceContext } from '../../core/contexts/PlaceContext';

export default function PlaceCard() {
  const { selectedPlace: place } = usePlaceContext();

  if (!place) {
    return null;
  }

  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <div className="rounded-lg bg-zinc-800 shadow-sm ring-1 ring-zinc-50/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-2xl font-semibold leading-6 text-zinc-50">
              {place.name}
            </dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-zinc-100">
              {place.description}
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-zinc-50/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Country</span>
              <UserCircleIcon
                className="h-6 w-5 text-zinc-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm font-medium leading-6 text-zinc-50">
              {place.country}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Climate</span>
              <CalendarDaysIcon
                className="h-6 w-5 text-zinc-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-zinc-500">
              <time dateTime="2023-01-31">{place.climate}</time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Currency</span>
              <CreditCardIcon
                className="h-6 w-5 text-zinc-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-zinc-500">
              {' '}
              {place.currency}
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-zinc-50/5 px-6 py-6">
          <NearPlaces />
        </div>
      </div>
    </div>
  );
}
