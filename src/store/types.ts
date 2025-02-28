//
//
//
//
//
//
import { MainStoreTypes } from "./store";

export type SetActionType = {
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

//
export type SetPixelsMethodsType = {
  (
    partial:
      | MainStoreTypes
      | Partial<MainStoreTypes>
      | ((
          state: MainStoreTypes
        ) => void | MainStoreTypes | Partial<MainStoreTypes>), // Allow void
    replace?: false
  ): void;

  (
    state: MainStoreTypes | ((state: MainStoreTypes) => MainStoreTypes),
    replace: false
  ): void;
};
