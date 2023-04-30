export interface CardType {
  id: number;
  name: string;
  image: string;
  gender: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  episode: string[];
}

export interface CharacterCards {
  results: CardType[];
}

export interface LastEpisode {
  name: string | undefined;
}

export interface ReactSelectOption<T> {
  value: T;
  label: string;
}

export interface Filters {
  firstSelect: string;
  secondSelect: string;
  thirdSelect: string;
}
