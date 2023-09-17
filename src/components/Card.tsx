import { Link } from 'react-router-dom'
import { items } from 'src/types'
import PATH from 'src/utils/path'

const Card = ({ data }: { data?: items }) => {
  return (
    <>
      {data ? (
        <Link to={`${PATH.film}/${data.slug}`} className='relative' title={data.name}>
          <img
            title={data.name}
            loading='eager'
            src={`https://img.hiephanhthienha.com/uploads/movies/${data.thumb_url}`}
            alt={data.name}
            className='h-[210px] sm:h-[384px] w-full object-cover mb-1'
          />
          <span className='text-white text-sm p-[2px] px-2 rounded-[4px] bg-yellow-600/80 absolute top-2 left-1'>
            {data.episode_current}
          </span>
          <h3 title={data.name} className='text-white leading-6 line-clamp-1'>
            {data.name}
          </h3>
          <h3 title={data.origin_name} className='text-white/40 leading-6 line-clamp-1'>
            {data.origin_name} (<strong className='text-white/60'>{data.year}</strong>)
          </h3>
        </Link>
      ) : (
        <div className='h-[210px] sm:h-[384px] w-full mb-1 bg-gray-300 animate-spin flex flex-col'>
          <div className='h5 w-full bg-gray-300 animate-spin'></div>
        </div>
      )}
    </>
  )
}
export default Card
