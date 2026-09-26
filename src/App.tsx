import { useState } from "react";
import "./App.css";
import { ANIMALS_PACK } from "./data/pack";
import type { CardState, ResultInfo, Screen } from "./types";
import StartMenu from "./components/StartMenu";
import GameBoard from "./components/GameBoard";
import ConfirmGuessModal from "./components/ConfirmGuessModal";
import ResultScreen from "./components/ResultScreen";

const CARDS = ANIMALS_PACK;

function drawSecretCard(): string {
  return CARDS[Math.floor(Math.random() * CARDS.length)].id;
}

function initialCardStates(): Record<string, CardState> {
  return Object.fromEntries(CARDS.map((c) => [c.id, "inplay" as CardState]));
}

const STATE_CYCLE: CardState[] = ["inplay", "eliminated", "maybe"];

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [secretCardId, setSecretCardId] = useState<string>("");
  const [cardStates, setCardStates] = useState<Record<string, CardState>>(initialCardStates);
  const [guessMode, setGuessMode] = useState(false);
  const [pendingGuessId, setPendingGuessId] = useState<string | null>(null);
  const [result, setResult] = useState<ResultInfo | null>(null);

  function startNewGame() {
    setSecretCardId(drawSecretCard());
    setCardStates(initialCardStates());
    setGuessMode(false);
    setPendingGuessId(null);
    setResult(null);
    setScreen("board");
  }

  function handleCardTap(id: string) {
    setCardStates((prev) => {
      const current = prev[id] ?? "inplay";
      const next = STATE_CYCLE[(STATE_CYCLE.indexOf(current) + 1) % STATE_CYCLE.length];
      return { ...prev, [id]: next };
    });
  }

  function handleConfirmGuess(correct: boolean) {
    if (!pendingGuessId) return;
    setResult({ won: correct, guessedCardId: pendingGuessId });
    setGuessMode(false);
    setScreen("result");
  }

  const secretCard = CARDS.find((c) => c.id === secretCardId) ?? CARDS[0];
  const guessedCard = pendingGuessId
    ? CARDS.find((c) => c.id === pendingGuessId) ?? CARDS[0]
    : CARDS[0];
  const resultGuessedCard = result ? CARDS.find((c) => c.id === result.guessedCardId) ?? CARDS[0] : CARDS[0];

  return (
    <div className="app-shell">
      {screen === "start" && <StartMenu onStart={startNewGame} />}

      {screen === "board" && (
        <GameBoard
          cards={CARDS}
          secretCard={secretCard}
          cardStates={cardStates}
          onCardTap={handleCardTap}
          guessMode={guessMode}
          onEnterGuessMode={() => setGuessMode(true)}
          onCancelGuess={() => setGuessMode(false)}
          onConfirmGuess={(id) => setPendingGuessId(id)}
        />
      )}

      {screen === "board" && guessMode && pendingGuessId && (
        <ConfirmGuessModal
          card={guessedCard}
          onConfirm={handleConfirmGuess}
          onBack={() => setPendingGuessId(null)}
        />
      )}

      {screen === "result" && result && (
        <ResultScreen
          result={result}
          guessedCard={resultGuessedCard}
          onPlayAgain={startNewGame}
          onMainMenu={() => setScreen("start")}
        />
      )}
    </div>
  );
}

export default App;
