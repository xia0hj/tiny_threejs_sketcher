import { useSceneRenderer } from "@src/component/App/useSceneRenderer";
import style from "./index.module.less";

export const App = () => {
  const canvasRef = useSceneRenderer();

  return (
    <div className={style.app}>
      <div aria-label="左侧工具栏" className={style.app_left}></div>
      <canvas className={style.app_right} ref={canvasRef} />
    </div>
  );
};
