import React, { useMemo, useState } from 'react';
import './App.scss';
import { Oval } from 'react-loader-spinner';
import { CardStats } from './components/CardStats/CardStats';
import {
  CardsFilterSelect,
} from './components/CardsFilterSelect/CardsFilterSelect';
import {
  GENRES_CARD as filterByGenres,
  STATUS_CARD as filterByStatus,
  SPECIES_CARD as filterBySpecies,
} from './components/mockData.typedefs';
import { useCards } from './hooks/useCards';
import { useFilters } from './hooks/useFilters';
import { CardsList } from './components/CardsList/CardsList';

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { isLoading, handleLoad, cards } = useCards();
  const {
    preparedCards,
    selectedFilters,
    selectedStatus,
    selectedGenders,
    setSelectedStatus,
    setSelectedGenders,
    setSelectedSpecies,
  } = useFilters({ cards });

  const isPending = useMemo(() => (!isLoading && !preparedCards.length), []);

  return (
    <div className="App__wrapper">
      <div className="App__CharacterFilters">
        <CardsFilterSelect
          selectedFilters={selectedFilters}
          onChange={setSelectedSpecies}
          filters={filterBySpecies}
          placeholder="Select species"
        />

        <CardsFilterSelect
          selectedFilters={selectedStatus}
          onChange={setSelectedStatus}
          filters={filterByStatus}
          placeholder="Select status"
        />

        <CardsFilterSelect
          selectedFilters={selectedGenders}
          onChange={setSelectedGenders}
          filters={filterByGenres}
          placeholder="Select genders"
        />
      </div>

      {isPending && (
        <h2 className="App__noCharacters">
          Have not characters
        </h2>
      )}

      <CardsList
        onChange={setSelectedId}
        cards={preparedCards}
      />

      {isPending && (
        <Oval
          color="#000"
          wrapperClass="App__loader"
          height={150}
          width={150}
        />
      )}

      {selectedId && (
        <CardStats
          selectedId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      <button
        className="button is-fullwidth"
        type="button"
        onClick={handleLoad}
        disabled={isLoading}
      >
        Load more
      </button>
    </div>
  );
};
