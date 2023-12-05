import style from "./index.module.css";
import { useScene } from "@/feature/react_ui/component/App/useScene";

export const App: () => JSX.Element = () => {
  const sceneContainerRef = useScene();
  return (
    <div className={style.app}>
      <div ref={sceneContainerRef} className={style.sceneContainer}></div>
    </div>
  );
};
