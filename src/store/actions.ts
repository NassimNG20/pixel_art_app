//
//
//
//
//
//
//

import { CanvasDataTypes, HistoryDataTypes } from "./data";
import { SetType } from "./types";

//

//
export const actions = (set: SetType): ActionsTypes => {
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
      setHistoryIndex: (index: number) => {
        set((e) => ({ history: { ...e.history, index } }));
      },
      setHistory: (newData) => {
        set((e) => {
          const { history } = e;
          let Temp = [];
          if (e.history.historyStack.length >= history.stacks) {
            const historyStack = history.historyStack.slice(0, -1);
            Temp = [...historyStack, newData];
          } else Temp = [...history.historyStack, newData];

          return {
            history: {
              ...history,
              historyStack: Temp,
            },
          };
        });
      },
    },
  };
};

export interface ActionsTypes {
  methods: {
    setBoundingClientRect: (e: CanvasDataTypes["canvas"]["rect"]) => void;

    setCurrent: (key: keyof CanvasDataTypes["current"], value: any) => void;
    setHistory: (data: HistoryDataTypes[]) => void;
    setHistoryIndex: (index: number) => void;

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
