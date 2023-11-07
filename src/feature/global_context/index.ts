import { SceneViewer } from "../scene_viewer";
import { store } from "./zustand/store";

export function getSceneViewer(){
  return store.getState().sceneViewer
}

export function setSceneViewer(sceneViewer: SceneViewer) {
  store.getState().setSceneViewer(sceneViewer)
}
