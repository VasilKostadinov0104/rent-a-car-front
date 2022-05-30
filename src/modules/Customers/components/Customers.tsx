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
  faCrown,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeAllListeners } from 'process'
import React from 'react'
import { toast } from 'react-toastify'
import { CustomersTypes } from '../types'

const Customers = ({
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
}: CustomersTypes.ICustomers): JSX.Element => {
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
            name: 'Name',
            value: 'name',
            onClick: (e) => {
              setSort('name')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Email',
            value: 'email',
            onClick: (e) => {
              setSort('email')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },
          {
            name: 'Phone',
            value: 'phone',
            onClick: (e) => {
              setSort('phone')
              setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
            },
          },

          {
            name: 'Status',
            value: 'vip',
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
            ?.map((customer, key) => {
              return (
                <TableRow
                  key={key}
                  imgSRC={customer.image}
                  onClick={() => {
                    setSelected(customer)
                    setDetailsModal(true)
                  }}
                >
                  <TableCol>
                    <input
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelect(`row-${customer.id}`)
                      }}
                      id={`row-${customer.id}`}
                      type="checkbox"
                      className="accent-primary checkbox"
                    />
                  </TableCol>
                  <TableCol>{customer.id}</TableCol>
                  <TableCol>
                    {customer.vip && (
                      <FontAwesomeIcon
                        icon={faCrown}
                        title="This customer is a VIP"
                        className="mr-1 text-yellow-500"
                      />
                    )}
                    {customer.name}
                  </TableCol>
                  <TableCol>{customer.email}</TableCol>
                  <TableCol>{customer.phone}</TableCol>

                  <TableCol>{customer.vip ? 'VIP' : 'normal'}</TableCol>
                  <TableCol onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-[5px] w-full max-w-[100px] justify-between h-full">
                      <FontAwesomeIcon
                        icon={faPen}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          setSelected(customer)
                          setEdit(true)
                          setCreationModal(true)
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faCopy}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          let data = customer
                          delete data.id
                          delete data.createdAt
                          delete data.updatedAt
                          delete data.rents
                          data.rents = []

                          dbManager.create('customers', { ...data })
                          // refetch()
                          setSort('id')
                          setOrder('desc')
                          refetch(null, 'id', 'desc')
                          toast.success('Customer dublicated.')
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className=" hover:text-primary cursor-pointer text-secondary transition-all"
                        onClick={() => {
                          if (
                            confirm(
                              `Are your sure you want to delete customer: #${customer.id} ${customer.name}? This action is ireverseable.`
                            )
                          ) {
                            dbManager
                              .delete(customer.id, 'customers')
                              .then((res) => {
                                if (res) {
                                  toast.warn(
                                    `Customer #${customer.id} deleted.`
                                  )
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
                + Add Customer
              </StrapiButton>
              {showMassActions && (
                <StrapiButton
                  buttonColor="redSecondary"
                  className="animate-fadeIn"
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete all selected customers?'
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

export default Customers
