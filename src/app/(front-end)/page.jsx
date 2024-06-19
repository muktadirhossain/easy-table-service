import CONSTANTS from '@/assets/constants'
import FoodCard from '@/components/card/FoodCard'
import HeadingDashboard from '@/components/typography/HeadingDashboard'
import axios from 'axios'
import CartArea from './CartArea'

export const dynamic = 'force-dynamic';
export const revalidate = 5;


async function Page() {
  const { data: { data } } = await axios.get(`${CONSTANTS.baseUrl}/api/menu-items`)

  return (
    <div className='container mx-auto'>

      <section className='grid grid-cols-3 gap-x-3'>
        <section className='col-span-2'>
          <HeadingDashboard>All Food Items</HeadingDashboard>
          <div className='grid grid-cols-3 gap-3'>
            {
              data?.map(food => <FoodCard key={food?._id} food={JSON.stringify(food)} />)
            }
          </div>
        </section>
        <CartArea />
      </section>
    </div>
  )
}

export default Page