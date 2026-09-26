import type { VocabCard } from "../data/pack";
import type { ResultInfo } from "../types";

interface Props {
  result: ResultInfo;
  guessedCard: VocabCard;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function ResultScreen({ result, guessedCard, onPlayAgain, onMainMenu }: Props) {
  return (
    <div className="screen result-screen">
      <div className="result-emoji">{result.won ? "\u{1F389}" : "\u{1F614}"}</div>
      <h1>{result.won ? "You Win!" : "Not Quite"}</h1>
      <p>
        You guessed <strong>{guessedCard.word}</strong> {guessedCard.emoji}
      </p>
      <div className="result-actions">
        <button className="primary-btn" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="secondary-btn" onClick={onMainMenu}>
          Main Menu
        </button>
      </div>
    </div>
  );
}
