import { CommandSystem } from "@/feature/command_system";
import { COMMAND_LIST } from "@/feature/command_system/command_list";
import { GlobalContext } from "@/feature/global_context";
import { SceneViewer } from "@/feature/scene_viewer";
import { useEffect, useRef } from "react";

export function useScene() {
  const sceneContainer = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const sceneViewer = new SceneViewer()
    const commandSystem = new CommandSystem()
    GlobalContext.sceneViewer = sceneViewer
    GlobalContext.commandSystem = commandSystem
    if(sceneContainer.current){
      sceneViewer.init(sceneContainer.current)
      commandSystem.init()
    }
    return () => {
      sceneViewer.dispose()
    }
  }, [sceneContainer])

  return sceneContainer
}
