import { RentACarApp } from '@appTypes/app'
import Modal from '@components/Modal'
import { DBManager } from '@utils/DBManager'
import React, { SetStateAction } from 'react'

export default function PreviewModal({
  setDetailsModal,
  selected,
  dbManager,
}: {
  setDetailsModal: React.Dispatch<SetStateAction<boolean>>
  selected: RentACarApp.Vehicle.IVehicle
  dbManager: DBManager
}) {
  return (
    <Modal setOpen={setDetailsModal} width={'80vw'}>
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full flex-nowrap ">
          <div className="w-full mr-[10px]">
            <img
              src={selected.image}
              className="w-full  object-contain object-top rounded-[16px]"
            />
            <p className="text-[14px] font-semibold uppercase opacity-50 mt-[10px]">
              {selected.category} - ${selected.pricePerDay} per day
            </p>
            <h3 className="text-[24px] ">
              {selected.brand} {selected.model}, {selected.fuelType},{' '}
              {selected.numberOfSeats} seats{' '}
              <span className="opacity-50">({selected.constructionYear})</span>
            </h3>

            {selected.description && <p>{selected.description}</p>}
          </div>
          <div className="w-full flex flex-col border rounded-[16px] p-[10px] overflow-y-auto overflow-x-hidden">
            <h4 className="font-HKGrotesk text-[24px] mb-[20px]">Rents:</h4>
            <table className="TABLE font-HKGrotesk">
              <thead>
                <tr className="text-left">
                  <th className="pl-[10px]">#</th>
                  <th className="pl-[10px]">Customer</th>
                  <th className="pl-[10px]">Period</th>
                  <th className="pl-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="INFO">
                {selected.rents.length > 0 ? (
                  selected.rents
                    ?.sort(
                      (a: RentACarApp.Rent.IRent, b: RentACarApp.Rent.IRent) =>
                        a.id - b.id
                    )
                    .map((rent: RentACarApp.Rent.IRent, key) => {
                      return <RentPreview {...{ rent, dbManager, key }} />
                    })
                    .reverse()
                ) : (
                  <tr>
                    <td colSpan={99} className="text-center">
                      This car has not been rented yet.
                    </td>{' '}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const RentPreview = ({
  dbManager,
  rent,
}: {
  dbManager: DBManager
  rent: RentACarApp.Rent.IRent
}) => {
  if (rent.id) {
    return (
      <tr>
        <td>{rent.id}</td>
        <td>{rent.customer ? rent.customer.name : '-'}</td>
        <td>{`${new Date(rent.start).toLocaleDateString('en-GB')} - ${new Date(
          rent.end
        ).toLocaleDateString('en-GB')}`}</td>
        <td>{new Date() > new Date(rent.end) ? 'Completed' : 'ACTIVE'}</td>
      </tr>
    )
  }
}
