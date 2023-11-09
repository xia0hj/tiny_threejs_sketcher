import { Command } from "@/feature/command_system";
import { createPlaneCommand } from "@/feature/object_creator/plane";

export const COMMAND_LIST: Command[] = [
  createPlaneCommand
] 