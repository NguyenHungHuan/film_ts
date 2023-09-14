import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { paramOption } from 'src/hooks/useQueryConfig'

interface Props {
  totalPage: number
  page: number
  queryConfig: paramOption
}
const RANGE = 2
export default function Pagination({ page, totalPage, queryConfig }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='text-white px-1 flex items-end justify-end tracking-[0.3em]'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='text-white px-1 flex items-end justify-end tracking-[0.3em]'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < totalPage - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            title={`Trang ${pageNumber}`}
            to={{
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'flex items-center justify-center px-4 py-2 max-w-[46px] mx-1 rounded cursor-pointer shadow-sm border border-white/80 text-white/80 hover:border-white hover:text-white active:scale-90',
              {
                'bg-blue-600 text-white': pageNumber === page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex items-center justify-center lg:justify-between'>
      <div className='flex flex-wrap items-center md:justify-between gap-1 gap-y-2'>{renderPagination()}</div>
      <div className='items-center gap-2 hidden lg:flex'>
        {page === 1 ? (
          <span className='cursor-default rounded border border-gray-500 opacity-60 px-4 py-2 text-gray-300 shadow-sm flex items-center justify-center'>
            Trang trước
          </span>
        ) : (
          <Link
            title='Trang trước'
            to={{
              search: createSearchParams({
                ...queryConfig,
                page: (page - 1).toString()
              }).toString()
            }}
            className='flex items-center justify-center px-4 py-2 cursor-pointer rounded shadow-sm border border-white/80 text-white/80 hover:text-white hover:border-white active:scale-90'
          >
            Trang trước
          </Link>
        )}
        {page === totalPage ? (
          <span className='cursor-default rounded border border-gray-500 opacity-60 px-4 py-2 text-gray-300 shadow-sm flex items-center justify-center'>
            Trang sau
          </span>
        ) : (
          <Link
            title='Trang sau'
            to={{
              search: createSearchParams({
                ...queryConfig,
                page: (page + 1).toString()
              }).toString()
            }}
            className='flex items-center justify-center px-4 py-2 cursor-pointer rounded shadow-sm border border-white/80 text-white/80 hover:text-white hover:border-white active:scale-90'
          >
            Trang sau
          </Link>
        )}
      </div>
    </div>
  )
}
