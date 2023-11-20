import { CommandSystem } from "@/feature/command_system";
import { SceneController } from "@/feature/scene_controller";
import { SceneViewer } from "@/feature/scene_viewer";

export type GlobalContextInterface = {
  sceneViewer?: SceneViewer,
  commandSystem?: CommandSystem,
  sceneController?: SceneController
}

export const GlobalContext: GlobalContextInterface = {}

window.T3M_GLOBAL_CONTEXT = GlobalContext
