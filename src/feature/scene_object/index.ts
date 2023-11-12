import { Object3D } from "three"

export type GraphicObject = {
  id: string
  object: Object3D
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onSelect?: () => void
  onDeselect?: () => void
}