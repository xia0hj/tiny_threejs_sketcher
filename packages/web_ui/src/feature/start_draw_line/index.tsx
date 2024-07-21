import { BorderOuterOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { DetailsView } from "@src/feature/start_draw_line/DetailsView";
import { Button } from "antd";

export const btnStartDrawLine: ToolbarButton = {
  label: "绘制线段",
  icon: <BorderOuterOutlined />,
  DetailsView: DetailsView,
} as const;
