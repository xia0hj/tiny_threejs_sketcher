import { GlobalContextInterface } from "@/feature/global_context";

export type SceneTool = {
  init: (...parameter: any[]) => void;
  dispose?: () => void;
  isActive: boolean;
};

declare global {
  interface Window {
    T3M_GLOBAL_CONTEXT: GlobalContextInterface;
  }
}
