import { useParams } from 'react-router-dom'
import { Card, Filter } from 'src/components'
import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig, useScrollTop } from 'src/hooks'
import Pagination from 'src/components/Pagination'

const List = () => {
  const { type } = useParams()
  const queryConfig = useQueryConfig()

  const { data, isError } = useQuery({
    queryKey: [type, queryConfig],
    queryFn: () => filmApis.getListFilm(type as string, queryConfig),
    enabled: type !== '',
    staleTime: 3 * 60 * 1000
  })

  const dataFilm = data?.data.data

  useScrollTop([queryConfig, type])

  return (
    <div className='container mt-[45px]'>
      <Filter />
      {dataFilm && dataFilm.items.length > 0 && (
        <>
          <div className='mt-4'>
            <div className='grid grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
              {dataFilm.items.map((item) => (
                <Card key={item._id} thumb_url={item.thumb_url} name={item.name} origin_name={item.origin_name} />
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
        <p className='col-span-5 h-[50vh] text-xl text-white flex justify-center items-center'>
          Không tìm thấy phim với kết quả tìm kiếm.
        </p>
      )}
    </div>
  )
}

export default List
