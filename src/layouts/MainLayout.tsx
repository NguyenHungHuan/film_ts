import { Outlet, useLocation } from 'react-router-dom'
import { Footer, Header, ScrollToTop } from '../components'
import { useScrollTop } from 'src/hooks'

const MainLayout = () => {
  const { pathname } = useLocation()
  useScrollTop([pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
        <div className='hidden md:block'>
          <ScrollToTop />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
