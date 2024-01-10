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

const instanceStoreMap = new Map<string, ReactiveStore>();

export function registerReactiveStore(
    sceneUuid: string,
    store?: ReactiveStore,
) {
    if (store != null) {
        instanceStoreMap.set(sceneUuid, store);
    } else {
        const defaultStore = getInitialReactiveState();
        instanceStoreMap.set(sceneUuid, {
            getReactiveState(key) {
                return defaultStore[key];
            },
            setReactiveState(key, value) {
                defaultStore[key] = value;
            },
        });
    }
}

export function getReactiveStore(sceneUuid: string) {
    return instanceStoreMap.get(sceneUuid)!;
}
