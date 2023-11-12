import { useRegisterAllCommand } from '@/feature/command_system/hook/use_register_all_command'
import style from './index.module.css'
import { useScene } from '@/feature/scene_viewer/hook/use_scene'

export const App: () => JSX.Element = () => {

  const sceneContainerRef = useScene()
  useRegisterAllCommand()
  return (
    <div className={style.app}>
      <div ref={sceneContainerRef} className={style.sceneContainer}></div>
    </div>
  )
}
