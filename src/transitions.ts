import script, { init } from "./script";

export const initialStates = init.split(" ");

export interface Transition {
  id: number;
  prev: string[];
  next: string[];
  action?: string;
  narration?: string;
}

const parseScript = (script: string): Transition[] =>
  script
    .trim()
    .split("\n\n")
    .map((t, id) => {
      const s = t.trim().split("\n");
      const v = s[1].includes(":") ? s : [undefined, ...s];
      const [action, state = "", narration] = v;

      const [prev, next] = state.split(":");
      return {
        id,
        action,
        narration,
        prev: prev.trim().split(" "),
        next: next.trim().split(" "),
      };
    });

export const transitions = parseScript(script);
