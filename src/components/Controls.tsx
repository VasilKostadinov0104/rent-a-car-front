import {
  faCaretDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Input from './Input'

export default function Controls({
  collectionLength,
  collectionName,
  form,
  selectableOptions,
  optionsLabel,

  graydOut = false,
  disabled = false,
}) {
  return (
    <div className="flex items-center justify-between">
      <h1>
        {collectionName} ({collectionLength})
      </h1>

      <Input
        label=""
        noLabel
        name="search"
        form_methods={form}
        icon={faMagnifyingGlass}
        className="!rounded-full"
        wrapperClassName="!mb-0 w-full max-w-[550px] rounded-full"
        placeholder="search..."
      />

      <div className="flex items-center w-full max-w-[300px]">
        <label
          className="mr-[15px] font-HKGrotesk text-secondary"
          htmlFor="filter"
        >
          {optionsLabel}:
        </label>

        <Input
          name="filter"
          form_methods={form}
          label="status"
          selectable
          readOnly
          noLabel
          icon={faCaretDown}
          wrapperClassName="!mb-0"
          className="!rounded-full cursor-pointer"
          selectableOptions={selectableOptions}
          grayOut={graydOut}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
