import { StrapiButton } from '@components/Button'
import NoEntries from '@components/NoEntries'
import Pagination from '@components/Pagination'
import Table from '@components/Table'
import TableCol from '@components/TableCol'
import TableHead from '@components/TableHead'
import TableRow from '@components/TableRow'
import {
  faChevronLeft,
  faChevronRight,
  faCopy,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeAllListeners } from 'process'
import React from 'react'
import { toast } from 'react-toastify'
import { VehiclesTypes } from '../types'

const Vehicles = ({
  data,
  refetch,
  order,
  setOrder,
  sort,
  setSort,
  setCreationModal,
  handleSelectAll,
  handleSelect,
  page,
  setPage,
  pageSize,
  setPageSize,
  setSelected,
  setDetailsModal,
  setEdit,
  dbManager,
  massDelete,
  showMassActions,
}: VehiclesTypes.IVehicles): JSX.Element => {
  return (
    <Table>
      <TableHead
        handleSelectAll={handleSelectAll}
        sort={sort}
        order={order}
        elements={[
          {
            name: '#',
            value: 'id',
            onClick: (e) => {
              setSort('id')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Brand',
            value: 'brand',
            onClick: (e) => {
              setSort('brand')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Model',
            value: 'model',
            onClick: (e) => {
              setSort('model')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Category',
            value: 'category',
            onClick: (e) => {
              setSort('category')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Fuel type',
            value: 'fuelType',
            onClick: (e) => {
              setSort('fuelType')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Status',
            value: 'rented',
            onClick: (e) => {
              setSort('rented')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Actions',
            value: '',
          },
        ]}
      />

      <tbody>
        {data?.length > 0 ? (
          data
            ?.slice(pageSize * (page - 1), pageSize * page)
            ?.map((vehicle, key) => {
              return (
                <TableRow
                  key={key}
                  imgSRC={vehicle.image}
                  onClick={() => {
                    setSelected(vehicle)
                    setDetailsModal(true)
                  }}
                >
                  <TableCol>
                    <input
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelect(`row-${vehicle.id}`)
                      }}
                      id={`row-${vehicle.id}`}
                      type="checkbox"
                      className="accent-primary checkbox"
                    />
                  </TableCol>
                  <TableCol>{vehicle.id}</TableCol>
                  <TableCol>{vehicle.brand}</TableCol>
                  <TableCol>{vehicle.model}</TableCol>
                  <TableCol>{vehicle.category}</TableCol>
                  <TableCol>{vehicle.fuelType}</TableCol>
                  <TableCol>{vehicle.rented ? 'Rented' : 'Free'}</TableCol>
                  <TableCol onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-[5px] w-full max-w-[100px] justify-between h-full">
                      <FontAwesomeIcon
                        icon={faPen}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          if (vehicle.rented) {
                            toast.error(
                              'You can edit a vehicle ONLY WHEN it is not RENTED.'
                            )
                          } else {
                            setEdit(true)
                            setCreationModal(true)
                          }
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faCopy}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          let data = vehicle
                          delete data.id
                          delete data.createdAt
                          delete data.updatedAt
                          delete data.rents
                          data.rented = false
                          dbManager.create('vehicles', { ...data })
                          // refetch()
                          setSort('id')
                          setOrder('desc')
                          refetch(null, 'id', 'desc')
                          toast.success('Vehicle dublicated.')
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          if (
                            confirm(
                              `Are your sure you want to delete vehicle: #${vehicle.id} ${vehicle.brand} ${vehicle.model}? This action is ireverseable.`
                            )
                          ) {
                            dbManager
                              .delete(vehicle.id, 'vehicles')
                              .then((res) => {
                                if (res) {
                                  toast.warn(`Vehicle #${vehicle.id} deleted.`)
                                  // refetch()
                                  setSort('id')
                                  setOrder('desc')
                                  refetch(null, 'id', 'desc')
                                }
                              })
                          }
                        }}
                      />
                    </div>
                  </TableCol>
                </TableRow>
              )
            })
        ) : (
          <NoEntries />
        )}
      </tbody>
      <tfoot>
        <tr>
          <td className="py-[20px]" colSpan={99}>
            <Pagination {...{ page, pageSize, setPage, total: data?.length }} />
          </td>
        </tr>
        <tr className="border-t">
          <td colSpan={99}>
            <div className="flex items-center justify-between pt-[20px]">
              <StrapiButton
                onClick={() => {
                  setEdit(false)
                  setCreationModal(true)
                }}
              >
                + Add Vehicle
              </StrapiButton>
              {showMassActions && (
                <StrapiButton
                  buttonColor="redSecondary"
                  className="animate-fadeIn"
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete all selected vehicles?'
                      )
                    ) {
                      massDelete()
                    }
                  }}
                >
                  Delete selected
                </StrapiButton>
              )}
            </div>
          </td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default Vehicles
