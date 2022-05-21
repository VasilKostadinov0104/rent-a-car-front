/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'

import { useWindowSize } from '../hooks/useWindowSize'
type Props = {
  setter: any
  value: any
  register?: any
  label?: string | null
  placeholder?: any
  type: string | null
  error?: any | null
  width?: number | null
  marginBottom?: number | null
  name?: string | null
  required: boolean
  ref?: any
  autocomplete?: boolean | null
  className?: any
}

export default function Input({
  autocomplete = true,
  setter,
  value,
  register = () => {},
  label = null,
  placeholder = null,
  type,
  error = null,
  width = null,
  marginBottom = null,
  name = null,
  required = false,
  ref = null,
  className = null,
}: Props) {
  const [showPass, setShowPass] = useState(false)
  const size = useWindowSize()
  return (
    <div
      className={`flex flex-col text-[#183b56] gap-[8px] ${className}`}
      style={{
        marginBottom: marginBottom ? marginBottom : 0,
      }}
    >
      {label && label?.length && label?.length > 20 ? (
        <label className="text-[14px] max-w-[350px] leading-[22px] text-[#5a7184] font-OpenSans">
          {label}
        </label>
      ) : (
        <label className="text-[14px] leading-[22px] text-[#5a7184] font-OpenSans">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          autoComplete="none"
          // autoComplete="off"
          ref={ref}
          name={name}
          className="h-[56px] rounded-[8px] border w-full px-[20px] outline-none"
          value={value}
          required={required}
          placeholder={placeholder}
          type={showPass ? 'text' : type}
          {...register}
          onChange={(e) => setter(e.target.value)}
        />
        {type == 'password' && (
          <img
            className="absolute right right-[15px] top-[23px] cursor-pointer"
            src="/icn-password/icn-password.png"
            onClick={() => setShowPass(!showPass)}
          />
        )}
        {/* {required && (
          <div className="absolute right right-[-15px] top-[15px] text-red-600 cursor-pointer">
            *
          </div>
        )} */}
      </div>

      <span className="text-red-600">{error && error}</span>
    </div>
  )
}
