import type { NextPage } from 'next'
import { Banner } from '../components'

const Home: NextPage = () => (
  <div className="flex justify-center p-12 sm:px-4">
    <div className="w-full minmd:w-4/5">
      <Banner />
    </div>
  </div>
)

export default Home
