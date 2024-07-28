import { useThreeCadEditor } from "@src/component/App/useThreeCadEditor";
import style from "./index.module.less";
import { Toolbar } from "@src/component/Toolbar";
import { SketchObjectTree } from "@src/component/ObjectTree";

export const App = () => {
  const canvasRef = useThreeCadEditor();

  return (
    <div className={style.app}>
      <div className={style.app_navbar}></div>
      <div className={style.app_main}>
        <div className={style.left_sidebar}>
          <Toolbar />
          <SketchObjectTree />
        </div>
        <canvas className={style.app_canvas} ref={canvasRef} />
      </div>
    </div>
  );
};
