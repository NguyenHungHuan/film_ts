import { Card } from 'src/components'
import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig, useScrollTop } from 'src/hooks'
import { useState } from 'react'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import PATH from 'src/utils/path'

const Hot = () => {
  const [type, setType] = useState<string>(PATH.odd)
  const queryConfig = useQueryConfig()
  const { data: dataHotPage1 } = useQuery({
    queryKey: [type, { ...queryConfig, page: '1', sort_field: 'view' }],
    queryFn: () => filmApis.getListFilm(type, { ...queryConfig, page: '1', sort_field: 'view' }),
    staleTime: 3 * 60 * 1000
  })
  const { data: dataHotPage2 } = useQuery({
    queryKey: [type, { ...queryConfig, page: '2', sort_field: 'view' }],
    queryFn: () => filmApis.getListFilm(type, { ...queryConfig, page: '2', sort_field: 'view' }),
    staleTime: 3 * 60 * 1000
  })
  const dataFilmHotPage1 = dataHotPage1?.data.data
  const dataFilmHotPage2 = dataHotPage2?.data.data

  useScrollTop([queryConfig, type])

  return (
    <>
      <Helmet>
        <title>VPhim | Phim hot nhất | Phim hot nhất hay tuyển chọn | Phim hot nhất mới nhất 2022</title>
        <meta
          name='description'
          content='Phim hot nhất mới nhất tuyển chọn chất lượng cao, Phim hot nhất mới nhất 2022 vietsub cập nhật nhanh nhất. Phim hot nhất vietsub nhanh nhất. Xem phim miễn phí tại VPhim'
        />
      </Helmet>
      <div className='container mt-14 px-4'>
        <h2 className='text-4xl font-medium text-white text-center'>Top phim hot nhất</h2>
        <div className='bg-[#0e274073] pt-1 grid grid-cols-2 md:grid-cols-4 items-center justify-center mt-4 text-white text-lg'>
          <button
            title='Top phim lẻ hot nhất'
            onClick={() => setType(PATH.odd)}
            className={classNames('py-2 px-12 border-b whitespace-nowrap', {
              'border-blue-600 text-blue-600': type === PATH.odd,
              'border-transparent': type !== PATH.odd
            })}
          >
            Phim lẻ
          </button>
          <button
            title='Top phim bộ hot nhất'
            onClick={() => setType(PATH.series)}
            className={classNames('py-2 px-12 border-b whitespace-nowrap', {
              'border-blue-600 text-blue-600': type === PATH.series,
              'border-transparent': type !== PATH.series
            })}
          >
            Phim bộ
          </button>
          <button
            title='Top phim hoạt hình hot nhất'
            onClick={() => setType(PATH.anime)}
            className={classNames('py-2 px-12 border-b whitespace-nowrap', {
              'border-blue-600 text-blue-600': type === PATH.anime,
              'border-transparent': type !== PATH.anime
            })}
          >
            Hoạt hình
          </button>
          <button
            title='Top tv shows hot nhất'
            onClick={() => setType(PATH.tvShows)}
            className={classNames('py-2 px-12 border-b whitespace-nowrap', {
              'border-blue-600 text-blue-600': type === PATH.tvShows,
              'border-transparent': type !== PATH.tvShows
            })}
          >
            TV shows
          </button>
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
            {dataFilmHotPage1 ? dataFilmHotPage1.items.map((item) => <Card key={item._id} data={item} />) : skeleton()}
            {dataFilmHotPage2
              ? dataFilmHotPage2.items.slice(0, 11).map((item) => <Card key={item._id} data={item} />)
              : skeleton()}
          </div>
        </div>
      </div>
    </>
  )
}
export default Hot

const skeleton = () => (
  <>
    {Array(10)
      .fill(0)
      .map((_, i) => (
        <div key={i} className='flex flex-col animate-pulse'>
          <div className='h-[210px] sm:h-[384px] w-full mb-1 bg-slate-700' />
          <div className='h-2 w-[80%] mt-1 rounded-full bg-slate-700' />
          <div className='h-2 w-[60%] mt-2 rounded-full bg-slate-700' />
        </div>
      ))}
  </>
)
