import { Command } from "@/feature/command_system";

export type createPlaneParameter = {
  parallelTo: 'XY'|'XZ'|'YZ',
  offset: number,
}
export const CREATE_PLANE_COMMAND = 'CREATE_PLANE_COMMAND'
export const createPlaneCommand: Command = {
  key: CREATE_PLANE_COMMAND,
  run({parallelTo, offset}:createPlaneParameter){
    
  }
}