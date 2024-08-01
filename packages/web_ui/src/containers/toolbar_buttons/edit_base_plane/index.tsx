import { BorderOuterOutlined, FormOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/components/toolbar";
import { DetailsView } from "@src/containers/toolbar_buttons/edit_base_plane/DetailsView";
import { useSketcherStore } from "@src/store";
import { COMMAND_KEY } from "tiny_threejs_sketcher";

export const btnEditBasePlane: ToolbarButton = {
  label: "编辑平面",
  icon: <FormOutlined />,
  DetailsView,
  onClick() {
    const tinyThreejsSketcher = useSketcherStore.getState().tinyThreejsSketcher;
    if (tinyThreejsSketcher == null) {
      throw new Error("Error: can not get TinyThreejsSketcher instance.");
    }
    return tinyThreejsSketcher.runCommand(COMMAND_KEY.start_edit_base_plane);
  },
} as const;
