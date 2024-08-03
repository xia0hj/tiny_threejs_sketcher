import { CheckOutlined } from "@ant-design/icons";
import { Toolbar, ToolbarButton } from "@src/components/toolbar";
import { btnStartDrawLine } from "@src/containers/toolbar_buttons/start_draw_line";
import { useSketcherStore } from "@src/store";
import { CommandStopEditBasePlane } from "tiny_threejs_sketcher";

export const DetailsView: ToolbarButton["DetailsView"] = ({ exit }) => {
  const tinyThreejsSketcher = useSketcherStore(
    (state) => state.tinyThreejsSketcher,
  );

  const editor2dButtons: ToolbarButton[] = [
    {
      label: "保存并退出",
      icon: <CheckOutlined />,
      async onClick() {
        const result = await tinyThreejsSketcher?.executeCommand(
          new CommandStopEditBasePlane(),
        );
        if (result?.isOk()) {
          exit();
          return true;
        }
        return false;
      },
    },
    btnStartDrawLine,
  ];

  return <Toolbar toolbarButtons={editor2dButtons} />;
};
