import {
  GlobalStateDefinition,
  GlobalStateGetter,
  GlobalStateHook,
  GlobalStateSetter,
} from "@/feature/global_state/interface";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

const store = createStore<GlobalStateDefinition>((_) => ({
  // global state initial value
}));

export const getGlobalState: GlobalStateGetter = (key) => {
  return store.getState()[key];
};

export const setGlobalState: GlobalStateSetter = (key, value) => {
  store.setState({ [key]: value });
};

export const useGlobalState: GlobalStateHook = (key) => [
  useStore(store, (state) => state[key]),
  (newValue) => setGlobalState(key, newValue),
];
