import { CommandSystem } from "@/feature/command_system";
import { SceneViewer } from "@/feature/scene_viewer";

export type GlobalContextInterface = {
  sceneViewer?: SceneViewer,
  commandSystem?: CommandSystem
}

export const GlobalContext: GlobalContextInterface = {}

window.T3M_GLOBAL_CONTEXT = GlobalContext
