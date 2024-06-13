import HeadingDashboard from '@/components/typography/HeadingDashboard'
import { UserGroupIcon, BookmarkIcon, TagIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid'

function page() {
  return (
    <div>
      <HeadingDashboard>
        Dashboard!!!
      </HeadingDashboard>
      <section className='grid grid-cols-3'>
        <div className="card w-72 bg-base-100 shadow-xl">
          <div className="card-body">
            <TagIcon className='h-14 w-14 text-accent' />
            <h2 className="card-title">Categories : 30</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm mt-3">Buy Now
                <ArrowUpRightIcon className='h-3 w-3' />
              </button>
            </div>
          </div>
        </div>
        <div className="card w-72 bg-base-100 shadow-xl">
          <div className="card-body">
            <BookmarkIcon className='h-14 w-14 text-error' />
            <h2 className="card-title">Menu Items: 20</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-primary">See More
                <ArrowUpRightIcon className='h-3 w-3' />
              </button>
            </div>
          </div>
        </div>
        <div className="card w-72 bg-base-100 shadow-xl">
          <div className="card-body">
            <UserGroupIcon className='h-14 w-14 text-violet-500' />
            <h2 className="card-title">Total Users: 30</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-primary">See More
                <ArrowUpRightIcon className='h-3 w-3' />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page