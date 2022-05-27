import { StrapiButton } from '@components/Button'
import Input from '@components/Input'
import Modal from '@components/Modal'
import { faCaretDown, faImage } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { VehiclesTypes } from '../types'

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
}: VehiclesTypes.ICreationModal) {
  const form = useForm()
  function onSubmit(data, e) {
    if (edit) {
      dbManager
        .update(selected.id, 'vehicles', { ...data })
        .then((res) => {
          toast.success('Vehicle Updated!')
          setCreationModal(false)
          refetch()
        })
        .catch((e) => {
          toast.error('Vehicle was NOT updated.')
        })
    } else {
      dbManager
        .create('vehicles', {
          ...data,
        })
        .then((res) => {
          toast.success('Vehicle added!')
          setCreationModal(false)
          refetch()
        })
        .catch((e) => {
          toast.error('Vehicle was NOT added.')
        })
    }
  }
  useEffect(() => {
    if (edit) {
      Object.keys(selected).forEach((key) => {
        if (key == 'category' || key == 'fuelType') {
          form.setValue(`${key}_select`, selected?.[key])
        }
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
          {edit ? 'Edit Vehicle' : 'Add vehicle'}
        </h3>
        <div className="grid w-full grid-cols-2 gap-[20px]">
          <Input
            label="Brand"
            name="brand"
            form_methods={form}
            form_required="brand"
          />
          <Input
            label="Model"
            name="model"
            form_methods={form}
            form_required="model"
          />
          <Input
            label="Category"
            name="category"
            form_methods={form}
            form_required="category"
            selectable
            readOnly
            className="cursor-pointer"
            selectableOptions={[
              { name: 'Economy', value: 'economy' },
              { name: 'Estate', value: 'estate' },
              { name: 'Luxury', value: 'luxury' },
              { name: 'SUV', value: 'SUV' },
              {
                name: 'Cargo',
                value: 'cargo',
              },
            ]}
            icon={faCaretDown}
          />
          <Input
            label="Fuel type"
            name="fuelType"
            form_methods={form}
            form_required="fuel"
            selectable
            readOnly
            className="cursor-pointer"
            selectableOptions={[
              { name: 'Petrol', value: 'petrol' },
              { name: 'Diesel', value: 'diesel' },
              { name: 'Hybrid', value: 'hybrid' },
              { name: 'Electric', value: 'electric' },
              {
                name: 'CNG',
                value: 'CNG',
              },
              {
                name: 'LPG',
                value: 'LPG',
              },
            ]}
            icon={faCaretDown}
          />
          <Input
            label="Number of Seats"
            name="numberOfSeats"
            form_methods={form}
            form_required="seats"
            type="number"
          />
          <Input
            label="Construction year"
            name="constructionYear"
            form_methods={form}
            form_required="year"
            type="number"
          />
          <Input
            label="Price per day ($)"
            name="pricePerDay"
            form_methods={form}
            form_required="year"
            type="number"
          />
          <Input
            label="Image: (url)"
            name="image"
            form_methods={form}
            form_required="image"
            icon={faImage}
          />
        </div>
        <div>
          <StrapiButton type="submit">+ Add Vehicle</StrapiButton>
        </div>
      </form>
    </Modal>
  )
}
