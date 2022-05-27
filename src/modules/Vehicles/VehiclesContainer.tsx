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

export default function VehiclesContainer({}: VehiclesTypes.IVehiclesContainer): JSX.Element {
  //database manager instance
  const dbManager = new DBManager()
  //form manager
  const form = useForm()
  const watch = useWatch({
    control: form.control,
    name: ['search', 'filter'],
  })
  //variables
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
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

  //#region useEffects

  //fetch data
  useEffect(() => {
    dbManager.getMany('vehicles', sort, order).then((res) => {
      setLoading(false)
      setData(res)
    })
    form.setValue('filter', 'all')
    form.setValue('filter_select', 'All')
    form.setValue('search', '')
  }, [])

  useEffect(() => {
    if (filter != 'all') {
      refetch(search, sort, order, `rented=${filter != 'free'}`)
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

  /**
   *
   * @param q query: search parameter
   * @param sort sort string, pass the field name
   * @param order asc or desc order
   * @param customField custom key=value pairs in string format
   */
  async function refetch(
    q?: string,
    sort?: string,
    order?: string,
    customField?: string
  ) {
    dbManager.getMany('vehicles', q, sort, order, customField).then((res) => {
      setData(res)
    })
  }
  //#region functions

  /**
   * Adds all entries to List
   */
  async function handleSelectAll() {
    const mainCheckbox =
      document.querySelector<HTMLInputElement>('#checkboxMain')
    const checkboxes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.checkbox')
    setSelectedRows([])
    checkboxes.forEach((checkbox) => {
      if (mainCheckbox.checked) {
        checkbox.checked = true

        setSelectedRows((ps) => [
          ...ps,
          Number(checkbox.id.replace('row-', '')),
        ])
      } else {
        checkbox.checked = false
        setSelectedRows([])
      }
    })
    console.log(selectedRows)
  }
  /**
   *
   * @param id id of entry
   * adds specific entry to List
   */
  function handleSelect(id) {
    const mainCheckbox =
      document.querySelector<HTMLInputElement>('#checkboxMain')
    mainCheckbox.checked = false
    const checkbox = document.querySelector<HTMLInputElement>(`#${id}`)

    if (checkbox?.checked) {
      setSelectedRows((ps) => [
        ...ps,
        Number(checkbox?.id?.replace('row-', '')),
      ])
      // setShowMassActions(true)
    } else {
      setSelectedRows((ps) =>
        ps.filter((r) => r == Number(checkbox?.id?.replace('row-', '')))
      )

      // setShowMassActions(false)
    }
    console.log(selectedRows)
  }

  /**
   * Deletes all the selected items
   */
  function massDelete() {
    console.log('called mass delete')
    setSelectedRows([])
    Array.from(selectedRows).forEach((id: number) => {
      console.log('delte ' + id)
      dbManager.delete(id, 'vehicles').then(() => {
        // refetch()
        setSort('id')
        setOrder('desc')
        refetch(null, 'id', 'desc')
      })
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
          { name: 'Free', value: 'free' },
          { name: 'Rented', value: 'rented' },
        ]}
      />
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
            <div className="flex w-full flex-nowrap ">
              <div className="w-full mr-[10px]">
                <img
                  src={selected.image}
                  className="w-full  object-contain object-top rounded-[16px]"
                />
                <p className="text-[14px] font-semibold uppercase opacity-50 mt-[10px]">
                  {selected.category}
                </p>
                <h3 className="text-[24px] ">
                  {selected.brand} {selected.model}{' '}
                  <span className="opacity-50">
                    ({selected.constructionYear})
                  </span>
                </h3>
              </div>
              <div className="w-full flex flex-col">
                <table className="TABLE">
                  <tbody className="INFO">
                    {Object.keys(selected).map((key) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{selected[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
