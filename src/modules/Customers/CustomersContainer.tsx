import React, { useEffect, useState } from 'react'

import Customers from './components/Customers'
import { DBManager } from '@utils/DBManager'
import { CustomersTypes } from './types'
import { RentACarApp } from '@appTypes/app'
import { useForm, useWatch } from 'react-hook-form'

import LoaderSpinner from '@components/LoaderSpinner'
import Controls from '@components/Controls'
import Modal from '@components/Modal'
import CreationModal from './components/CreationModal'
import useQuery from '@hooks/useQuery'
import { tableServices } from '@utils/tableServices'
import PreviewModal from './components/PreviewModal'

export default function CustomersContainer({}: CustomersTypes.ICustomersContainer): JSX.Element {
  //database manager instance
  const dbManager = new DBManager()
  //form manager
  const form = useForm()
  const watch = useWatch({
    control: form.control,
    name: ['search', 'filter'],
  })
  //variables
  const [creationModal, setCreationModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [detailsModal, setDetailsModal] = useState(false)
  const [selected, setSelected] = useState<RentACarApp.Customer.ICustomer>(null)
  const [showMassActions, setShowMassActions] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  //query parameters
  const search = watch[0]
  const filter = watch[1]
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, loading, error, refetch } =
    useQuery<RentACarApp.Customer.ICustomer>('customers', { order, sort })

  //#region useEffects

  useEffect(() => {
    form.setValue('filter', 'all')
    form.setValue('filter_select', 'All')
    form.setValue('search', '')
  }, [])

  useEffect(() => {
    if (filter != 'all') {
      refetch(search, sort, order, `vip=${filter == 'vip'}`)
    } else if (filter == 'all') {
      refetch(search, sort, order)
    }
  }, [watch, sort, order])

  useEffect(() => {
    console.log('a')

    if (Array.from(selectedRows).length > 0) {
      setShowMassActions(true)
    } else {
      setShowMassActions(false)
    }
  }, [selectedRows])

  //#endregion useEffects

  //#region functions

  /**
   * Adds all entries to List
   */
  async function handleSelectAll() {
    tableServices.handleSelectAll({ selectedRows, setSelectedRows })
  }
  /**
   *
   * @param id id of entry
   * adds specific entry to List
   */
  function handleSelect(id) {
    tableServices.handleSelect(id, { setSelectedRows })
  }

  /**
   * Deletes all the selected items
   */
  function massDelete() {
    tableServices.massDelete('customers', {
      dbManager,
      refetch,
      selectedRows,
      setOrder,
      setSelectedRows,
      setSort,
    })
  }

  //#endregion functions

  if (loading) return <LoaderSpinner />
  return (
    <div className="px-[20px] py-[30px]">
      <Controls
        collectionLength={data?.length}
        collectionName={'Vehicle List'}
        form={form}
        optionsLabel={'Status'}
        selectableOptions={[
          { name: 'All', value: 'all' },
          { name: 'Vip', value: 'vip' },
          { name: 'Normal', value: 'normal' },
        ]}
      />
      <Customers
        {...{
          data,
          refetch,
          order,
          setOrder,
          sort,
          setSort,
          setCreationModal,
          handleSelect,
          handleSelectAll,
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
        }}
      />
      {creationModal && (
        <CreationModal
          {...{
            setCreationModal,
            search,
            filter,
            sort,
            order,
            dbManager,
            refetch,
            selected,
            edit,
          }}
        />
      )}
      {detailsModal && (
        <PreviewModal {...{ dbManager, selected, setDetailsModal }} />
      )}
    </div>
  )
}
