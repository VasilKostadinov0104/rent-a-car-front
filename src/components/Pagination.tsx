import {
  ApolloCache,
  ApolloError,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client'
import React, { SetStateAction } from 'react'
interface Props {
  collectionType: string
  controls: {
    page: number
    setPage: React.Dispatch<SetStateAction<number>>
    pageSize: number
    setPageSize: React.Dispatch<SetStateAction<number>>
    selected?: Array<number>
    setSelected?: React.Dispatch<SetStateAction<Array<number>>>
    filters?: any
    setFilters?: React.Dispatch<SetStateAction<any>>
    handleFilterChange?: (
      e,
      setFilters: React.Dispatch<SetStateAction<any>>
    ) => void

    mobile?: boolean
  }
  query: {
    data: any
    loading: boolean
    error: ApolloError
    refetch: (
      varaiables?: Partial<{
        page: number
        pageSize: number
        filters: {}
        sort?: string | []
      }>
    ) => Promise<ApolloQueryResult<any>>
  }
}

export default function Pagination({
  controls,
  query,
  collectionType,
}: Props): JSX.Element {
  if (
    query.data?.[`${collectionType}`]?.meta?.pagination?.total <=
    controls?.pageSize
  ) {
    return null
  }
  return (
    <div className="flex w-full col-span-12 justify-center mt-[30px] smp:!mt-[10px] text-[20px] smp:!text-[16px]">
      <button
        disabled={
          query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount == 1
        }
        onClick={() => controls.setPage(1)}
        className="mr-[5px] disabled:saturate-[0.3] disabled:pointer-events-none bg-[#1565d8] bg-opacity-20 group text-[#1565d8] hover:bg-opacity-100 hover:text-white transition-all font-bold px-[6px] rounded-[4px]"
      >
        <svg
          className="smp:!w-[20px] smp:!h-[20px] w-[26px] h-[26px] fill-[#1565d8] group-hover:fill-white "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z" />
        </svg>
      </button>
      <button
        disabled={controls.page - 1 <= 0}
        onClick={() =>
          controls.setPage(
            controls.page - 1 <= 0 ? controls.page : controls.page - 1
          )
        }
        className="mr-[5px] disabled:saturate-[0.3] disabled:pointer-events-none bg-[#1565d8] bg-opacity-20 group text-[#1565d8] hover:bg-opacity-100 hover:text-white transition-all font-bold px-[6px] rounded-[4px]"
      >
        <svg
          className="smp:!w-[20px] smp:!h-[20px] w-[26px] h-[26px] fill-[#1565d8] group-hover:fill-white "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
        </svg>
      </button>
      {Array.from({
        length: query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount,
      })
        ?.map((_, index) => index + 1)
        ?.slice(
          controls.page - 2 <= 0 ? 0 : controls.page - 2,
          controls.page + 2 >
            query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount
            ? query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount
            : controls.page + 2
        )
        .map((page) => (
          <button
            onClick={() => controls.setPage(page)}
            className={`mr-[5px] smp:!w-[25px] smp:!h-[25px] w-[30px] h-[30px] hover:bg-opacity-70 hover:text-white rounded-full  font-bold ${
              page == controls.page
                ? 'bg-[#1565d8] text-white'
                : 'bg-[#1565d8] bg-opacity-20 text-[#1565d8]'
            }`}
            key={page}
          >
            {page}
          </button>
        ))}
      <button
        disabled={
          controls.page + 1 >
          query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount
        }
        onClick={() =>
          controls.setPage(
            controls.page + 1 >
              query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount
              ? controls.page
              : controls.page + 1
          )
        }
        className="mr-[5px] disabled:saturate-[0.3] disabled:pointer-events-none bg-[#1565d8] bg-opacity-20 group text-[#1565d8] hover:bg-opacity-100 hover:text-white transition-all font-bold px-[6px] rounded-[4px]"
      >
        <svg
          className="smp:!w-[20px] smp:!h-[20px] w-[26px] h-[26px] fill-[#1565d8] group-hover:fill-white "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
        </svg>
      </button>
      <button
        disabled={
          query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount == 1
        }
        onClick={() =>
          controls.setPage(
            query?.data?.[`${collectionType}`]?.meta?.pagination?.pageCount
          )
        }
        className="disabled:saturate-[0.3] disabled:pointer-events-none bg-[#1565d8] bg-opacity-20 group text-[#1565d8] hover:bg-opacity-100 hover:text-white transition-all font-bold px-[6px] rounded-[4px]"
      >
        <svg
          className="smp:!w-[20px] smp:!h-[20px] w-[26px] h-[26px] fill-[#1565d8] group-hover:fill-white "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" />
        </svg>
      </button>
    </div>
  )
}
