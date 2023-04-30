import React from 'react';
import { CardType } from '../types';
import { Card } from '../Card/CharaterCard';
import './CardsList.scss';

type Props = {
  onChange: (id: number | null) => void;
  cards: CardType[];
};

export const CardsList: React.FC<Props> = ({
  cards,
  onChange,
}) => {
  return (
    <div className="characterList">
      {cards.map(card => (
        // eslint-disable-next-line react/button-has-type
        <button
          className="characterCard"
          key={card.id}
          onClick={() => onChange(card.id)}
        >
          <Card card={card} />
        </button>
      ))}
    </div>
  );
};
