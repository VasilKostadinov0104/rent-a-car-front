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

    if (post) return post
  }
  async update(
    id: number,
    collection: RentACarApp.StaticTypes.Collection,
    body: RentACarApp.StaticTypes.Input
  ): Promise<boolean> {
    const response = await fetch(`${uri}/${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...body, updatedAt: new Date().toISOString() }),
      headers,
    })

    const update = response.json()

    return true
  }
  async delete(
    id: number,
    collection: RentACarApp.StaticTypes.Collection
  ): Promise<boolean> {
    const response = await fetch(`${uri}/${collection}/${id}`, {
      method: 'DELETE',

      headers,
    })

    const update = response.json()

    return true
  }
  async getOne(id: number, collection: RentACarApp.StaticTypes.Collection) {
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

    return data
  }
  async getMany(
    collection: RentACarApp.StaticTypes.Collection,
    q?: string,
    sort?: string,
    order?: string,
    customField?: string
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
    data?.map(async (entry) => {
      let a = entry
      if (a?.vehicle) {
        a.vehicle = await this.getOne(a.vehicle, 'vehicles')
      }
      if (a?.customer) {
        a.customer = await this.getOne(a.customer, 'customers')
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
    return data
  }
}
