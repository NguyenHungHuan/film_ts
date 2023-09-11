import { Outlet } from 'react-router-dom'
import { Footer, Header, ScrollToTop } from '../components'

const MainLayout = () => {
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
