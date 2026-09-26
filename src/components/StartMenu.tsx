interface Props {
  onStart: () => void;
}

export default function StartMenu({ onStart }: Props) {
  return (
    <div className="screen start-screen">
      <h1>ESL Guess Who</h1>
      <p className="subtitle">Mode 1 &mdash; Head to Head</p>
      <p className="blurb">
        Each device gets its own secret card from the shared "Animals" pack.
        Ask your partner yes/no questions out loud, tap cards to mark them,
        then guess their card when you're ready.
      </p>
      <button className="primary-btn" onClick={onStart}>
        Start Game
      </button>
      <p className="hint">
        Playing with a partner? Open this page on a second device and each
        tap Start &mdash; your boards are independent.
      </p>
    </div>
  );
}
