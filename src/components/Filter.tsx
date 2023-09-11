import { useQuery } from 'react-query'
import filmApis from 'src/apis/filmApis'

const Filter = () => {
  const { data: dataGenre } = useQuery({
    queryKey: ['the-loai'],
    queryFn: filmApis.getGenres
  })
  const { data: dataCountry } = useQuery({
    queryKey: ['quoc-gia'],
    queryFn: filmApis.getCountry
  })
  const dataGenres = dataGenre?.data.data.items
  const dataCountries = dataCountry?.data.data.items

  return (
    <div className='bg-[#0e274073] py-4 px-[22px] grid grid-cols-5 items-center gap-[22px] rounded-md'>
      <div className='text-lg flex flex-col'>
        <label htmlFor='typeFilm' className='mb-2 text-white'>
          Loại phim:
        </label>
        <div className='relative w-full before:content-[""] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]'>
          <select
            name='type of film'
            id='typeFilm'
            className='appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
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
            name='genre of film'
            id='genreFilm'
            className='appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
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
            name='country of film'
            id='countryFilm'
            className='appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
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
            name='year of film'
            id='yearFilm'
            className='appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
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
            name='sort film'
            id='sortFilm'
            className='appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]'
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
