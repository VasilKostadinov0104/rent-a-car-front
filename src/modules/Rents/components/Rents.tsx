import { RentACarApp } from '@appTypes/app'
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
import { RentsTypes } from '../types'

const Rents = ({
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
}: RentsTypes.IRents): JSX.Element => {
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
            name: 'Vehicle',
            value: 'vehicle',
          },
          {
            name: 'Customer',
            value: 'customer',
          },
          {
            name: 'Starts',
            value: 'start',
            onClick: (e) => {
              setSort('phone')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },

          {
            name: 'Ends',
            value: 'end',
            onClick: (e) => {
              setSort('vip')
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
            ?.map((rent: RentACarApp.Rent.IRent, key) => {
              return (
                <TableRow
                  key={key}
                  onClick={() => {
                    setSelected(rent)
                    setDetailsModal(true)
                  }}
                >
                  <TableCol>
                    <input
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelect(`row-${rent.id}`)
                      }}
                      id={`row-${rent.id}`}
                      type="checkbox"
                      className="accent-primary checkbox"
                    />
                  </TableCol>
                  <TableCol>{rent?.id}</TableCol>
                  <TableCol>
                    {rent?.vehicle?.brand + ' ' + rent?.vehicle?.model}
                  </TableCol>
                  <TableCol>{rent?.customer?.name}</TableCol>
                  <TableCol>
                    {new Date(rent?.start).toLocaleDateString('en-gb')}
                  </TableCol>
                  <TableCol>
                    {new Date(rent?.end).toLocaleDateString('en-gb')}
                  </TableCol>

                  <TableCol onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-[5px] w-full max-w-[100px] justify-between h-full">
                      <FontAwesomeIcon
                        icon={faPen}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          setSelected(rent)
                          setEdit(true)
                          setCreationModal(true)
                        }}
                      />

                      <FontAwesomeIcon
                        icon={faTrash}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          if (
                            confirm(
                              `Are your sure you want to delete customer: #${rent.id}? This action is ireverseable.`
                            )
                          ) {
                            dbManager.delete(rent.id, 'rents').then((res) => {
                              if (res) {
                                toast.warn(`Customer #${rent.id} deleted.`)
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
                + Add Rent
              </StrapiButton>
              {showMassActions && (
                <StrapiButton
                  buttonColor="redSecondary"
                  className="animate-fadeIn"
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete all selected Rents?'
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

export default Rents
