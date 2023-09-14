import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useParams } from 'react-router-dom'
import filmApis from 'src/apis/filmApis'
import { useQueryConfig } from 'src/hooks'
import PATH from 'src/utils/path'
import FacebookShareButton from 'react-share/es/FacebookShareButton'

const Film = () => {
  const queryConfig = useQueryConfig()
  const [nameServer, setNameServer] = useState<string>('')
  const [episode, setEpisode] = useState<string>('')
  const { slug } = useParams()
  const { data } = useQuery({
    queryKey: [slug],
    queryFn: () => filmApis.getFilm(slug as string),
    staleTime: 3 * 60 * 1000,
    enabled: slug !== ''
  })
  const dataFilm = data?.data.data

  useEffect(() => {
    if (dataFilm) {
      setNameServer(dataFilm.item.episodes[0].server_name)
    }
  }, [dataFilm])

  useEffect(() => {
    if (dataFilm && nameServer) {
      setEpisode(
        dataFilm.item.episodes.find((item) => item.server_name === nameServer)?.server_data[0].link_embed as string
      )
    }
  }, [dataFilm, nameServer])

  if (!dataFilm) return null

  return (
    <>
      <Helmet>
        <title>{`VPhim | ${dataFilm?.seoOnPage.titleHead}`}</title>
        <meta name='description' content={`${dataFilm?.seoOnPage.descriptionHead} | Xem phim miễn phí tại VPhim`} />
      </Helmet>
      <div>
        <div className='relative w-full h-[36vh] sm:h-[56vh] md:h-[66vh] lg:h-[76vh] xl:h-[86vh] bg-black'>
          <iframe
            className='w-full h-full'
            title={dataFilm.item.name}
            src={episode}
            frameBorder={0}
            loading='eager'
            allowFullScreen
          ></iframe>
        </div>
        <div className='mt-6 flex items-center justify-center gap-2'>
          {dataFilm.item.episodes.map((item) => (
            <button
              title={`Server ${item.server_name}`}
              onClick={() => setNameServer(item.server_name)}
              key={item.server_name}
              className={classNames('rounded px-2 py-1 flex items-center justify-center gap-1 font-medium', {
                'bg-white/40': item.server_name === nameServer,
                'bg-white': item.server_name !== nameServer
              })}
            >
              {item.server_name === nameServer && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={3}
                  stroke='currentColor'
                  className='w-4 h-4 stroke-green-500 -ml-1'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                </svg>
              )}
              {item.server_name}
            </button>
          ))}
        </div>
        <div className='container px-4 mt-6'>
          <div className='block md:flex items-center justify-between mb-10'>
            <div>
              <h1 title={dataFilm.item.origin_name} className='text-white text-5xl font-heading1 leading-[45px] mb-3'>
                {dataFilm.item.origin_name}
              </h1>
              <h2 title={dataFilm.item.name} className='text-[#b5b5b5] text-2xl break-all leading-[30px] mb-6'>
                {dataFilm.item.name} (
                <Link
                  title={`Tìm kiếm ${dataFilm.item.year}`}
                  to={{
                    pathname: `${PATH.list}/${PATH.new}`,
                    search: createSearchParams({
                      ...queryConfig,
                      year: dataFilm.item.year.toString()
                    }).toString()
                  }}
                  className='text-[#428bca] hover:underline'
                >
                  {dataFilm.item.year}
                </Link>
                )
              </h2>
              <FacebookShareButton url={`https://vphim.vercel.app/${PATH.film}/${slug}`}>
                <div
                  title='Chia sẻ phim miễn phí với Facebook'
                  className='text-white w-fit bg-[#485fc7] rounded-sm px-3 py-1 flex items-center justify-center gap-2'
                >
                  <svg className='fill-white w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                    <path d='M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z' />
                  </svg>
                  Chia sẻ
                </div>
              </FacebookShareButton>
            </div>
            <Link
              to={`${PATH.film}/${slug}`}
              className='flex items-center gap-2 text-[#428bca] hover:text-lime-400 pt-6 md:pt-0'
            >
              <svg className='w-7 h-7 fill-white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                <path d='M11.093 251.65l175.998 184C211.81 461.494 256 444.239 256 408v-87.84c154.425 1.812 219.063 16.728 181.19 151.091-8.341 29.518 25.447 52.232 49.68 34.51C520.16 481.421 576 426.17 576 331.19c0-171.087-154.548-201.035-320-203.02V40.016c0-36.27-44.216-53.466-68.91-27.65L11.093 196.35c-14.791 15.47-14.791 39.83 0 55.3zm23.127-33.18l176-184C215.149 29.31 224 32.738 224 40v120c157.114 0 320 11.18 320 171.19 0 74.4-40 122.17-76.02 148.51C519.313 297.707 395.396 288 224 288v120c0 7.26-8.847 10.69-13.78 5.53l-176-184a7.978 7.978 0 0 1 0-11.06z' />
              </svg>
              Về trang giới thiệu phim
            </Link>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-3 max-h-[250px] overflow-auto pr-2'>
            {dataFilm.item.episodes
              .find((item) => item.server_name === nameServer)
              ?.server_data.map((item, index) => (
                <button
                  title={`Tập ${item.name}`}
                  onClick={() => setEpisode(item.link_embed)}
                  disabled={item.link_embed === episode}
                  key={index}
                  className={classNames(
                    'flex-shrink-0 text-white whitespace-nowrap overflow-hidden text-lg h-[40px] px-4 rounded',
                    {
                      'bg-green-400': item.link_embed !== episode,
                      'bg-green-400/40': item.link_embed === episode
                    }
                  )}
                >
                  Tập {item.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Film
