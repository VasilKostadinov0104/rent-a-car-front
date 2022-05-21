/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-document-import-in-page */
import router from 'next/router'
import SEOPRO from '../utils/SEO'

export default function Custom404() {
  return (
    <div className="flex-grow min-h-[60vh] overflow-hidden h-full flex flex-col justify-center items-center relative">
      <SEOPRO title="Page not found" />
      <div className="absolute inset-0 flex justify-center items-center z-0 font-black text-primary opacity-10 text-[220px]">
        404
      </div>
      <div className="text-[18px] text-center font-semibold text-[#363636] z-10">
        Whoops! We cannot find this page.
        <br /> This page is either under development ot does not exist at all.
      </div>
      <button onClick={() => router.back()} className="mt-[20px] z-10">
        Back
      </button>
    </div>
  )
}
