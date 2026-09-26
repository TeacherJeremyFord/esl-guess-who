import type { VocabCard } from "../data/pack";
import type { CardState } from "../types";
import CardGridCanvas from "./CardGridCanvas";
import SecretPanel from "./SecretPanel";

interface Props {
  cards: VocabCard[];
  secretCard: VocabCard;
  cardStates: Record<string, CardState>;
  onCardTap: (id: string) => void;
  guessMode: boolean;
  onEnterGuessMode: () => void;
  onCancelGuess: () => void;
  onConfirmGuess: (id: string) => void;
}

export default function GameBoard({
  cards,
  secretCard,
  cardStates,
  onCardTap,
  guessMode,
  onEnterGuessMode,
  onCancelGuess,
  onConfirmGuess,
}: Props) {
  return (
    <div className="screen board-screen">
      <div className="board-top">
        <SecretPanel card={secretCard} />
        <div className="board-actions">
          {!guessMode ? (
            <button className="primary-btn guess-btn" onClick={onEnterGuessMode}>
              Make a Guess
            </button>
          ) : (
            <>
              <div className="guess-banner">Tap the card you think is your partner's secret card</div>
              <button className="secondary-btn" onClick={onCancelGuess}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid-host">
        <CardGridCanvas
          cards={cards}
          cardStates={cardStates}
          onCardTap={guessMode ? onConfirmGuess : onCardTap}
        />
      </div>
      <p className="hint">
        Tap a card to cycle: in play &rarr; not it (blue X) &rarr; maybe &rarr; in play.
      </p>
    </div>
  );
}
