import style from './index.module.css'
import { useScene } from '../../feature/scene_viewer/hook/useScene'

export const App: () => JSX.Element = () => {

  const sceneContainerRef = useScene()

  return (
    <div className={style.app}>
      <div ref={sceneContainerRef} className={style.sceneContainer}></div>
    </div>
  )
}
