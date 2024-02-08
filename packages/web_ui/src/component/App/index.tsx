import { useSceneRenderer } from "@src/component/App/useSceneRenderer";
import { Button } from "@nextui-org/react";

export const App = () => {
  const canvasRef = useSceneRenderer();

  return (
    <div className="w-full flex h-dvh">
      <div className="w-1/4 h-dvh">
        <Button>啊啊啊</Button>
      </div>
      <canvas className="w-3/4 h-dvh block" ref={canvasRef} />
    </div>
  );
};
