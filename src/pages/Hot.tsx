import { Card } from 'src/components'
import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig, useScrollTop } from 'src/hooks'
import { useState } from 'react'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'

const Hot = () => {
  const [type, setType] = useState<string>('phim-le')
  const queryConfig = useQueryConfig()
  const { data: dataHotPage1 } = useQuery({
    queryKey: [type, { ...queryConfig, page: '1', sort_field: 'view', year: '2023' }],
    queryFn: () => filmApis.getListFilm(type, { ...queryConfig, page: '1', sort_field: 'view', year: '2023' }),
    staleTime: 3 * 60 * 1000
  })
  const { data: dataHotPage2 } = useQuery({
    queryKey: [type, { ...queryConfig, page: '2', sort_field: 'view', year: '2023' }],
    queryFn: () => filmApis.getListFilm(type, { ...queryConfig, page: '2', sort_field: 'view', year: '2023' }),
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
      <div className='container mt-14'>
        <h2 className='text-4xl font-medium text-white text-center'>Top phim đang hot nhất</h2>
        <div className='bg-[#0e274073] pt-1 flex items-center justify-center mt-4 text-white text-lg'>
          <button
            title='Top phim lẻ đang hot nhất'
            onClick={() => setType('phim-le')}
            className={classNames('py-2 px-12 border-b', {
              'border-blue-600 text-blue-600': type === 'phim-le',
              'border-transparent': type !== 'phim-le'
            })}
          >
            Phim lẻ
          </button>
          <button
            title='Top phim bộ đang hot nhất'
            onClick={() => setType('phim-bo')}
            className={classNames('py-2 px-12 border-b', {
              'border-blue-600 text-blue-600': type === 'phim-bo',
              'border-transparent': type !== 'phim-bo'
            })}
          >
            Phim bộ
          </button>
          <button
            title='Top phim hoạt hình đang hot nhất'
            onClick={() => setType('hoat-hinh')}
            className={classNames('py-2 px-12 border-b', {
              'border-blue-600 text-blue-600': type === 'hoat-hinh',
              'border-transparent': type !== 'hoat-hinh'
            })}
          >
            Hoạt hình
          </button>
          <button
            title='Top tv shows đang hot nhất'
            onClick={() => setType('tv-shows')}
            className={classNames('py-2 px-12 border-b', {
              'border-blue-600 text-blue-600': type === 'tv-shows',
              'border-transparent': type !== 'tv-shows'
            })}
          >
            TV shows
          </button>
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
            {dataFilmHotPage1?.items.map((item) => <Card key={item._id} data={item} />)}
            {dataFilmHotPage2?.items.slice(0, 11).map((item) => <Card key={item._id} data={item} />)}
          </div>
        </div>
      </div>
    </>
  )
}
export default Hot
