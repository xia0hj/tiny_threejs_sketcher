import { useCommandSystem } from '@/feature/command_system/hook/use_command_system'
import style from './index.module.css'
import { useScene } from '@/feature/scene_viewer/hook/use_scene'

export const App: () => JSX.Element = () => {

  const sceneContainerRef = useScene()
  useCommandSystem()
  return (
    <div className={style.app}>
      <div ref={sceneContainerRef} className={style.sceneContainer}></div>
    </div>
  )
}
