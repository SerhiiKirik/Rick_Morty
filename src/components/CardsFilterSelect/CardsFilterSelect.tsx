import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { ReactSelectOption } from '../types';

interface Props {
  selectedFilters: MultiValue<ReactSelectOption<string>>;
  onChange: (filters: MultiValue<ReactSelectOption<string>>) => void;
  placeholder: string;
  filters: string[];
}

export const CardsFilterSelect: React.FC<Props> = ({
  selectedFilters,
  onChange,
  placeholder,
  filters,
}) => {
  const [
    options,
    setOptions,
  ] = useState<MultiValue<ReactSelectOption<string>>>([]);

  useEffect(() => {
    setOptions(filters.map(type => ({
      value: type,
      label: type,
    })));
  }, []);

  return (
    <div className="App__filters">
      <Select
        options={options}
        isMulti
        value={selectedFilters}
        onChange={(event) => onChange(event)}
        placeholder={placeholder}
      />
    </div>
  );
};
