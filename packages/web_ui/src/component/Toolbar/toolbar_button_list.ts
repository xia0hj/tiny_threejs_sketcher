import { ToolbarButton } from "@src/component/Toolbar";
import { btnCreateSketchPlane } from "@src/feature/create_sketch_plane";
import { btnStartDrawLine } from "@src/feature/start_draw_line";

export const toolbarButtonList: ToolbarButton[] = [
  btnCreateSketchPlane,
  // btnStartDrawLine
] as const;
