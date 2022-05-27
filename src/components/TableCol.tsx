import React, { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLTableCellElement> {}
export default function TableCol(props: Props) {
  return (
    <td {...props} className={`py-[15px] font-HKGrotesk ${props.className}`}>
      {props.children}
    </td>
  )
}
