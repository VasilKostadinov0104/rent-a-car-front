import { useWindowSize } from '../hooks/useWindowSize'
import { mobileWidth } from '../config/constants.config'
export default function DesktopOnlyWrapper({
  children,
  customWidth = mobileWidth,
}) {
  const size = useWindowSize()

  if (size && size?.width && size?.width <= customWidth) {
    return null
  }
  return children
}
