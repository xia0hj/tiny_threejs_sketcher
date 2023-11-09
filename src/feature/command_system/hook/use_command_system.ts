import { registerCommand } from "@/feature/command_system";
import { COMMAND_LIST } from "@/feature/command_system/command_list";
import { GlobalContext } from "@/feature/global_context";
import { SceneViewer } from "@/feature/scene_viewer";
import { useEffect, useRef } from "react";

export function useCommandSystem(){


  useEffect(()=>{
    COMMAND_LIST.forEach(command => registerCommand(command))
  }, [])
}