import React, { HTMLProps } from 'react'

interface IProps extends HTMLProps<HTMLTableElement> {
  wrapperProps?: HTMLProps<HTMLDivElement>
}
export default function Table({ wrapperProps, ...props }: IProps) {
  return (
    <div
      {...wrapperProps}
      className={`w-full rounded-[16px] border shadow-md p-[20px] mt-[30px] ${wrapperProps?.className}`}
    >
      <table {...props} className={`w-full ${props.className}`}>
        {props.children}
      </table>
    </div>
  )
}
