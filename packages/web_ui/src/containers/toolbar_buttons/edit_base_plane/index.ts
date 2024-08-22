import { FormOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/components/toolbar";
import { DetailsView } from "@src/containers/toolbar_buttons/edit_base_plane/DetailsView";
import { useSketcherStore } from "@src/store";
import { CommandStartEditBasePlane } from "tiny_threejs_sketcher";

export const btnEditBasePlane: ToolbarButton = {
  label: "编辑平面",
  icon: FormOutlined,
  DetailsView,
  async onClick() {
    const tinyThreejsSketcher = useSketcherStore.getState().tinyThreejsSketcher;
    const result = await tinyThreejsSketcher?.executeCommand(
      new CommandStartEditBasePlane(),
    );
    return result?.isOk() ?? false;
  },
} as const;
