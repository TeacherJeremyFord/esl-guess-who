import type { VocabCard } from "../data/pack";

interface Props {
  card: VocabCard;
  onConfirm: (correct: boolean) => void;
  onBack: () => void;
}

export default function ConfirmGuessModal({ card, onConfirm, onBack }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-emoji">{card.emoji}</div>
        <h2>Guessing: {card.word}</h2>
        <p>Ask your partner &mdash; was that their secret card?</p>
        <p className="modal-note">
          v1 is honor system: your partner confirms out loud, you tap the answer.
        </p>
        <div className="modal-actions">
          <button className="primary-btn win-btn" onClick={() => onConfirm(true)}>
            Yes, correct!
          </button>
          <button className="secondary-btn" onClick={() => onConfirm(false)}>
            No, wrong
          </button>
        </div>
        <button className="link-btn" onClick={onBack}>
          Back to board
        </button>
      </div>
    </div>
  );
}
