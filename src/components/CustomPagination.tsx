export const CustomPagination = ({
  currentRefinement,
  nbPages,
  refine,
  createURL,
}: any) => {
  let arr = []
  for (let i = 0; i < nbPages; i++) {
    arr.push(i)
  }
  if (nbPages <= 1) {
    return null
  }
  return (
    <ul className="flex flex-row space-x-3">
      <li>
        <button
          id="prevPage"
          disabled={!(currentRefinement > 1)}
          className={`inter-m rounded-full   hover: Blue hover:text-white h-12 w-12 sm:h-8 sm:w-8 grid place-items-center ${
            currentRefinement > 1
              ? 'text-gray-300  Blue cursor-pointer'
              : 'opacity-50 disabled cursor-default'
          },`}
          onClick={(event) => {
            event.preventDefault()
            refine(currentRefinement - 1)
          }}
        >
          <div
            className={` rounded-full w-12 h-12 sm:h-8 sm:w-8 grid place-items-center  text-primaryBlue  LightBlue disabled:opacity-20 disabled:cursor-auto`}
          >
            {'<'}
          </div>
        </button>
      </li>
      {arr
        .slice(
          currentRefinement - 2 < 0 ? 0 : currentRefinement - 2,
          currentRefinement + 2 > nbPages ? nbPages : currentRefinement + 2
        )
        .map((arr, index) => {
          const page = arr + 1
          return (
            <li key={arr}>
              <a
                href={createURL(page)}
                className={`inter-m rounded-full   cursor-pointer hover: Blue hover:text-white h-12 w-12 sm:h-8 sm:w-8 grid place-items-center ${
                  currentRefinement == page
                    ? ' text-gray-300   Blue '
                    : ' text-footer '
                },`}
                onClick={(event) => {
                  event.preventDefault()
                  refine(page)
                }}
              >
                {page}
              </a>
            </li>
          )
        })}
      <li>
        <button
          id="nextPage"
          disabled={Math.ceil(nbPages - currentRefinement) < 1 || nbPages == 0}
          className={`inter-m rounded-full  hover: Blue hover:text-white h-12 w-12 sm:h-8 sm:w-8 grid place-items-center ${
            currentRefinement !== nbPages || nbPages !== 0
              ? 'text-gray-300  Blue  cursor-pointer'
              : 'opacity-50 disabled cursor-default'
          },`}
          onClick={(event) => {
            event.preventDefault()
            refine(currentRefinement + 1)
          }}
        >
          <div
            className={` rounded-full w-12 h-12 sm:h-8 sm:w-8 grid place-items-center  text-primaryBlue  LightBlue disabled:opacity-20 disabled:cursor-auto`}
          >
            {'>'}
          </div>
        </button>
      </li>
    </ul>
  )
}
