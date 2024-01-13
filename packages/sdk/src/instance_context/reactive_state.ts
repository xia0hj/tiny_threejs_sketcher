import { CAMERA_TYPE } from "@src/constant";

export type ReactiveState = {
    currentCameraType: typeof CAMERA_TYPE[keyof typeof CAMERA_TYPE];
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
        currentCameraType: CAMERA_TYPE.perspectiveCamera
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
