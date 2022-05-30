import React, { useEffect, useState } from 'react'
import { VehiclesConstants } from './constants/index'
import { VehiclesServices } from './services/VehiclesServices'
import Vehicles from './components/Vehicles'
import { DBManager } from '@utils/DBManager'
import { VehiclesTypes } from './types'
import { RentACarApp } from '@appTypes/app'
import { useForm, useWatch } from 'react-hook-form'
import Input from '@components/Input'
import {
  faCaretDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import LoaderSpinner from '@components/LoaderSpinner'
import Controls from '@components/Controls'
import Modal from '@components/Modal'
import CreationModal from './components/CreationModal'
import vehicles from 'pages/vehicles'
import useQuery from '@hooks/useQuery'
import LoaderSpinnerPartial from '@components/LoaderSpinnerPartial'
import PreviewModal from './components/PreviewModal'
import { tableServices } from '@utils/tableServices'

export default function VehiclesContainer({}: VehiclesTypes.IVehiclesContainer): JSX.Element {
  //!database manager instance
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
  const [selected, setSelected] = useState<RentACarApp.Vehicle.IVehicle>(null)
  const [showMassActions, setShowMassActions] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  //query parameters
  const search = watch[0]
  const filter = watch[1]
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  //query
  const { data, loading, error, refetch } =
    useQuery<RentACarApp.Vehicle.IVehicle>('vehicles', {
      sort,
      order,
    })

  //#region useEffects

  //!setting default form values
  useEffect(() => {
    form.setValue('filter', 'all')
    form.setValue('filter_select', 'All')
    form.setValue('search', '')
  }, [])

  //!refething data after search
  useEffect(() => {
    if (filter != 'all') {
      refetch(search, sort, order, `rented=${filter != 'free'}`)
    } else if (filter == 'all') {
      refetch(search, sort, order)
    }
  }, [watch, sort, order])

  //!showing buttons for mass actions
  useEffect(() => {
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
    tableServices.massDelete('vehicles', {
      dbManager,
      refetch,
      selectedRows,
      setOrder,
      setSelectedRows,
      setSort,
    })
  }

  //#endregion functions

  return (
    <div className="px-[20px] py-[30px]">
      <Controls
        collectionLength={data?.length}
        collectionName={'Vehicle List'}
        form={form}
        optionsLabel={'Status'}
        selectableOptions={[
          { name: 'All', value: 'all' },
          { name: 'Free', value: 'free' },
          { name: 'Rented', value: 'rented' },
        ]}
      />
      {loading ? (
        <LoaderSpinnerPartial />
      ) : (
        <Vehicles
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
      )}
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
