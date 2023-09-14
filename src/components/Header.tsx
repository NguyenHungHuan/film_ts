import { Link, NavLink, createSearchParams, useLocation, useMatch } from 'react-router-dom'
import PATH from '../utils/path'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Navbar } from '.'

const Header = () => {
  const { pathname } = useLocation()
  const [OpenNav, setOpenNav] = useState<boolean>(false)
  const [header, setHeader] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = OpenNav ? 'hidden' : 'unset'
  }, [OpenNav])

  useEffect(() => {
    setOpenNav(false)
  }, [pathname])

  const handleChangeHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  window.addEventListener('scroll', handleChangeHeader)

  return (
    <header
      className={`text-white sticky top-0 z-20 left-0 right-0 transition-all duration-300 ${
        header ? 'bg-black/95' : 'bg-transparent'
      }`}
    >
      <div className='px-4 h-[56px] overflow-hidden flex items-center justify-between'>
        <div className='h-full flex items-center gap-4'>
          <Link
            to={PATH.home}
            title='VPhim'
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
          >
            <h1 title='Web xem phim miễn phí lớn nhất Việt Nam' className='font-bold text-4xl text-rose-600'>
              VPhim
            </h1>
          </Link>
          <div className='hidden md:block'>
            <Navbar />
          </div>
        </div>
        {/* hamburger button */}
        <div className='flex md:hidden items-center gap-1'>
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
              `hover:text-blue-600 hover:bg-blue-600/20 text-lg flex items-center justify-center gap-2 px-2 py-4 ${
                isActive && ' text-blue-600'
              }`
            }
          >
            <svg className='w-4 h-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
            </svg>
            Tìm Kiếm
          </NavLink>
          <button
            title='Menu phim VPhim'
            onClick={() => setOpenNav((prev) => !prev)}
            className='flex flex-col gap-[5px] p-2'
          >
            <span
              className={classNames('block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300', {
                'rotate-45 translate-y-2': OpenNav,
                'rotate-0': !OpenNav
              })}
            />
            <span
              className={classNames('block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300', {
                'opacity-0': OpenNav,
                'opacity-100': !OpenNav
              })}
            />
            <span
              className={classNames('block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300', {
                '-rotate-45 -translate-y-2': OpenNav,
                'rotate-0': !OpenNav
              })}
            />
          </button>
        </div>
        {/* hamburger open */}
        <div
          className={`${
            OpenNav ? 'translate-x-0' : 'translate-x-full'
          } duration-200 transition-all bg-[#06121e] h-full block md:hidden p-4 pt-10 fixed z-50 inset-0 overflow-y-auto top-[56px]`}
        >
          <ul className='flex flex-col text-2xl'>
            <li>
              <NavLink
                title='Xem phim hot nhất tại VPhim'
                to={PATH.hot}
                className={({ isActive }) =>
                  `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${isActive && ' text-blue-600'}`
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
                  `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${isActive && ' text-blue-600'}`
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
                  `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${isActive && ' text-blue-600'}`
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
                  `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${isActive && ' text-blue-600'}`
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
                  `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${isActive && ' text-blue-600'}`
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
                  `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${isActive && ' text-blue-600'}`
                }
              >
                Hoạt Hình
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Header
