import { useWindowSize } from '../hooks/useWindowSize'
import { mobileWidth } from '../utils/mobileWidth'
export default function MobileOnlyWrapper({
  children,
  customWidth = mobileWidth,
}) {
  const size = useWindowSize()

  if (size && size?.width && size?.width > customWidth) {
    return null
  }
  return children
}
