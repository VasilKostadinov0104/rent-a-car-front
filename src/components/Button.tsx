import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react'

export interface StrapiButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonColor?:
    | 'primary'
    | 'secondary'
    | 'greenPrimary'
    | 'redPrimary'
    | 'greenSecondary'
    | 'redSecondary'
}

export function StrapiButton({
  children,
  buttonColor = 'primary',
  ...props
}: StrapiButton): JSX.Element {
  const [hover, setHover] = useState(false)
  let backgroundColor, color
  switch (buttonColor) {
    case 'primary': {
      backgroundColor = '#1565d8'
      color = '#ffffff'
      break
    }
    case 'secondary': {
      backgroundColor = '#183b56'
      color = '#4945FF'
      break
    }
    case 'redPrimary': {
      backgroundColor = '#B72B1A'
      color = '#ffffff'
      break
    }
    case 'redSecondary':
      backgroundColor = '#FCECEA'
      color = '#B72B1A'
      break
    case 'greenPrimary':
      backgroundColor = '#5ab331'
      color = '#fff'
      break
    case 'greenSecondary':
      backgroundColor = '#d1f7ca'
      color = '#5ab331'
      break
    default:
      backgroundColor = '#4945FF'
      color = '#ffffff'
      break
  }
  return (
    <button
      {...props}
      onMouseEnter={(e) => {
        setHover(true)
        props?.onMouseEnter && props?.onMouseEnter(e)
      }}
      onMouseLeave={(e) => {
        setHover(false)
        props?.onMouseLeave && props?.onMouseLeave(e)
      }}
      style={{
        color:
          hover && (!buttonColor?.includes('rimary') || !buttonColor)
            ? backgroundColor
            : color,
        backgroundColor:
          hover && (!buttonColor?.includes('rimary') || !buttonColor)
            ? color
            : backgroundColor,
        border: `1.5px solid ${color}`,
        ...props.style,
      }}
      className={`transition-all h-[42px] px-[16px] hover:saturate-200 active:opacity-40 rounded-full text-white font-bold  smp:!w-auto w-full ${props.className}`}
    >
      {children}
    </button>
  )
}
