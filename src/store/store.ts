//
//
//
//
import { create } from "zustand";

import { data, CanvasDataTypes } from "./data";
import { actions, ActionsTypes } from "./actions";
//
//
//
//
//

//
//
export type MainStoreTypes = CanvasDataTypes & ActionsTypes;
//
//

const useStore = create<MainStoreTypes>()((set) => ({
  ...actions(set),
  ...data,
}));

export default useStore;
