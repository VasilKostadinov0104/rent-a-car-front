/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import DesktopOnlyWrapper from './DesktopOnlyWrapper'
import useScroll from '../hooks/useScroll'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'

//this is under development and may be implemented one sunny day :)
export enum animation {
  openMiddle,
  fadeIn,
}

export default function Modal({
  children,
  width,
  height = null,
  setOpen,
  modalClassName = '',
  backgroundClassName = ' grid place-items-center',
  withEx = true,
  image = null,
  imageClassName = null,
  imageBG = null,
  imageY = 'top-[-62.5px]',
  imageX = 'left-[-62.5px]',
}) {
  const [style, setStyle] = useState({ opacity: 0 })
  function handleClose() {
    document
      .querySelectorAll('.modal')
      .forEach((obj) =>
        obj.classList.replace('animate-fadeIn', 'animate-fadeOut')
      )
    setStyle({ opacity: 0 })
    setTimeout(() => setOpen(false), 300)
  }

  const [blockScroll, allowScroll] = useScroll()

  useEffect(() => {
    setStyle({ opacity: 1 })
    blockScroll()
    return () => {
      allowScroll()
    }
  }, [])
  return ReactDOM.createPortal(
    <div
      style={style}
      id="modal-background"
      className={`modal fixed inset-0 z-300 bg-black backdrop-blur-md dark:!bg-opacity-70 !bg-opacity-[0.35] animate-fadeIn ${backgroundClassName}`}
      onClick={() => handleClose()}
    >
      <div
        id="modal-content"
        className={`modal bg-white dark:bg-dark rounded-[8px] p-[34px] animate-fadeIn relative box-border ${modalClassName}`}
        style={{ width: '100%', maxWidth: width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        {withEx && (
          <FontAwesomeIcon
            id={'modal_x'}
            icon={faTimes}
            onClick={() => handleClose()}
            className={`absolute top-[15px] z-300 text-[#183b56] dark:text-white right-[15px] cursor-pointer `}
          />
        )}
        {image && (
          <DesktopOnlyWrapper>
            <img
              src={image}
              className={`${imageBG} ${imageX} ${imageY} w-[125px] h-[125px] object-scale-down absolute  rounded-full  transition-all ${imageClassName}`}
            />
          </DesktopOnlyWrapper>
        )}
        {children}
      </div>
    </div>,
    document.body
  )
}
