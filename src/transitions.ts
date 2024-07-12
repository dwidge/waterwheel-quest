import script, { init } from "./script";
import { images } from "./images";

export const initialStates = init.split(" ");

export interface Transition {
  id: number;
  prev: string[];
  next: string[];
  action?: string;
  narration?: string;
  background?: string;
}

const parseScript = (script: string): Transition[] =>
  script
    .trim()
    .split("\n\n")
    .filter((s) => s.trim())
    .map((t, id) => {
      const s = t.trim().split("\n");
      try {
        const v = s[1].includes(":") ? s : [undefined, ...s];
        const [action, state = "", narration] = v;

        const [prev, next = prev] = state.split(":");
        const background = narration
          ?.split(/\b/)
          .find((word) => Object.keys(images).includes(word)) as
          | keyof typeof images
          | undefined;
        if (background) console.log(background);

        return {
          id,
          action: action?.replace(/_/g, " "),
          narration: narration?.replace(/_/g, " "),
          prev: prev.trim().split(" "),
          next: next.trim().split(" "),
          background: background && images[background],
        };
      } catch (e) {
        console.log(e, s);
        throw e;
      }
    });

export const transitions = parseScript(script);
