import { CheckOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/components/toolbar";
import { useSketcherStore } from "@src/store";
import { Card } from "antd";
import style from "./index.module.less";
import { useEffect } from "react";
import {
  CommandStopDrawLine,
  CommandStartDrawLine,
} from "tiny_threejs_sketcher";

const PointDetails = ({ x, y, z }: { x?: number; y?: number; z?: number }) => {
  return (
    <div>
      <div>x: {x ?? ""}</div>
      <div>y: {y ?? ""}</div>
      <div>z: {z ?? ""}</div>
    </div>
  );
};

export const DetailsView: ToolbarButton["DetailsView"] = ({ exit: onExit }) => {
  const tinyThreejsSketcher = useSketcherStore(
    (state) => state.tinyThreejsSketcher,
  );

  const startPoint = useSketcherStore((state) => state.drawingLine2dStartPoint);
  const endPoint = useSketcherStore((state) => state.drawingLine2dEndPoint);

  useEffect(() => {
    (async function startDrawLine() {
      await tinyThreejsSketcher?.executeCommand(new CommandStartDrawLine());
    })();

    return () => {
      (async function stopDrawLine() {
        await tinyThreejsSketcher?.executeCommand(new CommandStopDrawLine());
      })();
    };
  }, [tinyThreejsSketcher]);

  return (
    <div className={style.panel_container}>
      <Card title="创建草图平面" actions={[<CheckOutlined onClick={onExit} />]}>
        <PointDetails x={startPoint?.x} y={startPoint?.y} z={startPoint?.z} />
        <PointDetails x={endPoint?.x} y={endPoint?.y} z={endPoint?.z} />
      </Card>
    </div>
  );
};
