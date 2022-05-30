import { RentACarApp } from '@appTypes/app'
import { StrapiButton } from '@components/Button'
import Input from '@components/Input'
import Modal from '@components/Modal'
import {
  faCaretDown,
  faCrown,
  faImage,
} from '@fortawesome/free-solid-svg-icons'
import { format } from 'node:path/win32'
import rents from 'pages/rents'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { RentsTypes } from '../types'

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
}: RentsTypes.ICreationModal) {
  const form = useForm()
  const [vehicles, setVehicles] = useState<RentACarApp.Vehicle.IVehicle[]>(null)
  const [customers, setCustomers] =
    useState<RentACarApp.Customer.ICustomer[]>(null)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [days, setDays] = useState(0)
  const [vehicle, setVehicle] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [customerImage, setCustomerImage] = useState(null)
  const [vehicleImage, setVehicleImage] = useState(null)
  function onSubmit(data, e) {
    const vehicle = vehicles.filter(
      (_vehicle) => _vehicle.id == data?.vehicle
    )[0] || { id: data?.vehicle }
    const customer = customers.filter(
      (_customer) => _customer.id == data?.customer
    )[0] || { id: data?.customer }
    if (edit) {
      dbManager
        .update(selected.id, 'rents', {
          price,
          vehicle: Number(data?.vehicle),
          customer: Number(data?.customer),
          start: new Date(data.start + 'T00:00:00.000').toISOString(),
          end: new Date(data.end + 'T00:00:00.000').toISOString(),
        })
        .then((res) => {
          toast.success('Rent Updated!')
          setCreationModal(false)
          refetch()
        })
        .catch((e) => {
          toast.error('Rent was NOT updated.')
        })
    } else {
      dbManager
        .create('rents', {
          price,
          vehicle: Number(data?.vehicle),
          customer: Number(data?.customer),
          start: new Date(data.start + 'T00:00:00.000').toISOString(),
          end: new Date(data.end + 'T00:00:00.000').toISOString(),
        })
        .then((res) => {
          dbManager.update(data?.vehicle, 'vehicles', {
            //@ts-ignore
            rents: [...vehicle.rents, Number(res.id)],
          })
          dbManager.update(data?.customer, 'customers', {
            //@ts-ignore
            rents: [...customer.rents, Number(res.id)],
          })
          //@ts-ignore

          setCreationModal(false)
          toast.success('Rent added!')
          refetch()
          return res
        })
        .then((res) => {})
        .catch((e) => {
          toast.error('Rent was NOT added.')
        })
    }
  }
  useEffect(() => {
    if (edit) {
      Object.keys(selected).forEach((key) => {
        if (key == 'customer') {
          form.setValue(key + '_select', selected?.[key].name)
          setCustomerImage(selected?.customer.image)
        }
        if (key == 'vehicle') {
          let vehicle = selected?.vehicle
          form.setValue(
            'vehicle_select',
            `${vehicle.brand} ${vehicle.model}, ${vehicle.fuelType}, ${vehicle.numberOfSeats}, ${vehicle.constructionYear}`
          )
          setVehicleImage(selected.vehicle.image)
        }
        form.setValue(key, selected?.[key])
        if (key == 'start' || key == 'end') {
          form.setValue(key, selected?.[key].split('T')[0])
        }
      })
      calculatePrice()
    }

    dbManager
      .getMany('vehicles', null, 'id', 'desc', 'rented=false', false)
      .then((res) => setVehicles(res))
    dbManager
      .getMany('customers', null, 'id', 'desc', null, false)
      .then((res) => setCustomers(res))
  }, [])

  const watch = useWatch({
    control: form.control,
    name: ['vehicle', 'customer', 'start', 'end'],
  })
  useEffect(() => {
    calculatePrice()
  }, [watch])

  async function calculatePrice() {
    setDays(0)
    const vehicle: RentACarApp.Vehicle.IVehicle = await dbManager.getOne(
      Number(watch[0] ?? form.getValues().vehicle),
      'vehicles'
    )
    setVehicle(vehicle)
    const customer: RentACarApp.Customer.ICustomer = await dbManager.getOne(
      Number(watch[1] ?? form.getValues().customer),
      'customers'
    )
    setCustomer(customer)
    const start = new Date(watch[2] ?? form.getValues().start + 'T00:00:00.000')
    const end = new Date(watch[3] ?? form.getValues().end + 'T00:00:00.000')
    if (vehicle && customer && start && end) {
      let _price = 0
      let days = Math.abs(end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24
      setDays(days)
      _price = days * vehicle.pricePerDay
      setDiscount(0)
      if (customer.vip) {
        _price = (_price / 100) * 85
        setDiscount(15)
      } else {
        //not vip
        if (days > 10) {
          _price = (_price / 100) * 90
          setDiscount(10)
        } else if (days > 5) {
          _price = (_price / 100) * 93
          setDiscount(7)
        } else if (days > 3) {
          _price = (_price / 100) * 95
          setDiscount(5)
        } else if (days <= 0) {
          _price = vehicle.pricePerDay
          setDiscount(0)
          setDays(1)
        }
      }
      setPrice(_price)
    }
  }
  return (
    <Modal setOpen={setCreationModal} width={'80vw'}>
      <form
        className="flex flex-col"
        onSubmit={(e) => form.handleSubmit(onSubmit)(e)}
      >
        <h3 className="font-HKGrotesk text-[24px] mb-[20px]">
          {edit ? 'Edit Rent' : 'Add Rent'}
        </h3>
        <div className="grid w-full grid-cols-2 gap-[20px]">
          <img
            src={
              customerImage && edit
                ? customerImage
                : customer?.image || '/placeholderUser.png'
            }
            className="h-[200px] w-full object-contain"
          />
          <img
            src={
              vehicleImage && edit
                ? vehicleImage
                : vehicle?.image || '/placeholder.png'
            }
            className="h-[200px] w-full object-contain"
          />

          <Input
            label="Customer"
            name="customer"
            form_methods={form}
            form_required="customer"
            selectable
            selectableOptions={customers?.map((customer) => {
              return {
                name: customer.name,
                value: customer.id.toString(),
                icon: customer.vip ? faCrown : null,
              }
            })}
            readOnly
            className="cursor-pointer"
            icon={faCaretDown}
          />
          <Input
            label="Vehicle"
            name="vehicle"
            form_methods={form}
            form_required="vehicle"
            selectable
            selectableOptions={vehicles?.map((vehicle) => ({
              name: `${vehicle.brand} ${vehicle.model}, ${vehicle.fuelType}, ${vehicle.numberOfSeats}, ${vehicle.constructionYear}`,
              value: vehicle.id.toString(),
            }))}
            className="cursor-pointer"
            readOnly
            icon={faCaretDown}
          />
          <Input
            label="Start Date"
            name="start"
            form_methods={form}
            type="date"
          />
          <Input label="End Date" name="end" form_methods={form} type="date" />
        </div>
        <div className="flex items-center justify-between">
          <StrapiButton type="submit">
            {!edit ? '+ Add Rent' : 'Edit Rent'}
          </StrapiButton>
          <p className="text-[18px] font-HKGrotesk text-secondary">
            Days: <span className="font-bold">{days || 0}</span>, Price:{' '}
            <span className="font-bold">
              {discount ? `Discount: ${discount}%` : null} $
              {Math.round(price) || 0}
            </span>
          </p>
        </div>
      </form>
    </Modal>
  )
}
