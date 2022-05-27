import { Down } from '@icons/Down'
import { Up } from '@icons/Up'
import React from 'react'

export default function TableHead(props: {
  elements: { name: string; onClick?: (e) => void; value: string }[]
  className?: string
  wrapperClassName?: string
  sort?: string
  order?: string
  handleSelectAll(): void
}) {
  return (
    <thead className={props.wrapperClassName}>
      <tr>
        <th
          className={
            'text-left py-[15px] text-black text-opacity-60 uppercase text-[12px] border-b cursor-pointer font-HKGrotesk ' +
            props.className
          }
        >
          <input
            onClick={(e) => props.handleSelectAll()}
            type="checkbox"
            id="checkboxMain"
            className="cursor-pointer accent-primary checkboxMain
            "
          />
        </th>
        {props.elements.map((element, key) => (
          <th
            className={
              'text-left py-[15px] text-black text-opacity-60 uppercase text-[12px] border-b cursor-pointer font-HKGrotesk ' +
              props.className
            }
            key={key}
            onClick={(e) => (element.onClick ? element.onClick(e) : null)}
          >
            <div className="flex items-center">
              {element.name}
              {props.sort &&
              props.order &&
              props.sort.toLowerCase() == element.value.toLowerCase() ? (
                props.order == 'desc' ? (
                  <Down className={'w-[8px]  ml-[5px]'} />
                ) : (
                  <Up className={'w-[8px]  ml-[5px]'} />
                )
              ) : null}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
