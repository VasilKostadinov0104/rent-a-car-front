import React from 'react'
import Loader from 'react-loader-spinner'

export default function LoaderSpinner() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark flex justify-center items-center flex-grow">
      {true && (
        //@ts-ignore
        <Loader color="#1565d8" height={100} width={100} type="Oval" />
      )}
    </div>
  )
}
