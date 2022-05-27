import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Tab = ({ button, mapIndex }) => {
  const [white, setWhite] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setWhite(router?.asPath?.includes(button.link))
  }, [router])
  return (
    <div
      onClick={() => {
        router.push(button.link)
      }}
      className={`h-full w-full flex items-center smp:!pl-[20px] text-[14px] smp:!text-[16px] cursor-pointer group relative 
    ${
      white
        ? 'bg-[#fff] text-primary rounded-t-[12px] font-bold border-t border-x bottom-[-1px]'
        : 'bg-[#F6F6F9] text-[#15143f] text-opacity-50'
    }
    ${mapIndex + 1 > button.index ? 'border-l' : ''} 
    ${mapIndex + 1 < button.index ? 'border-r' : ''}
    `}
    >
      {button.link == router.asPath && (
        <div className="w-[10px] h-[10px] absolute right-[-10px] bottom-0 bg-[#fff] z-10" />
      )}
      {button.link == router.asPath && (
        <div className="w-[10px] h-[10px] absolute left-[-10px] bottom-0 bg-[#fff] z-10" />
      )}
      {button.link == router.asPath && (
        <div className="w-[20px] h-[20px] absolute left-[-20px] bottom-0 bg-[#F6F6F9] z-10 rounded-full border-r rotate-45" />
      )}
      {button.link == router.asPath && (
        <div className="w-[20px] h-[20px] absolute right-[-20px] bottom-0 bg-[#F6F6F9] z-10 rounded-full border-l -rotate-45" />
      )}
      <FontAwesomeIcon icon={button.icon} className="mr-[10px]" />
      <span className="hidden smp:!inline-block"> {button.name}</span>
    </div>
  )
}
export default Tab
