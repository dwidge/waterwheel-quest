import React, { useState } from "react";
import { Transition, initialStates, transitions } from "./transitions";
import { mainStyle, screenStyle } from "./mainStyle";

const maxAutoTransitionsPerTurn = 30;

const isNextTransition = (state: string[]) => (transition: Transition) =>
  transition.prev.every((prevState) => state.includes(prevState));

const isAutoTransition = (transition: Transition) => !transition.action;

const isActionTransition = (transition: Transition) => transition.action;

const applyTransition = (currentState: string[], transition: Transition) =>
  currentState
    .filter((state) => !transition.prev.includes(state))
    .concat(transition.next);

const unique = <T,>(a: T[]) => [...new Set(a)];

const autoTransitions = transitions.filter(isAutoTransition);
const actionTransitions = transitions.filter(isActionTransition);

const applyAction = (state: string[], action?: Transition) => {
  if (action) state = applyTransition(state, action);
  let fulltext = [action?.narration ?? ""];
  let newTransitions = autoTransitions;
  let background = action?.background;

  for (let i = 0; i < maxAutoTransitionsPerTurn; i++) {
    const next = newTransitions.filter(isNextTransition(state));
    if (!next.length) break;
    const t = next[0];
    state = applyTransition(state, t);
    fulltext.push(t.narration ?? "");
    background = t.background ?? background;
    newTransitions = newTransitions.filter((v) => v.id !== t.id);
  }

  fulltext = unique(fulltext.filter((s) => s));

  return { state, fulltext, background };
};

const initial = applyAction(initialStates);

export const Game: React.FC = () => {
  const [background, setBackground] = useState<string | undefined>(
    initial.background
  );
  const [fulltext, setFulltext] = useState<string[]>(initial.fulltext);
  const [currentState, setCurrentState] = useState<string[]>(initial.state);

  const possibleTransitions = actionTransitions.filter(
    isNextTransition(currentState)
  );

  console.log(background, currentState);

  return (
    <div
      style={{
        ...screenStyle,
        backgroundImage: background ? `url(${background})` : undefined,
      }}
    >
      <div style={mainStyle}>
        <div style={{ flex: 1 }}></div>
        {fulltext.map((t) => (
          <div key={t}>{t}</div>
        ))}
        <div style={{ flex: 1 }}></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          {possibleTransitions.map((transition) => (
            <button
              key={transition.id}
              onClick={() => {
                const next = applyAction(currentState, transition);
                setCurrentState(next.state);
                setFulltext(next.fulltext);
                setBackground(next.background);
              }}
            >
              {transition.action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
