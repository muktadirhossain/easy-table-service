import HeadingDashboard from '@/components/typography/HeadingDashboard'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <HeadingDashboard>
        Category
      </HeadingDashboard>
      <Link
        className='bg-violet-600 px-5 py-2 rounded-md'
        href={'/dashboard/category/create'}>Add New Category</Link>



    </div>
  )
}

export default page