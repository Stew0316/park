
import Style from '@/style/Home.module.scss'
import { Outlet } from 'react-router'
function Home() {
  return (
    <div className={`${Style.Home}`}>
      <div className='route'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
export default Home