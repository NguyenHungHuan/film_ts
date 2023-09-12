import { Card, Filter } from 'src/components'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig } from 'src/hooks'
import PATH from 'src/utils/path'

const Home = () => {
  const queryConfig = useQueryConfig()
  const { data: dataSeries } = useQuery({
    queryKey: ['phim-bo-recommend'],
    queryFn: () => filmApis.getListFilm('phim-bo', { sort_field: 'view', year: '2023' }),
    staleTime: 3 * 60 * 1000
  })
  const { data: dataOdd } = useQuery({
    queryKey: ['phim-le-recommend'],
    queryFn: () => filmApis.getListFilm('phim-le', { sort_field: 'view', year: '2023' }),
    staleTime: 3 * 60 * 1000
  })
  const { data: dataSeriesNew } = useQuery({
    queryKey: ['phim-bo', queryConfig],
    queryFn: () => filmApis.getListFilm('phim-bo', queryConfig),
    staleTime: 3 * 60 * 1000
  })
  const { data: dataOddNew } = useQuery({
    queryKey: ['phim-le', queryConfig],
    queryFn: () => filmApis.getListFilm('phim-le', queryConfig),
    staleTime: 3 * 60 * 1000
  })

  const dataFilmSeries = dataSeries?.data.data
  const dataFilmOdd = dataOdd?.data.data
  const dataFilmSeriesNew = dataSeriesNew?.data.data
  const dataFilmOddNew = dataOddNew?.data.data

  return (
    <div className='container mt-[45px]'>
      <Filter />
      <div className='mt-4'>
        {title({ title: 'Phim đề cử', isHiddenArrow: true })}
        <div className='grid grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
          <>
            {dataFilmSeries?.items
              .slice(0, 5)
              .map((item) => (
                <Card key={item._id} thumb_url={item.thumb_url} name={item.name} origin_name={item.origin_name} />
              ))}
            {dataFilmOdd?.items
              .slice(0, 5)
              .map((item) => (
                <Card key={item._id} thumb_url={item.thumb_url} name={item.name} origin_name={item.origin_name} />
              ))}
          </>
        </div>
      </div>
      <div className='mt-8'>
        {title({ title: 'Phim lẻ mới cập nhật', link: `${PATH.odd}` })}
        <div className='grid grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
          {dataFilmOddNew?.items
            .slice(0, 10)
            .map((item) => (
              <Card key={item._id} thumb_url={item.thumb_url} name={item.name} origin_name={item.origin_name} />
            ))}
        </div>
      </div>
      <div className='mt-8'>
        {title({ title: 'Phim bộ mới cập nhật', link: `${PATH.series}` })}
        <div className='grid grid-cols-5 gap-x-4 gap-y-[22px] py-3'>
          {dataFilmSeriesNew?.items
            .slice(0, 10)
            .map((item) => (
              <Card key={item._id} thumb_url={item.thumb_url} name={item.name} origin_name={item.origin_name} />
            ))}
        </div>
      </div>
    </div>
  )
}
export default Home

const title = ({
  title,
  isHiddenArrow = false,
  link = ''
}: {
  title: string
  isHiddenArrow?: boolean
  link?: string
}) => {
  return (
    <div className='flex justify-between items-end pb-1 border-b border-[#1b3c5d]'>
      <h2 className='uppercase text-[#b1a21e] text-2xl font-display font-medium'>
        <span>{title}</span>
      </h2>
      {!isHiddenArrow && (
        <Link
          to={{
            pathname: `${PATH.list}${link}`,
            search: createSearchParams({
              page: '1',
              sort_field: '',
              category: '',
              country: '',
              year: ''
            }).toString()
          }}
          className='text-white/80 hover:text-white text-lg p-1'
        >
          Xem tất cả
          <svg
            className='ml-1 w-2 h-[17px] fill-current inline'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 192 512'
          >
            <path d='M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z' />
          </svg>
        </Link>
      )}
    </div>
  )
}
