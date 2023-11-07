import { SceneViewer } from '@/feature/scene_viewer'
import { createStore } from 'zustand/vanilla'

type SceneState = {
  sceneViewer: SceneViewer | null

  setSceneViewer: (sceneViewer: SceneViewer) => any
}

export const store = createStore<SceneState>((set) => {
  return {
    sceneViewer: null,
    setSceneViewer: (sceneViewer: SceneViewer) => set({ sceneViewer }),
  }
})

