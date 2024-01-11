export type ReactiveState = {
    currentCameraType: "PerspectiveCamera" | "OrthographicCamera";
};
export type ReactiveStore = {
    getReactiveState: <K extends keyof ReactiveState>(
        key: K,
    ) => ReactiveState[K];
    setReactiveState: <K extends keyof ReactiveState>(
        key: K,
        value: ReactiveState[K],
    ) => void;
};

export function getInitialReactiveState(): ReactiveState {
    return {
        currentCameraType: "PerspectiveCamera",
    };
}

export function getDefaultReactiveStore(): ReactiveStore {
    const defaultStore = getInitialReactiveState();
    return {
        setReactiveState(key, value) {
            defaultStore[key] = value;
        },
        getReactiveState(key) {
            return defaultStore[key];
        },
    };
}
