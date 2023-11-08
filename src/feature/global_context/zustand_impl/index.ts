import { SceneViewer } from "@/feature/scene_viewer";
import { GlobalContextInterface } from "..";
import { createStore, StoreApi } from 'zustand/vanilla'

type SceneStore = {
  sceneViewer: SceneViewer | null,
  setSceneViewer: (sceneViewer: SceneViewer) => void
}

export class GlobalContextZustandImpl implements GlobalContextInterface {
  
  store: StoreApi<SceneStore>

  constructor(){
    this.store = createStore<SceneStore>((set) => {
      return {
        sceneViewer: null,
        setSceneViewer: (sceneViewer: SceneViewer) => set({ sceneViewer }),
      }
    })
  }

  getSceneViewer(){
    return this.store.getState().sceneViewer
  }

  setSceneViewer(sceneViewer: SceneViewer){
    this.store.getState().setSceneViewer(sceneViewer)
  }
}
