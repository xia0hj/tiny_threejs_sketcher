import { GlobalContextInterface } from "@/feature/global_context";

export type SceneTool = {
  init: (...parameter: any[]) => void;
  dispose?: () => void;
  isActive: boolean;
};

declare global {
  interface Window {
    S3C_GLOBAL_STORE: any;
  }
}
