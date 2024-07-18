import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { useGlobalStore } from "@src/store";
import { Card } from "antd";
import { COMMAND_KEY } from "sdk";
import style from "./index.module.less";
import { useEffect } from "react";

export const DetailsView: ToolbarButton["detailsView"] = ({ onExit }) => {
  const rootRenderer = useGlobalStore((state) => state.threeCadEditor);

  useEffect(() => {
    rootRenderer?.commandSystem.runCommand(COMMAND_KEY.start_draw_line);
    return () =>
      rootRenderer?.commandSystem.runCommand(COMMAND_KEY.stop_draw_line);
  }, [rootRenderer]);

  return (
    <div className={style.panel_container}>
      <Card
        title="创建草图平面"
        actions={[<CheckOutlined onClick={onExit} />]}
      ></Card>
    </div>
  );
};
