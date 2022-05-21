/* eslint-disable @next/next/no-img-element */
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface IProps {
  elements: Array<IElement>
}
interface IElement {
  name?: string
  slug: string
  icon?: IconProp
}
export default function Breadcrumbs({
  elements = [{ name: 'home', slug: '/', icon: null }],
}: IProps) {
  return (
    <div className="h-[60px] text-[#183b56] dark:text-white w-full flex space-x-[15px] items-center smp:!px-[20px] no-scroll overflow-x-scroll smp:!overflow-hidden">
      {elements?.map((element, key, array1) => {
        return (
          <div key={key} className="flex space-x-[15px]">
            <div key={key} className="flex space-x-[15px] items-center">
              <Link href={element.slug ? element?.slug : ''}>
                <a className="hover:underline capitalize whitespace-nowrap flex items-center">
                  {element?.icon && <FontAwesomeIcon icon={element?.icon} />}{' '}
                  {element.name && element.name}
                </a>
              </Link>
              {key != array1.length - 1 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[16px] text-[#1565d8]"
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
