import { StrapiButton } from '@components/Button'
import Input from '@components/Input'
import Modal from '@components/Modal'
import { faCaretDown, faImage } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { CustomersTypes } from '../types'

export default function CreationModal({
  setCreationModal,
  edit,
  search,
  filter,
  sort,
  order,
  dbManager,
  refetch,
  selected,
}: CustomersTypes.ICreationModal) {
  const form = useForm()
  function onSubmit(data, e) {
    if (edit) {
      dbManager
        .update(selected.id, 'customers', { ...data })
        .then((res) => {
          toast.success('Customer Updated!')
          setCreationModal(false)
          refetch()
        })
        .catch((e) => {
          toast.error('Customer was NOT updated.')
        })
    } else {
      dbManager
        .create('customers', {
          ...data,
          vip: false,
          rents: [],
        })
        .then((res) => {
          toast.success('Customer added!')
          setCreationModal(false)
          refetch()
        })
        .catch((e) => {
          toast.error('Customer was NOT added.')
        })
    }
  }
  useEffect(() => {
    if (edit) {
      Object.keys(selected).forEach((key) => {
        form.setValue(key, selected?.[key])
      })
    }
  }, [])
  return (
    <Modal setOpen={setCreationModal} width={'80vw'}>
      <form
        className="flex flex-col"
        onSubmit={(e) => form.handleSubmit(onSubmit)(e)}
      >
        <h3 className="font-HKGrotesk text-[24px] mb-[20px]">
          {edit ? 'Edit Customer' : 'Add customer'}
        </h3>
        <div className="grid w-full grid-cols-2 gap-[20px]">
          <Input
            label="Name"
            name="name"
            form_methods={form}
            form_required="name"
          />
          <Input
            label="Email"
            name="email"
            form_methods={form}
            form_required="email"
            // type="email"
            form_pattern={
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s?$/
            }
          />
          <Input
            label="Phone"
            name="phone"
            form_methods={form}
            form_required="phone"
            form_pattern={
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,14}$/
            }
            // type="tel"
          />
          <Input
            label="Image: (url)"
            name="image"
            form_methods={form}
            icon={faImage}
          />
        </div>
        <div>
          <StrapiButton type="submit">
            {!edit ? '+ Add Customer' : 'Edit Customer'}
          </StrapiButton>
        </div>
      </form>
    </Modal>
  )
}
