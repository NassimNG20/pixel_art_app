//
//
//
//
//
//

import { MainStoreTypes } from "./store";

export type SetType = {
  (
    partial:
      | MainStoreTypes
      | Partial<MainStoreTypes>
      | ((state: MainStoreTypes) => MainStoreTypes | Partial<MainStoreTypes>),
    replace?: false
  ): void;

  (
    state: MainStoreTypes | ((state: MainStoreTypes) => MainStoreTypes),
    replace: true
  ): void;
};
