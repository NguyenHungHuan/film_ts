import PATH from '../utils/path'
import { NavLink, createSearchParams } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='text-white'>
      <ul className='flex items-center font-semibold text-base lg:text-lg'>
        <li>
          <NavLink
            title='Tìm phim miễn phí tại VPhim'
            to={{
              pathname: PATH.search,
              search: createSearchParams({
                keyword: '',
                page: '1'
              }).toString()
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 flex items-center justify-center gap-2 px-2 py-4 ${
                isActive && ' text-blue-600'
              }`
            }
          >
            <svg className='w-4 h-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
            </svg>
            Tìm Kiếm
          </NavLink>
        </li>
        <li>
          <NavLink
            title='Xem phim hot nhất tại VPhim'
            to={PATH.hot}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive && ' text-blue-600'}`
            }
          >
            Phim Hot
          </NavLink>
        </li>
        <li>
          <NavLink
            title='Xem phim mới nhất tại VPhim'
            to={{
              pathname: `${PATH.list}/${PATH.new}`,
              search: createSearchParams({
                page: '1',
                sort_field: '',
                category: '',
                country: '',
                year: ''
              }).toString()
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive && ' text-blue-600'}`
            }
          >
            Phim Mới
          </NavLink>
        </li>
        <li>
          <NavLink
            title='Xem phim bộ hay nhất tại VPhim'
            to={{
              pathname: `${PATH.list}/${PATH.series}`,
              search: createSearchParams({
                page: '1',
                sort_field: '',
                category: '',
                country: '',
                year: ''
              }).toString()
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive && ' text-blue-600'}`
            }
          >
            Phim Bộ
          </NavLink>
        </li>
        <li>
          <NavLink
            title='Xem phim lẻ hay nhất tại VPhim'
            to={{
              pathname: `${PATH.list}/${PATH.odd}`,
              search: createSearchParams({
                page: '1',
                sort_field: '',
                category: '',
                country: '',
                year: ''
              }).toString()
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive && ' text-blue-600'}`
            }
          >
            Phim Lẻ
          </NavLink>
        </li>
        <li>
          <NavLink
            title='Xem tv shows hay nhất tại VPhim'
            to={{
              pathname: `${PATH.list}/${PATH.tvShows}`,
              search: createSearchParams({
                page: '1',
                sort_field: '',
                category: '',
                country: '',
                year: ''
              }).toString()
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive && ' text-blue-600'}`
            }
          >
            TV Shows
          </NavLink>
        </li>
        <li>
          <NavLink
            title='Xem phim hoạt hình hay nhất tại VPhim'
            to={{
              pathname: `${PATH.list}/${PATH.anime}`,
              search: createSearchParams({
                page: '1',
                sort_field: '',
                category: '',
                country: '',
                year: ''
              }).toString()
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive && ' text-blue-600'}`
            }
          >
            Hoạt Hình
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
