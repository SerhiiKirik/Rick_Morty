import { useCallback, useEffect, useState } from 'react';
import { CardType } from '../../types';
import { getSelectedCharacter } from '../../../api/api';

interface Options {
  selectedId: number;
}

export const useCardStats = (options: Options) => {
  const { selectedId } = options;

  const [character, setCharacter] = useState<CardType | null>(null);
  const [lastEpisode, setLastEpisode] = useState('');

  const getStats = useCallback(async () => {
    try {
      const stat = await getSelectedCharacter(selectedId);

      setCharacter(stat);
    } catch {
      throw new Error('can\'t get stats');
    }
  }, []);

  useEffect(() => {
    getStats();

    if (character?.episode) {
      fetch(character?.episode[character?.episode.length - 1])
        .then(data => data.json())
        .then(data => setLastEpisode(data.name));
    }
  }, [selectedId]);

  return {
    lastEpisode,
    character,
  };
};
