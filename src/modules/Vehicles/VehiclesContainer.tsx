import React, { useEffect, useState } from 'react'
import { VehiclesConstants } from './constants/index'
import { VehiclesServices } from './services/VehiclesServices'
import Vehicles from './components/Vehicles'
import { DBManager } from '@utils/DBManager'
import { VehiclesTypes } from './types'
import { RentACarApp } from '@appTypes/app'

export default function VehiclesContainer({}: VehiclesTypes.IVehiclesContainer): JSX.Element {
  const dbManager = new DBManager()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('#')
  const [order, setOrder] = useState('desc')
  const [searchString, setSearchString] = useState('')

  //fetch data
  useEffect(() => {
    dbManager.getMany('vehicles').then((res) => {
      console.table(res)
      setLoading(false)
      setData(res)
    })
  }, [])

  //refetch data
  async function refetch(q?: string, sort?: string, order?: string) {
    dbManager.getMany('vehicles', q, sort, order).then((res) => {
      console.table(res)
      setLoading(false)
      setData(res)
    })
  }

  if (loading) return <div>Loading...</div>
  return (
    <div className="px-[20px] py-[30px]">
      <div className="flex items-center justify-between">
        <h1>Vechicles List ({data?.length})</h1>
        <div className="border rounded-full overflow-hidden px-[10px] w-full max-w-[550px]">
          <input
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value)
              if (e.target.value && e.target.value != '') {
                refetch(e.target.value)
              }
            }}
            className="py-[10px] w-full outline-none"
            placeholder="search..."
          />
        </div>
        <select>
          <option value="free">Free</option>
          <option value="free">Rented</option>
        </select>
      </div>
      <Vehicles
        {...{ data, refetch, order, setOrder, sort, setSort, searchString }}
      />
    </div>
  )
}
