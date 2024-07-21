import {
  BorderOuterOutlined,

} from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { DetailsView } from "@src/feature/create_sketch_plane/DetailsView";
import { Button } from "antd";

export const btnCreateSketchPlane: ToolbarButton = {
  label: "创建草图平面",
  icon: <BorderOuterOutlined />,
  DetailsView: DetailsView,
} as const;
