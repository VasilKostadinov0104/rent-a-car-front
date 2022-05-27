import React, { HTMLProps, useState } from 'react'

interface IProps extends HTMLProps<HTMLTableRowElement> {
  imgSRC?: string
}
export default function TableRow({ children, imgSRC, ...props }: IProps) {
  const [mousePos, setMousePos] = useState({ x: null, y: null })

  function handleMouseMove(event) {
    let dot, eventDoc, doc, body, pageX, pageY

    event = event || window.event
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
      event.pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    }

    setMousePos({
      x: event.clientX,
      y: event.clientY,
    })
  }

  return (
    <>
      <tr
        onMouseEnter={(e) => {
          addEventListener('mousemove', handleMouseMove)
        }}
        onMouseLeave={(e) => {
          removeEventListener('mousemove', handleMouseMove)
        }}
        {...props}
        className={`group border-b hover:bg-gray-50 transition-all cursor-pointer ${props.className}`}
      >
        {children}
        {imgSRC && (
          <img
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 fixed w-[200px] z-10 bg-white border rounded-[16px]"
            src={imgSRC}
            style={{ top: mousePos.y + 5, left: mousePos.x + 5 }}
          />
        )}
      </tr>
    </>
  )
}
