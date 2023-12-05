import { CommandSystem } from "@/feature/command_system";
import { SceneController } from "@/feature/scene_controller";
import { SceneViewer } from "@/feature/scene_viewer";

export type GlobalStateDefinition = {
  sceneViewer?: SceneViewer;
  commandSystem?: CommandSystem;
  sceneController?: SceneController;
};

export type GlobalStateGetter = <K extends keyof GlobalStateDefinition>(
  key: K
) => GlobalStateDefinition[K];

export type GlobalStateSetter = <K extends keyof GlobalStateDefinition>(
  key: K,
  value: GlobalStateDefinition[K]
) => void;

export type GlobalStateHook = <K extends keyof GlobalStateDefinition>(
  key: K
) => [GlobalStateDefinition[K], (newValue: GlobalStateDefinition[K]) => void];
