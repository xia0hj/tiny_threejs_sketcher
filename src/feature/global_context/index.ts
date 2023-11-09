import { SceneViewer } from "@/feature/scene_viewer";
import { GlobalContextZustandImpl } from "@/feature/global_context/zustand_impl";

export type GlobalContextInterface = {
  getSceneViewer: () => SceneViewer | null,
  setSceneViewer: (sceneViewer: SceneViewer) => void
}

export const GlobalContext: GlobalContextInterface = new GlobalContextZustandImpl()
