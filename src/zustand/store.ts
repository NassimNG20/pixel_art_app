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
  ...data,
  ...actions(set),
}));

export default useStore;
