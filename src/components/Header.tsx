import { Link, NavLink, createSearchParams, useLocation, useMatch } from 'react-router-dom'
import PATH from '../utils/path'
import { useEffect, useState } from 'react'
import iconSearch from '../../public/icon_search.webp'
import classNames from 'classnames'
import { Navbar } from '.'

const Header = () => {
  const { pathname } = useLocation()
  const [OpenNav, setOpenNav] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = OpenNav ? 'hidden' : 'unset'
  }, [OpenNav])

  useEffect(() => {
    setOpenNav(false)
  }, [pathname])

  return (
    <header className='bg-transparent text-white sticky top-0 z-20 left-0 right-0'>
      <div className='px-8 h-[56px] overflow-hidden flex items-center justify-between'>
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
          <Navbar />
        </div>
        {/* hamburger button */}
        <div className='flex sm:hidden items-center gap-1'>
          <button
            title='Tìm kiếm phim'
            onClick={() => setOpenNav((prev) => !prev)}
            className='bg-center bg-no-repeat w-[18px] h-[18px] p-4'
            style={{
              backgroundImage: `url(${iconSearch})`
            }}
          />
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
          } duration-200 transition-all bg-gray-800 h-full block sm:hidden p-4 pt-0 fixed z-50 inset-0 overflow-y-auto top-[74px]`}
        >
          <ul className='flex flex-col gap-4 text-lg'>
            <li>
              <Link
                title='Trang chủ VPhim'
                to={PATH.home}
                className={`hover:text-primary text-center block capitalize ${useMatch(PATH.home) && ' text-primary'}`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                title='Tất cả thể loại phim'
                to={{
                  pathname: PATH.genres,
                  search: createSearchParams({
                    type: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-center block capitalize ${
                  useMatch(PATH.genres) && ' text-primary'
                }`}
              >
                Thể loại
              </Link>
            </li>
            <li>
              <Link
                title='Xem phim theo quốc gia'
                to={{
                  pathname: PATH.country,
                  search: createSearchParams({
                    status: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-center block capitalize ${
                  useMatch(PATH.country) && ' text-primary'
                }`}
              >
                Quốc gia
              </Link>
            </li>
            <li>
              <Link
                title='Những bộ phim bộ hay nhất'
                to={{
                  pathname: PATH.series,
                  search: createSearchParams({
                    status: 'all',
                    page: '1'
                  }).toString()
                }}
                className={`hover:text-primary text-center block capitalize ${
                  useMatch(PATH.series) && ' text-primary'
                }`}
              >
                Phim Bộ
              </Link>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.odd,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                Phim lẻ
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: PATH.cinema,
                  search: createSearchParams({
                    page: '1'
                  }).toString()
                }}
                className={({ isActive }) =>
                  `capitalize block hover:text-primary text-center ${isActive && ' text-primary'}`
                }
              >
                Chiếu rạp
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Header
