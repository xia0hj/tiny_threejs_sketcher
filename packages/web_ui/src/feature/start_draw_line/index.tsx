import { BorderOuterOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { ActivePanel } from "@src/feature/start_draw_line/ActivePanel";
import { Button } from "antd";

export const btnStartDrawLine: ToolbarButton = {
  label: "绘制线段",
  icon: <BorderOuterOutlined />,
  activePanel: ActivePanel,
} as const;
