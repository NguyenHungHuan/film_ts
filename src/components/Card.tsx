import { Link } from 'react-router-dom'

const Card = ({ thumb_url, name, origin_name }: { thumb_url: string; name: string; origin_name: string }) => {
  return (
    <Link to={'/'}>
      <img
        loading='lazy'
        src={`https://img.hiephanhthienha.com/uploads/movies/${thumb_url}`}
        alt=''
        className='h-[384px] w-full object-cover mb-1'
      />
      <h3 className='text-white leading-6 line-clamp-1'>{name}</h3>
      <h3 className='text-white/40 leading-6 line-clamp-1'>{origin_name}</h3>
    </Link>
  )
}

export default Card
