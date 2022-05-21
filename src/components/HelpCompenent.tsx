import {
  faInfoCircle,
  faQuestionCircle,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function HelpComponent({
  description = null,
  direction = 'right',
  children = null,
  className = null,
  height = null,
}) {
  const [isHovering, setHovering] = useState(false)
  return (
    <div
      onMouseEnter={() => {
        setHovering(true)
      }}
      onMouseLeave={() => {
        setHovering(false)
      }}
      className="relative flex justify-center items-center group"
    >
      <FontAwesomeIcon
        className="ml-2 cursor-pointer opacity-40 !text-[#363636] dark:!text-gray-300"
        icon={faInfoCircle}
      />
      <div
        style={{
          opacity: isHovering ? '100%' : '0%',
          // height: height ? height : 'auto',
          // top: height ? -height : 'auto',
        }}
        className={`absolute w-[250px] sm:!w-[350px] transition-all  pointer-events-none  top-[100%] ${
          direction == 'right'
            ? 'right-[-20px] smp:!left-[-100%]'
            : direction == 'center'
            ? 'smp:left-[-160px] left-[-140px]'
            : direction == 'top'
            ? 'smp:!left-0 top-0'
            : 'smp:!left-[-320px] left-[-220px]'
        }  p-[10px] rounded-[12px] bg-white dark:bg-[#363636] text-[#183b56] dark:text-white shadow-grid border smp:!border-none smp:!shadow-menu whitespace-normal inter-m font-medium leading-5 text-[16px] z-200 ${className}`}
      >
        {description && description}
        {children && children}
      </div>
    </div>
  )
}
