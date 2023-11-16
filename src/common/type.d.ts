import { GlobalContextInterface } from "@/feature/global_context"

export type SceneTool = {
  init: (...parameter: any[]) => void
  dispose?: () => void
}

declare global {
  interface Window {
    T3M_GLOBAL_CONTEXT: GlobalContextInterface
  }
}