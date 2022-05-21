import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Tab = ({ slug, name, index, mapIndex }) => {
  const [white, setWhite] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setWhite(router?.asPath?.includes(slug))
  }, [router])
  return (
    <div
      onClick={() => {
        router.push(slug)
      }}
      className={`h-full w-full flex items-center smp:!pl-[20px] text-[14px] smp:!text-[16px] cursor-pointer group relative 
    ${
      white
        ? 'bg-[#fff] text-[#4945FF] rounded-t-[12px] font-bold border-t border-x bottom-[-1px]'
        : 'bg-[#F6F6F9] text-[#15143f] text-opacity-50'
    }
    ${mapIndex + 1 > index ? 'border-l' : ''} 
    ${mapIndex + 1 < index ? 'border-r' : ''}
    `}
    >
      {slug == router.asPath && (
        <div className="w-[10px] h-[10px] absolute right-[-10px] bottom-0 bg-[#fff] z-10" />
      )}
      {slug == router.asPath && (
        <div className="w-[10px] h-[10px] absolute left-[-10px] bottom-0 bg-[#fff] z-10" />
      )}
      {slug == router.asPath && (
        <div className="w-[20px] h-[20px] absolute left-[-20px] bottom-0 bg-[#F6F6F9] z-10 rounded-full border-r rotate-45" />
      )}
      {slug == router.asPath && (
        <div className="w-[20px] h-[20px] absolute right-[-20px] bottom-0 bg-[#F6F6F9] z-10 rounded-full border-l -rotate-45" />
      )}

      <span className="hidden smp:!inline-block"> {name}</span>
    </div>
  )
}
export default Tab
