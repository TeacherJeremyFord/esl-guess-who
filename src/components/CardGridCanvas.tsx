import { useEffect, useRef } from "react";
import { Application, Container, Graphics, Text } from "pixi.js";
import type { VocabCard } from "../data/pack";
import type { CardState } from "../types";

interface Props {
  cards: VocabCard[];
  cardStates: Record<string, CardState>;
  onCardTap: (id: string) => void;
  disabledId?: string;
}

const ELIMINATED_COLOR = 0x2563eb; // blue — see game-design.md §5 (avoid red)
const MAYBE_COLOR = 0xf59e0b;
const BORDER_WIDTH = 5;
const GAP = 12;

export default function CardGridCanvas({ cards, cardStates, onCardTap, disabledId }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const cardContainersRef = useRef<Map<string, Container>>(new Map());
  const drawRef = useRef<() => void>(() => {});
  // Keep latest callback/state in refs so the draw loop set up once in the
  // mount effect always calls the current version, not a stale closure.
  const cardsRef = useRef(cards);
  const statesRef = useRef(cardStates);
  const tapRef = useRef(onCardTap);
  const disabledRef = useRef(disabledId);
  cardsRef.current = cards;
  statesRef.current = cardStates;
  tapRef.current = onCardTap;
  disabledRef.current = disabledId;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let destroyed = false;

    const app = new Application();
    appRef.current = app;

    const cols = Math.ceil(Math.sqrt(cardsRef.current.length));
    const rows = Math.ceil(cardsRef.current.length / cols);

    async function init() {
      await app.init({
        resizeTo: host!,
        backgroundAlpha: 0,
        antialias: true,
      });
      if (destroyed) {
        app.destroy(true, true);
        return;
      }
      host!.appendChild(app.canvas);

      const grid = new Container();
      app.stage.addChild(grid);

      cardsRef.current.forEach((card) => {
        const container = new Container();
        container.eventMode = "static";
        container.cursor = "pointer";
        container.on("pointertap", () => {
          if (disabledRef.current === card.id) return;
          tapRef.current(card.id);
        });
        grid.addChild(container);
        cardContainersRef.current.set(card.id, container);
      });

      drawRef.current = () => {
        layout();
        draw();
      };
      drawRef.current();
      app.renderer.on("resize", () => drawRef.current());
    }

    function layout() {
      const w = app.renderer.width;
      const h = app.renderer.height;
      const cellW = (w - GAP * (cols + 1)) / cols;
      const cellH = (h - GAP * (rows + 1)) / rows;
      const size = Math.max(20, Math.min(cellW, cellH));
      const gridW = size * cols + GAP * (cols - 1);
      const gridH = size * rows + GAP * (rows - 1);
      const offsetX = (w - gridW) / 2;
      const offsetY = (h - gridH) / 2;

      cardsRef.current.forEach((card, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const container = cardContainersRef.current.get(card.id);
        if (!container) return;
        container.position.set(offsetX + col * (size + GAP), offsetY + row * (size + GAP));
        (container as any).__size = size;
      });
    }

    function draw() {
      cardsRef.current.forEach((card) => {
        const container = cardContainersRef.current.get(card.id);
        if (!container) return;
        const size = (container as any).__size ?? 100;
        container.removeChildren();

        const state = statesRef.current[card.id] ?? "inplay";
        const bg = new Graphics();
        const fill = 0xffffff;
        bg.roundRect(0, 0, size, size, 10).fill({ color: fill });

        if (state === "eliminated") {
          bg.roundRect(0, 0, size, size, 10).stroke({ width: BORDER_WIDTH, color: ELIMINATED_COLOR });
        } else if (state === "maybe") {
          bg.roundRect(0, 0, size, size, 10).stroke({ width: BORDER_WIDTH, color: MAYBE_COLOR });
        } else {
          bg.roundRect(0, 0, size, size, 10).stroke({ width: 2, color: 0xd1d5db });
        }
        container.addChild(bg);

        const emoji = new Text({
          text: card.emoji,
          style: { fontSize: size * 0.45 },
        });
        emoji.anchor.set(0.5);
        emoji.position.set(size / 2, size * 0.4);
        emoji.alpha = state === "eliminated" ? 0.35 : 1;
        container.addChild(emoji);

        const label = new Text({
          text: card.word,
          style: { fontSize: Math.max(10, size * 0.11), fill: 0x1f2937, fontWeight: "600" },
        });
        label.anchor.set(0.5, 0);
        label.position.set(size / 2, size * 0.72);
        label.alpha = state === "eliminated" ? 0.4 : 1;
        container.addChild(label);

        if (state === "eliminated") {
          const x = new Graphics();
          const pad = size * 0.12;
          x.moveTo(pad, pad)
            .lineTo(size - pad, size - pad)
            .moveTo(size - pad, pad)
            .lineTo(pad, size - pad)
            .stroke({ width: size * 0.06, color: ELIMINATED_COLOR, alpha: 0.55, cap: "round" });
          container.addChild(x);
        }
      });
    }

    init();

    return () => {
      destroyed = true;
      cardContainersRef.current.clear();
      if (appRef.current) {
        try {
          appRef.current.destroy(true, true);
        } catch {
          // app never finished initializing — nothing to tear down
        }
        appRef.current = null;
      }
    };
    // Grid is rebuilt only when the card set identity changes; state/tap
    // updates flow through the refs above and a redraw effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    drawRef.current();
  }, [cardStates]);

  return <div ref={hostRef} style={{ width: "100%", height: "100%" }} />;
}
