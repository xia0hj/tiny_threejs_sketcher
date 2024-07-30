import { BorderOuterOutlined, FormOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/components/Toolbar";
import { DetailsView } from "@src/features/edit_base_plane/DetailsView";

export const btnEditBasePlane: ToolbarButton = {
  label: "编辑平面",
  icon: <FormOutlined />,
  DetailsView,
} as const;
