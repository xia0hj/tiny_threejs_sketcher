import { CommandSystem } from "@/feature/command_system";
import { GlobalContext } from "@/feature/global_context";
import { SceneController } from "@/feature/scene_controller";
import { SceneViewer } from "@/feature/scene_viewer";
import { useEffect, useRef } from "react";

export function useScene() {
  const sceneContainer = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const sceneViewer = new SceneViewer()
    const commandSystem = new CommandSystem()
    const scneController = new SceneController()
    GlobalContext.sceneViewer = sceneViewer
    GlobalContext.commandSystem = commandSystem
    GlobalContext.sceneController = scneController
    if(sceneContainer.current){
      sceneViewer.init(sceneContainer.current)
      commandSystem.init()
      scneController.init()
    }
    return () => {
      sceneViewer.dispose()
    }
  }, [sceneContainer])

  return sceneContainer
}
