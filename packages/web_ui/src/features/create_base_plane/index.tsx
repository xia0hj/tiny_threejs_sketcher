import { BorderOuterOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/components/Toolbar";
import { DetailsView } from "@src/features/create_base_plane/DetailsView";

export const btnCreateBasePlane: ToolbarButton = {
  label: "创建草图平面",
  icon: <BorderOuterOutlined />,
  DetailsView: DetailsView,
} as const;
