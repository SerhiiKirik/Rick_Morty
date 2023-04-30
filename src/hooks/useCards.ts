import { useCallback, useEffect, useState } from 'react';
import { getMoreCharacters } from '../api/api';
import { CardType } from '../components/types';

export const useCards = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<CardType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getMoreData = useCallback(async () => {
    setIsLoading(true);

    try {
      const newCards = await getMoreCharacters(pageNumber);

      setCards(newCards.results);
    } catch (e) {
      throw new Error('Something went wrong with loading more cards');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(true);

    setPageNumber(currentPageNumber => {
      const newPageNumber = currentPageNumber + 1;

      getMoreCharacters(newPageNumber)
        .then(data => {
          setCards(prevData => [...prevData, ...data.results]);
          setIsLoading(false);
        });

      return newPageNumber;
    });
  }, []);

  useEffect(() => {
    getMoreData();
  }, []);

  return {
    isLoading,
    cards,
    handleLoad,
  };
};
