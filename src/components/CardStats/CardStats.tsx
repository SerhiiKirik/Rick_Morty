import React from 'react';
import { Oval } from 'react-loader-spinner';
import './CardStats.scss';
import { useCardStats } from './hooks/useCardStats';

type Props = {
  selectedId: number;
  onClose: () => void;
};

export const CardStats: React.FC<Props> = ({
  selectedId,
  onClose,
}) => {
  const { character, lastEpisode } = useCardStats({ selectedId });

  if (!character) {
    return (
      <div className="characterStats__content">
        <Oval
          color="#000"
          height={150}
          width={150}
        />
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="blur"
        onClick={onClose}
      />

      <div className="characterStats__content">

        <button
          type="button"
          className="characterStats__closeBtn"
          onClick={onClose}
        >
          X
        </button>

        <img
          className="characterStats__img"
          src={`${character.image}`}
          alt={`${character.name}`}
        />

        <div className="characterStats__content__name">
          {character.name}
        </div>

        <table className="characterStats">
          <tbody>
            <tr>
              <td className="characterStats__name">
                <span className="characterStats__info">
                  Gender:
                  {' '}
                  {character.gender}
                </span>
              </td>

              <td className="characterStats__stat">
                <span className="characterStats__info">
                  Species:
                  {' '}
                  {character.species}
                </span>
              </td>

              <td className="characterStats__stat">
                <span className="characterStats__info">
                  Location:
                  {' '}
                  {character.origin.name}
                </span>
              </td>

              {lastEpisode && (
                <td className="characterStats__stat">
                  <span className="characterStats__info">
                    Last episode:
                    {' '}
                    {lastEpisode}
                  </span>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
