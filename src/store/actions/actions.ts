//
//
//
//
//
//
//

import { CanvasDataTypes, HistoryDataTypes } from "../data";
import { SetActionType } from "../types";

//

//
export const Methods = (set: SetActionType): ActionsTypes => {
  return {
    methods: {
      setBoundingClientRect: (rect) => {
        set(({ canvas }) => ({ canvas: { ...canvas, rect } }));
      },
      setClient: (key, value) => {
        set((e) => ({ client: { ...e.client, [key]: value } }));
      },
      setMouseEvents: (key, value) => {
        set((e) => ({ mouseEvents: { ...e.mouseEvents, [key]: value } }));
      },
      setLayoutEvents: (key, value) => {
        set((e) => ({ layoutEvents: { ...e.layoutEvents, [key]: value } }));
      },
      setCurrent: (key, value) => {
        set((e) => ({ current: { ...e.current, [key]: value } }));
      },
      setPixels: (index) => {
        set((e) => {
          const { history } = e;
          if (!history.historyStack[index]) return e;
          const { hs_color, hs_coordinates } = history.historyStack[index];
          return {
            pixels: {
              colors: new Uint32Array(hs_color),
              coordinates: new Uint16Array(hs_coordinates),
            },
          };
        });
      },

      setHistory: (newValue) => {
        set((e) => {
          const { history } = e;
          const { historyStack, stacks } = history;

          const newStack =
            historyStack.length >= stacks
              ? [...historyStack.slice(0, 1)]
              : [...historyStack];
          const addStack = {
            hs_color: new Uint32Array(newValue.hs_color),
            hs_coordinates: new Uint16Array(newValue.hs_coordinates),
          };
          return {
            history: {
              ...history,
              historyStack: [...newStack, addStack],
              index: historyStack.length,
            },
          };
        });
      },

      setHistoryIndex: (ifCTRLZ) => {
        set((e) => {
          const { history } = e;
          const min = Math.min(
            history.index + ifCTRLZ,
            history.historyStack.length - 1
          );
          const newIndex = Math.max(0, min);

          return {
            history: { ...history, index: newIndex },
          };
        });
      },
    },
  };
};

export interface ActionsTypes {
  methods: {
    setBoundingClientRect: (e: CanvasDataTypes["canvas"]["rect"]) => void;
    setHistoryIndex: (e: -1 | 1) => void;
    setPixels: (e: number) => void;

    setHistory: (e: HistoryDataTypes) => void;

    setCurrent: <K extends keyof CanvasDataTypes["current"]>(
      key: K,
      value: CanvasDataTypes["current"][K]
    ) => void;

    setClient: <K extends keyof CanvasDataTypes["client"]>(
      key: K,
      value: CanvasDataTypes["client"][K]
    ) => void;

    setMouseEvents: (
      key: keyof CanvasDataTypes["mouseEvents"],
      value: boolean
    ) => void;

    setLayoutEvents: (
      key: keyof CanvasDataTypes["layoutEvents"],
      value: boolean
    ) => void;
  };
}
