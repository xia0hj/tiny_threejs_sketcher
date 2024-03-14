import { useThreeCadEditor } from "@src/component/App/useThreeCadEditor";
import style from "./index.module.less";
import { Toolbar } from "@src/component/Toolbar_legacy";
import { toolbarButtonList } from "@src/component/Toolbar_legacy/toolbar_button_list";

export const App = () => {
  const canvasRef = useThreeCadEditor();

  return (
    <div className={style.app}>
      <div className={style.app_top}></div>
      <div className={style.app_main}>
        <canvas className={style.app_canvas} ref={canvasRef} />
        <div className={style.app_right}></div>
      </div>
    </div>
  );
};
