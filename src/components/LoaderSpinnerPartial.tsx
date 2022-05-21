import React from 'react'
import Loader from 'react-loader-spinner'

export default function LoaderSpinnerPartial({ size = 100 }) {
  return (
    <div className="w-full h-full bg-white dark:bg-dark flex justify-center items-center flex-grow">
      {true && (
        //@ts-ignore
        <Loader color="#1565d8" height={size} width={size} type="Oval" />
      )}
    </div>
  )
}
