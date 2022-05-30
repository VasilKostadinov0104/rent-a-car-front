import { RentACarApp } from '@appTypes/app'
import fs from 'fs'

let uri = 'http://localhost:3001'
const headers = { 'Content-Type': 'application/json' }

export class DBManager implements RentACarApp.IDBManager {
  async create(
    collection: RentACarApp.StaticTypes.Collection,
    body: RentACarApp.StaticTypes.Input
  ): Promise<RentACarApp.StaticTypes.Output> {
    const response = await fetch(`${uri}/${collection}`, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        createdAt: new Date().toISOString(),
      }),
      headers,
    })
    const post: RentACarApp.StaticTypes.Output = await response.json()

    if (post == null)
      return {
        id: null,
        error: 'Create failed',
        code: 500,
      }

    return post
  }
  async update(
    id: number,
    collection: RentACarApp.StaticTypes.Collection,
    body: RentACarApp.StaticTypes.Input
  ) {
    const post = await this.getOne(id, collection, false)
    const response = await fetch(`${uri}/${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...post,
        ...body,
        updatedAt: new Date().toISOString(),
      }),
      headers,
    })

    const update = response.json()

    return update
  }
  async delete(
    id: number,
    collection: RentACarApp.StaticTypes.Collection,
    cascade: boolean = true
  ): Promise<boolean> {
    const post = await this.getOne(id, collection, false)
    const response = await fetch(`${uri}/${collection}/${id}`, {
      method: 'DELETE',

      headers,
    }).then((res) => {
      res.json()
      if (res.ok && cascade) {
        //if deleteing rent
        if (post.customer) {
          this.getOne(post.customer, 'customers', false).then(
            (res: RentACarApp.Customer.ICustomer) => {
              this.update(post.customer, 'customers', {
                rents: res.rents.filter((a) => a != post.customer),
              })
            }
          )
        }
        if (post.vehicle) {
          this.getOne(post.vehicle, 'vehicles', false).then(
            (res: RentACarApp.Vehicle.IVehicle) => {
              this.update(post.vehicle, 'vehicles', {
                rents: res.rents.filter((a) => a != post.vehicle),
              })
            }
          )
        }
        //if vehicle or customer
        if (post.rents && post.rents.length > 0) {
          post.rents.forEach(async (rent) => {
            const post = await this.getOne(rent, 'rents', false)
            if (post.customer) {
              const customer = await this.getOne(post.customer, 'customers')
              await this.update(customer.id, 'customers', {
                rents: customer.rents.filter((c) => c != rent),
              })
            }
            if (post.vehicle) {
              const vehicle = await this.getOne(post.vehicle, 'vehicles')
              await this.update(vehicle.id, 'customers', {
                rents: vehicle.rents.filter((c) => c != rent),
              })
            }
            this.delete(rent, 'rents', false)
          })
        }
      }
    })

    return true
  }
  async getOne(
    id: number,
    collection: RentACarApp.StaticTypes.Collection,
    withRelations: boolean = true
  ) {
    let query = `${uri}/${collection}/${id}`
    const response = await fetch(query, { method: 'GET', headers })
    if (!response.ok) {
      return
    }
    let data = await response.json()
    // if (data?.vehicle) {
    //   data.vehicle = await this.getOne(data.vehicle, 'vehicles')
    // }
    // if (data?.customer) {
    //   data.customer = await this.getOne(data.customer, 'customers')
    // }
    if (withRelations) {
      if (data?.vehicle) {
        data.vehicle = await this.getOne(data.vehicle, 'vehicles', false)
      }
      if (data?.customer) {
        data.customer = await this.getOne(data.customer, 'customers', false)
      }
      if (data?.rents) {
        let rents = []
        data?.rents?.forEach(async (id) => {
          let rent = await this.getOne(id, 'rents')
          rents.push(rent)
        })
        data.rents = rents.sort((a, b) => b.id - a.id)
      }
      if (data?.customers) {
        let customers = []
        data?.customers?.forEach(async (id) => {
          let customer = await this.getOne(id, 'rents')
          customers.push(customer)
        })
        data.customers = customers.sort((a, b) => b.id - a.id)
      }
      if (data?.vehicles) {
        let vehicles = []
        data?.vehicles?.forEach(async (id) => {
          let vehicle = await this.getOne(id, 'rents')
          vehicles.push(vehicle)
        })
        data.vehicles = vehicles.sort((a, b) => b.id - a.id)
      }
    }
    return data
  }
  async getMany(
    collection: RentACarApp.StaticTypes.Collection,
    q?: string,
    sort?: string,
    order?: string,
    customField?: string,
    withRelations: boolean = true
  ) {
    let query = `${uri}/${collection}`
    if (q || sort || order) {
      query += '?'
      let args = []
      if (q) {
        args.push(`q=${q}`)
      }
      if (sort) {
        args.push(`_sort=${sort}`)
      }
      if (order) {
        args.push(`_order=${order}`)
      }
      if (customField) {
        args.push(customField)
      }

      query += args.join(`&`)
    }
    const response = await fetch(query, { method: 'GET', headers })
    if (!response.ok) {
      return
    }
    let data = await response.json()
    if (withRelations) {
      data?.map(async (entry) => {
        let a = entry
        if (a?.vehicle) {
          a.vehicle = await this.getOne(a.vehicle, 'vehicles', false)
        }
        if (a?.customer) {
          a.customer = await this.getOne(a.customer, 'customers', false)
        }
        if (a?.rents) {
          let rents = []
          a?.rents?.forEach(async (id) => {
            try {
              let rent = await this.getOne(id, 'rents')
              rents.push(rent)
            } catch (e) {
              //
            }
          })
          a.rents = rents.sort((a, b) => b.id - a.id)
        }
        if (a?.customers) {
          let customers = []
          a?.customers?.forEach(async (id) => {
            try {
              let customer = await this.getOne(id, 'rents')
              customers.push(customer)
            } catch {
              //
            }
          })
          a.customers = customers.sort((a, b) => b.id - a.id)
        }
        if (data?.vehicles) {
          let vehicles = []
          a?.vehicles?.forEach(async (id) => {
            try {
              let vehicle = await this.getOne(id, 'rents')
              vehicles.push(vehicle)
            } catch {}
          })
          a.vehicles = vehicles.sort((a, b) => b.id - a.id)
        }
        return a
      })
    }
    return data
  }
}
