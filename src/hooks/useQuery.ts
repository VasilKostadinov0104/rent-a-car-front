import { RentACarApp } from '@appTypes/app'
import { DBManager } from '@utils/DBManager'
import React, { useEffect, useState } from 'react'

type useQueryOptions = { sort?: string; order?: string }
type useQueryReturnType<T> = {
  data: T[]
  loading: boolean
  error: any
  refetch(q?: string, sort?: string, order?: string, customField?: string): void
}

export default function useQuery<T>(
  collection: 'vehicles' | 'rents' | 'customers',
  { sort, order }: useQueryOptions
): useQueryReturnType<T> {
  const dbManager = new DBManager()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    dbManager
      .getMany(collection, sort ?? null, order ?? null)
      .then((res) => {
        setData(res)
        setError(null)
        setTimeout(() => setLoading(false), 200)
      })
      .catch((e) => setError(e))
  }, [])

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
    setLoading(true)
    dbManager
      .getMany(collection, q, sort, order, customField)
      .then((res) => {
        setError(null)
        setData(res)
        setTimeout(() => {
          setLoading(false)
        }, 200)
      })
      .catch((e) => setError(e))
  }

  return { data, loading, error, refetch }
}
