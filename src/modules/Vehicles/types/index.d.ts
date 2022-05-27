import { RentACarApp } from '@appTypes/app'
import { DBManager } from '@utils/DBManager'
import { FieldValues, UseFormReturn } from 'react-hook-form'

namespace VehiclesTypes {
  interface IVehicles {
    data: RentACarApp.Vehicle.IVehicle[]
    refetch(q?: string, sort?: string, order?: string): void
    order: string
    setOrder: React.Dispatch<SetStateAction<string>>
    sort: string
    setSort: React.Dispatch<SetStateAction<string>>
    setCreationModal: React.Dispatch<SetStateAction<boolean>>
    handleSelectAll(): void
    handleSelect(id): void
    page: number
    setPage: React.Dispatch<SetStateAction<number>>
    pageSize: number
    setPageSize: React.Dispatch<SetStateAction<number>>
    setSelected: React.Dispatch<SetStateAction<RentACarApp.Vehicle.IVehicle>>
    setDetailsModal: React.Dispatch<SetStateAction<boolean>>
    setEdit: React.Dispatch<SetStateAction<boolean>>
    dbManager: DBManager
    massDelete(): void
    showMassActions: boolean
  }
  interface IVehiclesContainer {}
  interface ICreationModal {
    setCreationModal: React.Dispatch<SetStateAction<boolean>>
    edit: boolean
    search: string
    filter: string
    sort: string
    order: string
    dbManager: DBManager
    refetch(q?: string, sort?: string, order?: string): void
    selected: RentACarApp.Vehicle.IVehicle
  }
}
