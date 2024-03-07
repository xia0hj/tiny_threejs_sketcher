import { BorderOuterOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";

const activePanel: ToolbarButton["activePanel"] = ({ done }) => {
  return <div>1</div>;
};

export const btnCreateSketchPlane: ToolbarButton = {
  label: "创建草图平面",
  icon: <BorderOuterOutlined />,
  activePanel,
} as const;
