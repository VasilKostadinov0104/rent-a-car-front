import { RentACarApp } from '@appTypes/app'
import { DBManager } from './DBManager'

export async function cron(db: DBManager) {
  console.time('cron')

  const vehicles: RentACarApp.Vehicle.IVehicle[] = await db.getMany(
    'vehicles',
    null,
    null
  )

  await setTimeout(() => {
    vehicles.forEach(async (vehicle) => {
      let activeRents =
        vehicle.rents.filter((rent: RentACarApp.Rent.IRent) => {
          console.log(rent)

          console.log(new Date(), new Date(rent.end))
          return new Date() < new Date(rent.end)
        }) || []
      console.log(activeRents, vehicle.rents)

      if (vehicle.rented && activeRents.length == 0) {
        console.log('cron:updating', vehicle)

        db.update(vehicle.id, 'vehicles', {
          ...vehicle,
          rented: false,
          rents: [
            ...vehicle.rents.map((rent: RentACarApp.Rent.IRent) => rent.id),
          ],
        })
      }

      if (!vehicle.rented && activeRents.length > 0) {
        console.log('cron:updating', vehicle)
        db.update(vehicle.id, 'vehicles', {
          ...vehicle,
          rented: true,
          rents: [
            ...vehicle.rents.map((rent: RentACarApp.Rent.IRent) => rent.id),
          ],
        })
      }
    })
  }, 200)

  console.timeEnd('cron')
}
