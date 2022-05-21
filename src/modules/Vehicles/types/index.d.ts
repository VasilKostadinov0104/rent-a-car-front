import { RentACarApp } from '@appTypes/app'

namespace VehiclesTypes {
  interface IVehicles {
    data: RentACarApp.Vehicle.IVehicle[]
    refetch(q?: string, sort?: string, order?: string): void
    order: string
    setOrder: React.Dispatch<SetStateAction<string>>
    sort: string
    setSort: React.Dispatch<SetStateAction<string>>
    searchString: string
  }
  interface IVehiclesContainer {}
}
