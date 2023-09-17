import { useParams } from 'react-router-dom'
import { Card, Filter } from 'src/components'
import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig, useScrollTop } from 'src/hooks'
import Pagination from 'src/components/Pagination'
import { Helmet } from 'react-helmet-async'

const List = () => {
  const { type } = useParams()
  const queryConfig = useQueryConfig()
  useScrollTop([queryConfig, type])

  const { data } = useQuery({
    queryKey: [type, queryConfig],
    queryFn: () => filmApis.getListFilm(type as string, queryConfig),
    enabled: type !== '',
    staleTime: 3 * 60 * 1000
  })
  const dataFilm = data?.data.data

  return (
    <>
      <Helmet>
        <title>{`VPhim | ${dataFilm?.seoOnPage.titleHead}`}</title>
        <meta name='description' content={`${dataFilm?.seoOnPage.descriptionHead}. Xem phim miễn phí tại VPhim`} />
      </Helmet>
      <div className='container px-4 mt-[45px]'>
        <Filter />
        {dataFilm && dataFilm.items.length > 0 && (
          <>
            <div className='mt-4'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
                {dataFilm.items.map((item) => (
                  <Card key={item._id} data={item} />
                ))}
              </div>
            </div>
            <div className='mt-4'>
              <Pagination
                queryConfig={queryConfig}
                page={dataFilm.params.pagination.currentPage}
                totalPage={Math.ceil(
                  dataFilm.params.pagination.totalItems / dataFilm.params.pagination.totalItemsPerPage
                )}
              />
            </div>
          </>
        )}
        {dataFilm && dataFilm.items.length <= 0 && (
          <p className='w-full h-[50vh] text-center text-xl text-white flex justify-center items-center'>
            Không tìm thấy phim với kết quả tìm kiếm.
          </p>
        )}
        {!dataFilm && (
          <div className='mt-4'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className='flex flex-col animate-pulse'>
                    <div className='h-[210px] sm:h-[384px] w-full mb-1 bg-slate-700' />
                    <div className='h-2 w-[80%] mt-1 rounded-full bg-slate-700' />
                    <div className='h-2 w-[60%] mt-2 rounded-full bg-slate-700' />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default List
