import { RentACarApp } from '@appTypes/app'
import { DBManager } from './DBManager'

export async function cron(db: DBManager) {
  console.time('cron')

  const vehicles: RentACarApp.Vehicle.IVehicle[] = await db.getMany(
    'vehicles',
    null,
    null
  )

  const customers: RentACarApp.Customer.ICustomer[] = await db.getMany(
    'customers',
    null,
    null,
    null,
    null,
    false
  )

  await setTimeout(() => {
    //update rented status
    vehicles.forEach(async (vehicle) => {
      let activeRents =
        vehicle.rents.filter((rent: RentACarApp.Rent.IRent) => {
          return new Date() < new Date(rent.end)
        }) || []

      if (vehicle.rented && activeRents.length == 0) {
        db.update(vehicle.id, 'vehicles', {
          ...vehicle,
          rented: false,
          rents: [
            ...vehicle.rents.map((rent: RentACarApp.Rent.IRent) => rent.id),
          ],
        })
      }

      if (!vehicle.rented && activeRents.length > 0) {
        db.update(vehicle.id, 'vehicles', {
          ...vehicle,
          rented: true,
          rents: [
            ...vehicle.rents.map((rent: RentACarApp.Rent.IRent) => rent.id),
          ],
        })
      }
    })
    //update vip status
    customers.forEach(async (customer) => {
      if (customer.rents.length >= 3) {
        let br = 0
        //@ts-ignore
        customer.rents.forEach(async (_rent) => {
          const rent = await db.getOne(_rent, 'rents', false)

          let check = new Date()
          check.setDate(check.getDate() - 60)
          if (new Date(rent.createdAt).getTime() > check.getTime()) {
            db.update(customer.id, 'customers', { vip: true })
          } else {
            db.update(customer.id, 'customers', { vip: false })
          }
        })
      }
    })
  }, 200)

  console.timeEnd('cron')
}
