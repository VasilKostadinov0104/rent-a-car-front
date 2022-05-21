import React, { MouseEventHandler } from 'react'
interface Props extends React.HTMLProps<HTMLButtonElement> {
  buttonColor?: 'white' | 'green'
}

export default function Button({ buttonColor, ...props }: Props) {
  let COLOR =
    'rounded-[8px]  w-[193px] text-[16px] smp:!text-[18px] lg:!text-[18px] leading-[18px] transition-all group h-[54px] disabled:!opacity-60 disabled:!pointer-events-none font-OpenSans '
  switch (buttonColor) {
    case 'white':
      COLOR +=
        'bg-white text-[#1b3859] hover:bg-[#1b3859] hover:text-white transition-all'
      break
    case 'green': {
      COLOR += 'bg-[#36b37e] text-white hover:bg-green-500'
      break
    }

    default:
      COLOR +=
        'bg-white text-[#1b3859] hover:bg-[#1b3859] hover:text-white transition-all'
      break
  }

  return (
    //@ts-ignore
    <button {...props} className={`${COLOR} ${props.className}`}>
      {props.children}
    </button>
  )
}
