import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'
import { useParams, useNavigate, createSearchParams } from 'react-router-dom'
import PATH from 'src/utils/path'
import { useQueryConfig } from 'src/hooks'

const Filter = () => {
  const { type } = useParams()
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { data: dataGenre } = useQuery({
    queryKey: ['the-loai'],
    queryFn: filmApis.getGenres,
    staleTime: 3 * 60 * 1000
  })
  const { data: dataCountry } = useQuery({
    queryKey: ['quoc-gia'],
    queryFn: filmApis.getCountry,
    staleTime: 3 * 60 * 1000
  })
  const dataGenres = dataGenre?.data.data.items
  const dataCountries = dataCountry?.data.data.items

  const handleChangeType = (value: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: `${PATH.list}/${value.target.value}`,
      search: createSearchParams({
        ...queryConfig,
        page: '1'
      }).toString()
    })
  }

  const handleChangeCategory = (value: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: `${PATH.list}/${type ? type : 'phim-moi'}`,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        category: value.target.value
      }).toString()
    })
  }

  const handleChangeCountry = (value: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: `${PATH.list}/${type ? type : 'phim-moi'}`,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        country: value.target.value
      }).toString()
    })
  }

  const handleChangeYear = (value: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: `${PATH.list}/${type ? type : 'phim-moi'}`,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        year: value.target.value
      }).toString()
    })
  }

  const handleChangeSort = (value: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: `${PATH.list}/${type ? type : 'phim-moi'}`,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        sort_field: value.target.value
      }).toString()
    })
  }

  return (
    <div className='bg-[#0e274073] py-4 px-[22px] grid grid-cols-2 md:grid-cols-5 items-center gap-[22px] rounded-md'>
      <div className='text-lg flex flex-col'>
        <label htmlFor='typeFilm' className='mb-2 text-white'>
          Loại phim:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeType(value)}
            name='type of film'
            id='typeFilm'
            className='cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
            value={type}
          >
            <option value='phim-moi'>- Tất cả -</option>
            <option value='phim-le'>Phim lẻ</option>
            <option value='phim-bo'>Phim bộ</option>
            <option value='hoat-hinh'>Hoạt hình</option>
            <option value='tv-shows'>TV shows</option>
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='genreFilm' className='mb-2 text-white'>
          Thể loại:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeCategory(value)}
            name='genre of film'
            id='genreFilm'
            className='cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
            value={queryConfig.category}
          >
            <option value=''>- Tất cả -</option>
            {dataGenres &&
              dataGenres.map((item) => (
                <option key={item._id} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='countryFilm' className='mb-2 text-white'>
          Quốc gia:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeCountry(value)}
            value={queryConfig.country}
            name='country of film'
            id='countryFilm'
            className='cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
          >
            <option value=''>- Tất cả -</option>
            {dataCountries &&
              dataCountries.map((item) => (
                <option key={item._id} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='yearFilm' className='mb-2 text-white'>
          Năm:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeYear(value)}
            value={queryConfig.year}
            name='year of film'
            id='yearFilm'
            className='cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
          >
            <option value=''>- Tất cả -</option>
            {Array(14)
              .fill(0)
              .map((_, i) => (
                <option key={i} value={2023 - i}>
                  {2023 - i}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='text-lg flex flex-col'>
        <label htmlFor='sortFilm' className='mb-2 text-white'>
          Sắp xếp:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            onChange={(value) => handleChangeSort(value)}
            value={queryConfig.sort_field}
            name='sort film'
            id='sortFilm'
            className='cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
          >
            <option value='modified.time'>Ngày cập nhật</option>
            <option value='year'>Ngày phát hành</option>
            <option value='view'>Lượt xem</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filter
