import HeadingDashboard from '@/components/typography/HeadingDashboard'
import { getAllCategories } from '@/lib/fetchCategory'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/solid'
import DeleteCategory from './DeleteCategory';

async function page() {
  const data = await getAllCategories();
  return (
    <div>


      <div className='flex justify-end'>
        <Link
          className='btn btn-primary'
          href={'/dashboard/category/create'}>
          <PlusIcon className="h-6 w-6" />
          Add New Category</Link>
      </div>

      <HeadingDashboard>
        Category
      </HeadingDashboard>

      <section className="mt-20">

        <div className="overflow-x-auto">
          <table className="table table-zebra table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th className='prose-lg'>Category Name</th>

                <th className='prose-lg'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.map((category, idx) => <tr key={category._id}>
                  <th>{idx + 1}</th>
                  <td>{category?.categoryName}</td>

                  <td>
                    <DeleteCategory id={JSON.stringify(category?._id)} />
                  </td>
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </section>



    </div>
  )
}

export default page