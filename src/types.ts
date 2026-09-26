export type CardState = "inplay" | "eliminated" | "maybe";

export type Screen = "start" | "board" | "guess" | "result";

export interface Session {
  secretCardId: string;
  cardStates: Record<string, CardState>;
}

export interface ResultInfo {
  won: boolean;
  guessedCardId: string;
}
