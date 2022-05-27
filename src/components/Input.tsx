import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

interface IProps
  extends React.HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  form_methods?: UseFormReturn<FieldValues, any> | null
  label: string
  icon?: IconProp
  name: string
  selectable?: boolean

  selectableOptions?: Array<Option>

  form_required?: string | null
  form_pattern?: RegExp
  wrapperClassName?: string
  grayOut?: boolean
  maxValue?: number
  noLabel?: boolean
  suffix?: any
  dropdownNotAbsolute?: boolean
  textarea?: boolean
  customPatternError?: string
  customReqiredError?: string
  customMaxError?: string
  customGenericError?: string
}

type Option = {
  name: string
  value: string
  icon?: IconProp
}

export default function Input({
  name,
  icon,
  label,
  form_methods = null,
  selectable = false,

  selectableOptions = [],

  form_required = null,
  form_pattern = null,
  wrapperClassName,
  grayOut,
  maxValue = null,
  noLabel = false,
  suffix = null,
  dropdownNotAbsolute = false,
  textarea,
  customGenericError,
  customMaxError,
  customPatternError,
  customReqiredError,
  ...props
}: IProps) {
  const [open, setOpen] = useState(false)
  const { locale = 'en' } = useRouter()
  const input: React.MutableRefObject<HTMLInputElement> = useRef(null)
  const suffixElement: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const dropdown: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const errors = {
    required: customReqiredError
      ? customReqiredError
      : 'This field is required!',
    pattern: customPatternError
      ? customPatternError
      : 'Please enter correct data!',
    generic: customGenericError ? customGenericError : 'Incorrect information!',
    max: customMaxError ? customMaxError : 'Number too high',
  }

  const error = form_methods?.formState?.errors?.[`${name}`]

  const inputClassName = `h-[56px] rounded-[8px] w-full outline-[#183b56] dark:text-gray-100 dark:bg-gray-800 border dark:border-gray-900 border-[#c3cad9] font-OpenSans font-normal text-[16px] tracking-[0px] text-[#183b56] pl-[20px] pr-[60px] ${
    error ? '!border-red-600' : ''
  } ${grayOut ? 'bg-[#c3cad9]' : ''} ${props.className}`
  return (
    <div
      className={`flex flex-col mb-[18px] ${
        selectable ? 'cursor-pointer' : 'cursor-auto'
      } ${wrapperClassName}`}
    >
      {!noLabel && (
        <label
          className="mb-[12px] font-HKGrotesk text-[18px] font-normal leading-[24px] tracking-[0.2px] text-[#5a7184] dark:text-gray-300"
          htmlFor={props.id}
        >
          {label} {form_required && <span className="text-red-600">*</span>}{' '}
        </label>
      )}
      <div className="relative">
        <div className="absolute right-[20px] h-full flex items-center z-0">
          <span className="mr-1">{suffix && suffix}</span>
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={`${
                error ? 'text-red-600' : 'text-[#183b56] dark:text-gray-300 z-0'
              } text-[16px]`}
            />
          )}
        </div>
        {!textarea ? (
          <input
            ref={input}
            onClick={() => setOpen(true)}
            name={name}
            {...props}
            required={false}
            {...form_methods?.register(selectable ? name + '_select' : name, {
              max: maxValue || null,
              pattern: form_pattern,
              required: form_required,
              onBlur: (e) => {
                setTimeout(() => setOpen(false), 300)
              },
              onChange: (e) => {
                form_methods.trigger(name)
                props.onChange && props.onChange(e)
              },
            })}
            className={inputClassName}
          />
        ) : (
          <textarea
            ref={input}
            onClick={() => setOpen(true)}
            name={name}
            {...props}
            required={false}
            {...form_methods?.register(selectable ? name + '_select' : name, {
              max: maxValue || null,

              required: form_required,
              onBlur: (e) => {
                setTimeout(() => setOpen(false), 300)
              },
              onChange: (e) => {
                form_methods.trigger(name)
                props.onChange && props.onChange(e)
              },
            })}
            className={inputClassName}
          ></textarea>
        )}

        {selectable && open && selectableOptions && (
          <div
            ref={dropdown}
            id="select_dropdown"
            className={`animate-slideDown z-10 text-[#183b56] bg-white dark:bg-dark dark:text-white w-full rounded-[8px] dark:border-gray-900 border-[#c3cad9] min-h-[56px] border mt-[10px] flex flex-col max-h-[400px] overflow-y-auto ${
              !dropdownNotAbsolute ? 'absolute' : ''
            }`}
          >
            {selectableOptions?.map((opt, key) => (
              <div
                key={opt.value + key}
                className="flex items-center min-h-[56px] dark:hover:bg-gray-800 hover:bg-gray-100 cursor-pointer px-[20px]"
                onClick={() => {
                  form_methods.setValue(name, opt.value)
                  form_methods.setValue(name + '_select', opt.name)
                  setTimeout(() => {
                    form_methods.trigger(name)
                  }, 300)
                }}
              >
                {opt.icon && (
                  <FontAwesomeIcon icon={opt.icon} className="mr-[10px]" />
                )}{' '}
                {opt.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <span className="text-red-600">
          {error?.type == 'required'
            ? errors?.required
            : error?.type == 'pattern'
            ? errors.pattern
            : errors.generic == 'generic'
            ? errors.generic
            : errors.max}
        </span>
      )}
    </div>
  )
}
