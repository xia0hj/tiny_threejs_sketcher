import {
  CheckOutlined,
  CloseOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Toolbar, ToolbarButton } from "@src/components/toolbar";
import { useSketcherStore } from "@src/store";
import { COMMAND_KEY } from "tiny_threejs_sketcher";

export const DetailsView: ToolbarButton["DetailsView"] = ({ exit }) => {

  const tinyThreejsSketcher = useSketcherStore(state => state.tinyThreejsSketcher);

  const editor2dButtons: ToolbarButton[] = [
    {
      label: "保存",
      icon: <CheckOutlined />,
      onClick() {
        const res = tinyThreejsSketcher?.runCommand(COMMAND_KEY.stop_edit_base_plane);
        if (res === true) {
          exit();
          return true;
        }
        return false;
      },
    },
    {
      label: "退出",
      icon: <CloseOutlined />,
      onClick() {
        const res = tinyThreejsSketcher?.runCommand(COMMAND_KEY.stop_edit_base_plane);
        if (res === true) {
          exit();
          return true;
        }
        return false;
      },
    },
  ];

  return <Toolbar toolbarButtons={editor2dButtons} />;
};
