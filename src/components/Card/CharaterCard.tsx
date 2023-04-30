import React from 'react';
import classNames from 'classnames';
import { CardType } from '../types';
import './CharaterCard.scss';

interface Props {
  card: CardType;
}

export const Card: React.FC<Props> = (props) => {
  const { card } = props;
  const {
    image,
    origin,
    name,
    status,
  } = card;

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            className="characterCard__img"
            src={image}
            alt={card.name}
          />

          <div className={classNames('characterCard__status',
            { characterCard__status_red: status === 'Dead' },
            { characterCard__status_gray: status === 'unknown' })}
          >
            {status}
          </div>
        </figure>
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-left" />
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">
          <div className="characterCard__location">
            <span className="characterCard__location-title">
              Location:
            </span>

            {` ${origin.name}`}
          </div>
        </div>
      </div>
    </div>
  );
};
