export type SceneTool = {
  init: (...parameter: any[]) => void
  dispose?: () => void
}