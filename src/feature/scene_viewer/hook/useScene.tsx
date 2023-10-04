import { SceneViewer } from "@/feature/scene_viewer";
import { useEffect, useRef } from "react";

export function useScene(){

  const sceneContainer = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const sceneViewer = new SceneViewer()
    console.log(sceneContainer.current);
    
    if(sceneContainer.current){
      sceneViewer.init(sceneContainer.current)
    }
    
    return () => {
      sceneViewer.dispose()
    }
  }, [sceneContainer])

  return sceneContainer
}