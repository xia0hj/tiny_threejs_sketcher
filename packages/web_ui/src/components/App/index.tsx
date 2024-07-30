import { useThreeCadEditor } from "@src/components/App/useThreeCadEditor";
import style from "./index.module.less";
import { Toolbar, ToolbarButton } from "@src/components/Toolbar";
import { SketchObjectTree } from "@src/components/ObjectTree";
import { btnCreateBasePlane } from "@src/features/create_base_plane";

const mainToolbarButtons: ToolbarButton[] = [
  btnCreateBasePlane
] as const;

export const App = () => {
  const canvasRef = useThreeCadEditor();

  return (
    <div className={style.app}>
      <div className={style.app_navbar}></div>
      <div className={style.app_main}>
        <div className={style.left_sidebar}>
          <Toolbar toolbarButtons={mainToolbarButtons} />
          <SketchObjectTree />
        </div>
        <canvas className={style.app_canvas} ref={canvasRef} />
      </div>
    </div>
  );
};
