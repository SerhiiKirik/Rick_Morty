import { useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { CardType, ReactSelectOption } from '../components/types';
import { isIncludes } from '../components/helpers/helpers';

interface Options {
  cards: CardType[];
}

export const useFilters = (options: Options) => {
  const { cards } = options;
  const [
    selectedSpecies,
    setSelectedSpecies,
  ] = useState<MultiValue<ReactSelectOption<string>>>([]);
  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<MultiValue<ReactSelectOption<string>>>([]);
  const [
    selectedGenders,
    setSelectedGenders,
  ] = useState<MultiValue<ReactSelectOption<string>>>([]);

  const preparedCards = useMemo(() => {
    const preparedSpecies = selectedSpecies.map(filter => filter.value);
    const preparedGenders = selectedGenders.map(filter => filter.value);
    const preparedStatus = selectedStatus.map(filter => filter.value);

    const filterBySpecies = cards.filter(character => {
      const { species, gender, status } = character;

      const isFilterChosen = preparedSpecies.length
        ? isIncludes(preparedSpecies, species)
        : true;

      const isGenderChosen = preparedGenders.length
        ? isIncludes(preparedGenders, gender)
        : true;

      const isStatusChosen = preparedStatus.length
        ? isIncludes(preparedStatus, status)
        : true;

      return isFilterChosen && isGenderChosen && isStatusChosen;
    });

    return filterBySpecies;
  }, [selectedSpecies, cards, selectedStatus, selectedGenders]);

  return {
    preparedCards,
    selectedFilters: selectedSpecies,
    selectedStatus,
    selectedGenders,
    setSelectedSpecies,
    setSelectedStatus,
    setSelectedGenders,
  };
};
