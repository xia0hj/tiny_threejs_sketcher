import {
  BorderOuterOutlined,

} from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar_legacy";
import { ActivePanel } from "@src/feature/create_sketch_plane/ActivePanel";

export const btnCreateSketchPlane: ToolbarButton = {
  label: "创建草图平面",
  icon: <BorderOuterOutlined />,
  activePanel: ActivePanel,
} as const;
