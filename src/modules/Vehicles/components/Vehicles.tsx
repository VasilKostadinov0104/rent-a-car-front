import TableHead from '@components/TableHead'
import React from 'react'
import { VehiclesTypes } from '../types'

const Vehicles = ({
  data,
  refetch,
  order,
  setOrder,
  sort,
  setSort,
  searchString,
}: VehiclesTypes.IVehicles): JSX.Element => {
  return (
    <div>
      <table className="w-full">
        <TableHead
          sort={sort}
          order={order}
          elements={[
            {
              name: '#',
              onClick: (e) => {
                refetch(null, 'id', order == 'desc' ? 'asc' : 'desc')
                setSort('#')
                setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
              },
            },
            {
              name: 'Brand',
              onClick: (e) => {
                refetch(null, 'brand', order == 'desc' ? 'asc' : 'desc')
                setSort('brand')
                setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
              },
            },
            {
              name: 'Model',
              onClick: (e) => {
                refetch(null, 'model', order == 'desc' ? 'asc' : 'desc')
                setSort('model')
                setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
              },
            },
            {
              name: 'Category',
              onClick: (e) => {
                refetch(null, 'category', order == 'desc' ? 'asc' : 'desc')
                setSort('category')
                setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
              },
            },
            {
              name: 'Fuel type',
              onClick: (e) => {
                refetch(null, 'fuelType', order == 'desc' ? 'asc' : 'desc')
                setSort('Fuel type')
                setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
              },
            },
            {
              name: 'Status',
              onClick: (e) => {
                refetch(null, 'rented', order == 'desc' ? 'asc' : 'desc')
                setSort('status')
                setOrder((ps) => (ps == 'desc' ? 'asc' : 'desc'))
              },
            },
          ]}
        />

        <tbody>
          {data?.map((vehicle) => {
            return (
              <tr>
                <td>{vehicle.id}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.category}</td>
                <td>{vehicle.fuelType}</td>
                <td>{vehicle.rented ? 'Rented' : 'Free'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Vehicles
