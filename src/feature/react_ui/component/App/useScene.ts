import { registerCommand } from "@/feature/command_system";
import { COMMAND_LIST } from "@/feature/command_system/command_list";
import { GlobalContext } from "@/feature/global_context";
import { SceneViewer } from "@/feature/scene_viewer";
import { useEffect, useRef } from "react";

export function useScene() {
  const sceneContainer = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const sceneViewer = new SceneViewer()
    GlobalContext.setSceneViewer(sceneViewer)
    if(sceneContainer.current){
      sceneViewer.init(sceneContainer.current)
      COMMAND_LIST.forEach(command => registerCommand(command))
    }
    return () => {
      sceneViewer.dispose()
    }
  }, [sceneContainer])

  return sceneContainer
}
