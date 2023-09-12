import { Card } from 'src/components'
import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig } from 'src/hooks'
import Pagination from 'src/components/Pagination'
import { useNavigate, createSearchParams } from 'react-router-dom'
import PATH from 'src/utils/path'

const Search = () => {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['tim-kiem', { keyword: queryConfig.keyword, page: queryConfig.page }],
    queryFn: () => filmApis.getSearchFilm({ keyword: queryConfig.keyword, page: queryConfig.page }),
    staleTime: 3 * 60 * 1000
  })
  const dataSearch = data?.data.data

  return (
    <div className='container mt-14'>
      <input
        onChange={(e) =>
          navigate({
            pathname: PATH.search,
            search: createSearchParams({
              keyword: e.target.value.trim(),
              page: '1'
            }).toString()
          })
        }
        type='text'
        defaultValue=''
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        placeholder='Nhập tên phim...'
        className='w-full p-3 rounded-md text-xl outline-none'
      />
      {dataSearch && dataSearch.items.length > 0 && (
        <>
          <div className='mt-4'>
            <div className='grid grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
              {dataSearch.items.map((item) => (
                <Card key={item._id} data={item} />
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <Pagination
              queryConfig={{ keyword: queryConfig.keyword }}
              page={dataSearch.params.pagination.currentPage}
              totalPage={Math.ceil(
                dataSearch.params.pagination.totalItems / dataSearch.params.pagination.totalItemsPerPage
              )}
            />
          </div>
        </>
      )}
      {dataSearch && dataSearch.items.length <= 0 && (
        <p className='col-span-5 h-[50vh] text-xl text-white flex justify-center items-center'>
          Không tìm thấy phim với kết quả tìm kiếm.
        </p>
      )}
    </div>
  )
}

export default Search
