//
//
//
//
import { create } from "zustand";

import { data, CanvasDataTypes } from "./data";
import { Methods, ActionsTypes } from "./actions/actions";
import { ActionsPixelStore, PixelStoreTypes } from "./actions/unitArray";
//
//
//
//
//

//
//
export type MainStoreTypes = CanvasDataTypes & ActionsTypes & PixelStoreTypes;
//
//

const useStore = create<MainStoreTypes>()((set, get, store) => ({
  ...Methods(set),
  ...ActionsPixelStore(set, get, store),
  ...data,
}));

export default useStore;
