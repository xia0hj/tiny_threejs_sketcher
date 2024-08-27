import { CheckOutlined } from "@ant-design/icons";
import { ToolbarButton } from "@src/components/toolbar";
import { useSketcherStore } from "@src/store";
import {
  CommandStopDrawCircle,
  CommandStartDrawCircle,
  CommandStartSelectExtrudeFace,
  CommandStopSelectExtrudeFace,
} from "tiny_threejs_sketcher";
import style from "./index.module.less";
import { Card, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

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

  const [depth, setDepth] = useState(10);

  const [face] = useSketcherStore((state) => state.selectedObjects);
  
  useEffect(() => {
    (async function startDrawLine() {
      await tinyThreejsSketcher?.executeCommand(
        new CommandStartSelectExtrudeFace(),
      );
    })();

    return () => {
      (async function stopDrawLine() {
        await tinyThreejsSketcher?.executeCommand(
          new CommandStopSelectExtrudeFace(depth), // #todo can not read state in useEffect
        );
      })();
    };
  }, [tinyThreejsSketcher]);

  return (
    <div className={style.panel_container}>
      <Card title="创建草图平面" actions={[<CheckOutlined onClick={onExit} />]}>
        <InputNumber value={depth} onChange={(val) => setDepth(val ?? 0)} />
        <Input disabled value={face?.uuid} />
      </Card>
    </div>
  );
};
