import { useSceneRenderer } from "@src/component/App/useSceneRenderer";
import style from "./index.module.less";
import { Toolbar } from "@src/component/Toolbar";
import { toolbarButtonList } from "@src/component/Toolbar/toolbar_button_list";

export const App = () => {
  const canvasRef = useSceneRenderer();

  return (
    <div className={style.app}>
      <div className={style.app_left}>
        <Toolbar buttonList={toolbarButtonList} />
      </div>
      <canvas className={style.app_right} ref={canvasRef} />
    </div>
  );
};
