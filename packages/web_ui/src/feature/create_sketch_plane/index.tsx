import {
  BorderOuterOutlined,

} from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { ActivePanel } from "@src/feature/create_sketch_plane/ActivePanel";
import { Button } from "antd";

export const btnCreateSketchPlane: ToolbarButton = {
  label: "创建草图平面",
  icon: <BorderOuterOutlined />,
  activePanel: ActivePanel,
} as const;
