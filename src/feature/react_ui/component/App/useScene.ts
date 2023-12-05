import { CommandSystem } from "@/feature/command_system";
import { setGlobalState } from "@/feature/global_state/zustand_impl";
import { SceneController } from "@/feature/scene_controller";
import { SceneViewer } from "@/feature/scene_viewer";
import { useEffect, useRef } from "react";

export function useScene() {
  const sceneContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sceneViewer = new SceneViewer();
    const commandSystem = new CommandSystem();
    const scneController = new SceneController();

    setGlobalState("commandSystem", commandSystem);
    setGlobalState("sceneController", scneController);
    setGlobalState("sceneViewer", sceneViewer);

    if (sceneContainer.current) {
      sceneViewer.init(sceneContainer.current);
      commandSystem.init();
      scneController.init();
    }
    return () => {
      sceneViewer.dispose();
    };
  }, [sceneContainer]);

  return sceneContainer;
}
