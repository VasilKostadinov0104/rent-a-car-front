/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-document-import-in-page */
import { useRouter } from 'next/router'
import SEOPRO from '../utils/SEO'

export default function Custom500() {
  const router = useRouter()
  const locale = router.locale
  return (
    <div className="flex-grow h-full min-h-[60vh] overflow-hidden flex flex-col justify-center items-center relative">
      <SEOPRO title="Internal server error" />
      <div className="absolute inset-0 flex justify-center items-center z-0 font-black text-primary opacity-10 text-[220px]">
        500
      </div>
      <div className="text-[18px] text-center font-semibold text-[#363636]">
        {locale == 'en'
          ? `Whoops! Something went wrong on page: ${router.asPath}. This page is probably still under development or does not exist at all.`
          : `Опа! Нещо се обърка на страница с линк: ${router.asPath}. Вероятно
        страницата все още се разработва или не съществува`}
      </div>
      <button onClick={() => router.back()} className="mt-[20px] z-10">
        Back
      </button>
    </div>
  )
}
