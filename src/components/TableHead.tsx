import { Down } from '@icons/Down'
import { Up } from '@icons/Up'
import React from 'react'

export default function TableHead(props: {
  elements: { name: string; onClick?: (e) => void }[]
  className?: string
  wrapperClassName?: string
  sort?: string
  order?: string
}) {
  return (
    <thead className={props.wrapperClassName}>
      <tr>
        {props.elements.map((element, key) => (
          <th
            className={
              'text-left py-[15px] text-black text-opacity-60 uppercase text-[14px] border-b cursor-pointer ' +
              props.className
            }
            key={key}
            onClick={(e) => (element.onClick ? element.onClick(e) : null)}
          >
            <div className="flex items-center">
              {element.name}
              {props.sort &&
              props.order &&
              props.sort.toLowerCase() == element.name.toLowerCase() ? (
                props.order == 'desc' ? (
                  <Down className={'w-[10px]  ml-[5px]'} />
                ) : (
                  <Up className={'w-[10px]  ml-[5px]'} />
                )
              ) : null}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
