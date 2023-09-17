import DOMPurify from 'dompurify'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useParams } from 'react-router-dom'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig } from 'src/hooks'
import PATH from 'src/utils/path'
import { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FacebookShareButton from 'react-share/es/FacebookShareButton'

const Detail = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const queryConfig = useQueryConfig()
  const { slug } = useParams()
  const { data } = useQuery({
    queryKey: [slug],
    queryFn: () => filmApis.getFilm(slug as string),
    staleTime: 3 * 60 * 1000,
    enabled: slug !== ''
  })
  const dataFilm = data?.data.data
  if (!dataFilm) return null

  return (
    <>
      <Helmet>
        <title>{`VPhim | ${dataFilm?.seoOnPage.titleHead}`}</title>
        <meta name='description' content={`${dataFilm?.seoOnPage.descriptionHead} | Xem phim miễn phí tại VPhim`} />
      </Helmet>
      <div
        className='h-[600px] -mt-[56px] bg-cover bg-no-repeat bg-[50%_0] relative before:content-[""] before:absolute before:w-full before:top-0 before:bottom-0 before:bg-[#020d18bf]'
        style={{
          backgroundImage: `url('https://img.hiephanhthienha.com/uploads/movies/${dataFilm.item.poster_url}')`
        }}
      />
      <div className='container px-4 -mt-[360px] pt-3 relative z-10'>
        <div className='flex-col md:flex-row flex gap-11 md:gap-[64px]'>
          <div className='flex-shrink-0 flex flex-col items-center'>
            <img
              title={dataFilm.item.name}
              src={`https://img.hiephanhthienha.com/uploads/movies/${dataFilm.item.thumb_url}`}
              alt={dataFilm.item.name}
              className='w-[282px] h-[432px] object-cover'
              loading='eager'
            />
            {dataFilm.item.episode_current.toLowerCase() === 'trailer' ? (
              <button
                onClick={() => setOpenModal(true)}
                title={`Xem phim ${dataFilm.item.name}`}
                className='active:scale-90 flex items-center justify-center gap-3 text-white uppercase text-xl bg-red-700/80 hover:bg-red-700 w-full rounded p-[7px] mt-4'
              >
                <svg className='fill-white w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                  <path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
                </svg>
                xem trailer
              </button>
            ) : (
              <Link
                to={`${PATH.watch}/${dataFilm.item.slug}`}
                title={`Xem phim ${dataFilm.item.name}`}
                className='active:scale-90 flex items-center justify-center gap-3 text-white uppercase text-xl bg-red-700/80 hover:bg-red-700 w-full rounded p-[7px] mt-4'
              >
                <svg className='fill-white w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                  <path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
                </svg>
                xem phim
              </Link>
            )}
          </div>
          <div className='flex-1 pt-3'>
            <h1 title={dataFilm.item.origin_name} className='text-white text-5xl font-heading1 leading-[45px] mb-3'>
              {dataFilm.item.origin_name}
            </h1>
            <h2 title={dataFilm.item.name} className='text-[#b5b5b5] text-2xl break-all leading-[30px] mb-8'>
              {dataFilm.item.name} (<strong className='text-[#428bca]'>{dataFilm.item.year}</strong>)
            </h2>
            <span
              title={`Thời lượng phim ${dataFilm.item.time}`}
              className='inline-block cursor-help mb-8 md:mb-10 text-white text-lg'
            >
              {dataFilm.item.time ? dataFilm.item.time : 'Đang cập nhật'}
            </span>
            {dataFilm.item.episode_current.toLowerCase() === 'trailer' ? (
              <span
                title={`Cập nhật ${dataFilm.item.episode_current}`}
                className='text-white mb-8 md:mb-10 cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-yellow-400/80'
              >
                {dataFilm.item.episode_current}
              </span>
            ) : (
              <div className='flex gap-3 mb-8 md:mb-10'>
                <span
                  title={`Độ phân giải ${dataFilm.item.quality}`}
                  className='text-white cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-rose-600/80'
                >
                  {dataFilm.item.quality}
                </span>
                <span
                  title={`Cập nhật ${dataFilm.item.episode_current} - ${dataFilm.item.lang}`}
                  className='text-white cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-yellow-400/80'
                >
                  {dataFilm.item.episode_current} {dataFilm.item.lang}
                </span>
              </div>
            )}

            <div className='block lg:flex items-start justify-between gap-6'>
              <FacebookShareButton
                url={`https://vphim.vercel.app/${PATH.film}/${slug}`}
                className='flex-shrink-0 mb-6 md:mb-14'
              >
                <div
                  title='Chia sẻ phim miễn phí với Facebook'
                  className='text-white bg-[#485fc7] rounded px-4 py-2 flex-shrink-0 flex items-center justify-center gap-3'
                >
                  <svg className='fill-white w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                    <path d='M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z' />
                  </svg>
                  Chia sẻ
                </div>
              </FacebookShareButton>
              <div className='flex items-center flex-wrap gap-2 mt-[6px] mb-6'>
                {dataFilm.item.category.map((item) => (
                  <Link
                    title={`Thể loại ${item.name}`}
                    key={item.id}
                    to={{
                      pathname: `${PATH.list}/${PATH.new}`,
                      search: createSearchParams({
                        ...queryConfig,
                        category: item.slug
                      }).toString()
                    }}
                    className='border border-white py-[5px] px-[15px] text-white text-xs rounded-full hover:text-blue-600 hover:bg-white'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className='mb-6'>
              <p className='mb-1 text-[#7a7a7a] flex'>
                <span className='w-[120px] flex-shrink-0 inline-block uppercase'>Đạo diễn</span>
                <span className='text-white font-medium'>
                  {dataFilm.item.director[0] !== '' ? dataFilm.item.director.join(', ') : 'Đang cập nhật'}
                </span>
              </p>
              <p className='mb-1 text-[#7a7a7a] flex'>
                <span className='w-[120px] flex-shrink-0 inline-block uppercase'>Diễn viên</span>
                <span className='text-white font-medium break-all'>
                  {dataFilm.item.actor[0] !== '' ? dataFilm.item.actor.join(', ') : 'Đang cập nhật'}
                </span>
              </p>
              <p className='mb-1 text-white uppercase'>
                <span className='w-[120px] inline-block text-[#7a7a7a]'>Quốc gia</span>
                {dataFilm.item.country.map((item, index) =>
                  index > 0 ? (
                    <Fragment key={item.id}>
                      {', '}{' '}
                      <Link
                        title={`Tìm kiếm ${item.name}`}
                        to={{
                          pathname: `${PATH.list}/${PATH.new}`,
                          search: createSearchParams({
                            ...queryConfig,
                            country: item.slug
                          }).toString()
                        }}
                        className='font-medium capitalize hover:underline'
                      >
                        {item.name}
                      </Link>
                    </Fragment>
                  ) : (
                    <Link
                      title={`Tìm kiếm ${item.name}`}
                      key={item.id}
                      to={{
                        pathname: `${PATH.list}/${PATH.new}`,
                        search: createSearchParams({
                          ...queryConfig,
                          country: item.slug
                        }).toString()
                      }}
                      className='font-medium capitalize hover:underline'
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </p>
              <p className='mb-1 text-[#7a7a7a] uppercase'>
                <span className='w-[120px] inline-block'>Khởi chiếu</span>
                <Link
                  title={`Tìm kiếm ${dataFilm.item.year}`}
                  to={{
                    pathname: `${PATH.list}/${PATH.new}`,
                    search: createSearchParams({
                      ...queryConfig,
                      year: dataFilm.item.year.toString() as string
                    }).toString()
                  }}
                  className='text-white font-medium capitalize hover:underline'
                >
                  {dataFilm.item.year}
                </Link>
              </p>
            </div>
            <p
              className='text-[#b5b5b5]'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataFilm.item.content)
              }}
            />
            <h3 className='text-white uppercase font-semibold mt-7 mb-4'>Trailer</h3>
            <div className='flex items-center justify-start'>
              {dataFilm.item.trailer_url !== '' ? (
                <div
                  aria-hidden
                  onClick={() => setOpenModal(true)}
                  className='w-[222px] h-[125px] cursor-pointer hover:shadow-[0_0_0_2px_#cc7b19] relative group'
                >
                  <img
                    src={`https://img.youtube.com/vi/${
                      dataFilm.item.trailer_url.split('?v=')[dataFilm.item.trailer_url.split('?v=').length - 1]
                    }/mqdefault.jpg`}
                    alt={`Trailer ${dataFilm.item.name}`}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                  <svg
                    className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 fill-white w-8 h-9 invisible group-hover:visible'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z' />
                  </svg>
                </div>
              ) : (
                <span className='text-white/80'>Đang cập nhật</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <div
          aria-hidden
          onClick={() => setOpenModal(false)}
          className='fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-[rgba(10,10,10,.86)]'
        >
          <div className='w-[1000px] max-w-full relative overflow-hidden before:content-[""] before:block before:pt-[56.25%]'>
            {dataFilm.item.trailer_url !== '' ? (
              <iframe
                className='absolute inset-0 w-full h-full border-none'
                width='853'
                height='480'
                src={`https://www.youtube.com/embed/${
                  dataFilm.item.trailer_url.split('?v=')[dataFilm.item.trailer_url.split('?v=').length - 1]
                }?autoplay=1`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title={`Trailer ${dataFilm.item.name}`}
              />
            ) : (
              <div className='absolute inset-0 w-full h-full border-none bg-black flex items-center justify-center'>
                <span className='text-white text-2xl'>Trailer đang cập nhật</span>
              </div>
            )}
          </div>
          <button title='Đóng' onClick={() => setOpenModal(false)} className='text-white absolute top-[5%] right-[5%]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
export default Detail
