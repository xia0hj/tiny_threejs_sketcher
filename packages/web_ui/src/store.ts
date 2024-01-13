import { createStore } from "zustand/vanilla";
import { ReactiveState, ReactiveStore, getInitialReactiveState } from "sdk";
import { useStore } from "zustand";

const vanillaRendererStore = createStore<ReactiveState>()(
  getInitialReactiveState,
);
export const rendererStore: ReactiveStore = {
  setReactiveState(key, value) {
    vanillaRendererStore.setState({ [key]: value });
  },
  getReactiveState(key) {
    return vanillaRendererStore.getState()[key];
  },
};

export function useRendererReactiveStore<T>(
  selector: (state: ReactiveState) => T,
) {
  return useStore(vanillaRendererStore, selector);
}
