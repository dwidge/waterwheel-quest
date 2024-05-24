import React, { useState } from "react";
import { Transition, initialStates, transitions } from "./transitions";
import { mainStyle } from "./mainStyle";

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

  for (let i = 0; i < maxAutoTransitionsPerTurn; i++) {
    const next = newTransitions.filter(isNextTransition(state));
    if (!next.length) break;
    const t = next[0];
    state = applyTransition(state, t);
    fulltext.push(t.narration ?? "");
    newTransitions = newTransitions.filter((v) => v.id !== t.id);
  }

  fulltext = unique(fulltext.filter((s) => s));

  return { state, fulltext };
};

const initial = applyAction(initialStates);

export const Game: React.FC = () => {
  const [fulltext, setFulltext] = useState<string[]>(initial.fulltext);
  const [currentState, setCurrentState] = useState<string[]>(initial.state);

  const possibleTransitions = actionTransitions.filter(
    isNextTransition(currentState)
  );

  console.log(currentState);

  return (
    <div style={mainStyle}>
      {fulltext.map((t) => (
        <div key={t}>{t}</div>
      ))}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {possibleTransitions.map((transition) => (
          <button
            key={transition.id}
            onClick={() => {
              const next = applyAction(currentState, transition);
              setCurrentState(next.state);
              setFulltext(next.fulltext);
            }}
          >
            {transition.action}
          </button>
        ))}
      </div>
    </div>
  );
};
