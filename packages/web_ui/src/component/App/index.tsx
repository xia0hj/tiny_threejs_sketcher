import { useSceneRenderer } from "@src/component/App/useSceneRenderer";
import style from "@src/component/App/style.module.css";

export const App = () => {
  const canvasRef = useSceneRenderer();

  return (
    <div className={style.canvas_container}>
      <canvas className={style.canvas_threejs} ref={canvasRef} />
    </div>
  );
};
