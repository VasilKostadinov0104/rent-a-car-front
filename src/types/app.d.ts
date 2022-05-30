export namespace RentACarApp {
  namespace StaticTypes {
    type VehicleCategory = 'economy' | 'estate' | 'luxury' | 'SUV' | 'cargo'
    type FuelType = 'petrol' | 'diesel' | 'hyprid' | 'electric' | 'LPG' | 'CNG'
    type SeatsNumber = 2 | 3 | 4 | 5 | 6 | 7 | 8
    type Collection = 'rents' | 'vehicles' | 'customers'
    type Input = Customer.CustomerInput | Rent.RentInput | Vehicle.VehicleInput
    type Output =
      | Vehicle.IVehicle
      | Customer.ICustomer
      | Rent.IRent
      | Vehicle.IVehicle[]
      | Customer.ICustomer[]
      | Rent.IRent[]
      | { id: null; error: string; code: number }
  }

  namespace Vehicle {
    interface IVehicle {
      id?: number
      category?: StaticTypes.VehicleCategory
      fuelType?: StaticTypes.FuelType
      brand?: string
      model?: string
      constructionYear?: number
      numberOfSeats?: StaticTypes.SeatsNumber
      image?: string
      rented?: boolean
      pricePerDay?: number
      /**has many rents */
      rents?: Array<number> & Array<Rent.IRent>
      createdAt?: Date
      updatedAt?: Date | null
      description?: string
    }

    type VehicleInput = {
      category?: StaticTypes.VehicleCategory
      fuelType?: StaticTypes.FuelType
      brand?: string
      model?: string
      constructionYear?: number
      numberOfSeats?: StaticTypes.SeatsNumber
      image?: string
      rented?: boolean
      pricePerDay?: number
      rents?: Array<number>
      createdAt?: Date
      updatedAt?: Date | null
    }
  }

  namespace Customer {
    interface ICustomer {
      id: number
      name: string
      email: string
      phone: string
      vip: boolean
      image?: string
      /**has many rents */
      rents: Array<number> & Array<Rent.IRent>
      createdAt: Date
      updatedAt: Date | null
    }

    type CustomerInput = {
      name?: string
      email?: string
      phone?: string
      vip?: boolean
      image?: string
      rents?: Array<number>
      createdAt?: Date
      updatedAt?: Date | null
    }
  }
  namespace Rent {
    interface IRent {
      id: number
      start: string
      end: string
      vehicle: number & Vehicle.IVehicle //id
      customer: number & Customer.ICustomer
      price: number
      createdAt: Date | string | null
      updatedAt: Date | null
    }

    type RentInput = {
      start: string
      end: string
      vehicle: number
      customer: number
      price: number
      createdAt?: Date
      updatedAt?: Date | null
    }
  }

  interface IDBManager {
    create(
      collection: StaticTypes.Collection,
      body: StaticTypes.Input
    ): Promise<StaticTypes.Output>
    update(
      id: number,
      collection: StaticTypes.Collection,
      body: StaticTypes.Input
    ): Promise<boolean>
    delete(id: number, collection: StaticTypes.Collection): Promise<boolean>
    getOne(
      id: number,
      collection: StaticTypes.Collection
    ): Promise<StaticTypes.Output>
    getMany(
      collection: StaticTypes.Collection,
      q?: string,
      sort?: string,
      order?: string,
      customField?: string
    ): Promise<Array<StaticTypes.Output>>
  }
}
