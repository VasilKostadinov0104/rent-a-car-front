import React, { useEffect, useState } from 'react'

import Rents from './components/Rents'
import { DBManager } from '@utils/DBManager'
import { RentsTypes } from './types'
import { RentACarApp } from '@appTypes/app'
import { useForm, useWatch } from 'react-hook-form'

import LoaderSpinner from '@components/LoaderSpinner'
import Controls from '@components/Controls'
import Modal from '@components/Modal'
import CreationModal from './components/CreationModal'
import { tableServices } from '@utils/tableServices'
import useQuery from '@hooks/useQuery'

export default function RentsContainer({}: RentsTypes.IRentsContainer): JSX.Element {
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
  const [selected, setSelected] = useState<RentACarApp.Rent.IRent>(null)
  const [showMassActions, setShowMassActions] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  //query parameters
  const search = watch[0]
  const filter = watch[1]
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, loading, error, refetch } = useQuery<RentACarApp.Rent.IRent>(
    'rents',
    { order, sort }
  )

  //#region useEffects

  //fetch data
  useEffect(() => {
    form.setValue('filter', '-')
    form.setValue('filter_select', 'No filters')
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
    tableServices.massDelete('rents', {
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
        selectableOptions={[{ name: 'No filter', value: '' }]}
        graydOut
        disabled
      />
      <Rents
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
        <Modal setOpen={setDetailsModal} width={'80vw'}>
          <div className="flex flex-col w-full h-full">
            <div className="flex w-full flex-nowrap ">{selected.id}</div>
          </div>
        </Modal>
      )}
    </div>
  )
}

const RentPreview = ({
  dbManager,
  rent,
}: {
  dbManager: DBManager
  rent: RentACarApp.Rent.IRent
}) => {
  const [vehicle, setVehicle] = useState<RentACarApp.Vehicle.IVehicle>(null)
  useEffect(() => {
    dbManager.getOne(rent.customer, 'vehicles').then((res) => setVehicle(res))
  }, [])
  if (rent.id) {
    return (
      <tr>
        <td>{rent.id}</td>
        <td>{vehicle ? vehicle.brand + ' ' + vehicle.model : '-'}</td>
        <td>{`${new Date(rent.start).toLocaleDateString('en-GB')} - ${new Date(
          rent.end
        ).toLocaleDateString('en-GB')}`}</td>
        <td>{new Date() > new Date(rent.end) ? 'Completed' : 'ACTIVE'}</td>
      </tr>
    )
  }
}
