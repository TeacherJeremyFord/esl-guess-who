import type { VocabCard } from "../data/pack";

interface Props {
  card: VocabCard;
}

export default function SecretPanel({ card }: Props) {
  return (
    <div className="secret-panel">
      <div className="secret-label">Your secret card</div>
      <div className="secret-card">
        <div className="secret-emoji">{card.emoji}</div>
        <div className="secret-word">{card.word}</div>
      </div>
      <div className="secret-note">Don't show this to your partner!</div>
    </div>
  );
}
