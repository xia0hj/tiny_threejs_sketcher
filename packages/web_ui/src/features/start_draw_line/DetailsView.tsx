import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/component/Toolbar";
import { useEditorStore } from "@src/store";
import { Card } from "antd";
import { COMMAND_KEY } from "sdk";
import style from "./index.module.less";
import { useEffect } from "react";
import { useStore } from "zustand";

const PointDetails = ({ x, y, z }: { x?: number; y?: number; z?: number }) => {
  return (
    <div>
      <div>x: {x ?? ""}</div>
      <div>y: {y ?? ""}</div>
      <div>z: {z ?? ""}</div>
    </div>
  );
};

export const DetailsView: ToolbarButton["DetailsView"] = ({ onExit }) => {
  const rootRenderer = useEditorStore((state) => state.threeCadEditor);
  const threeCadEditor = useEditorStore((state) => state.threeCadEditor);
  const startPoint = useStore(
    threeCadEditor!.globalStore,
    (state) => state.curDrawingLine2dStartPoint,
  );
  const endPoint = useStore(
    threeCadEditor!.globalStore,
    (state) => state.curDrawingLine2dEndPoint,
  );

  useEffect(() => {
    rootRenderer?.commandSystem.runCommand(COMMAND_KEY.start_draw_line);
    return () =>
      rootRenderer?.commandSystem.runCommand(COMMAND_KEY.stop_draw_line);
  }, [rootRenderer]);

  return (
    <div className={style.panel_container}>
      <Card title="创建草图平面" actions={[<CheckOutlined onClick={onExit} />]}>
        <PointDetails x={startPoint?.x} y={startPoint?.y} z={startPoint?.z} />
        <PointDetails x={endPoint?.x} y={endPoint?.y} z={endPoint?.z} />
      </Card>
    </div>
  );
};
