import { SceneViewer } from "../scene_viewer";
import { GlobalContextZustandImpl } from "./zustand_impl";

export type GlobalContextInterface = {
  getSceneViewer: () => SceneViewer | null,
  setSceneViewer: (sceneViewer: SceneViewer) => void
}

export const GlobalContext: GlobalContextInterface = new GlobalContextZustandImpl()
