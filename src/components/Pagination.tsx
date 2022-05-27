import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction, useState } from 'react'

export default function Pagination({
  page,
  setPage,
  pageSize,
  total,
}: {
  page: number
  setPage: React.Dispatch<SetStateAction<number>>
  pageSize: number
  total: number
}) {
  const [currentPageValue, setCurrentPageValue] = useState(page)
  function enterToApply(press) {
    if (press.key == 'Enter') {
      try {
        document.querySelector<HTMLInputElement>('#paginationInput')?.blur()
      } catch {
        //do nothing
      }
    }
  }
  return (
    <div className="flex items-center justify-center">
      <FontAwesomeIcon
        onClick={() => {
          if (page > 1) {
            setPage((ps) => {
              setCurrentPageValue(ps - 1)
              return ps - 1
            })
          }
        }}
        className={`${
          page > 1 ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
        icon={faChevronLeft}
      />
      <input
        id="paginationInput"
        type="number"
        step={1}
        value={currentPageValue}
        className="border rounded-[16px] w-[100px] text-center mx-[5px]"
        onFocus={(e) => {
          addEventListener('keypress', enterToApply)
        }}
        onChange={(e) => setCurrentPageValue(Number(e.target.value))}
        onBlur={(e) => {
          const number = currentPageValue
          if (number > 0 && number - 1 < total / pageSize) {
            setPage(Math.round(number))
          } else {
            setCurrentPageValue(page)
            document.querySelector<HTMLInputElement>('#paginationInput').value =
              page.toString()
          }

          removeEventListener('keypress', enterToApply)
        }}
      />
      <FontAwesomeIcon
        onClick={() => {
          if (page < total / pageSize) {
            setPage((ps) => {
              setCurrentPageValue(ps + 1)
              return ps + 1
            })
          }
        }}
        className={`${
          page < total / pageSize
            ? 'cursor-pointer'
            : 'opacity-50 pointer-events-none'
        }`}
        icon={faChevronRight}
      />
    </div>
  )
}
