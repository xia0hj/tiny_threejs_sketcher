import { ToolbarButton } from "@src/component/Toolbar_legacy";
import { btnCreateSketchPlane } from "@src/feature/create_sketch_plane";

export const toolbarButtonList: ToolbarButton[] = [
  btnCreateSketchPlane
] as const;
