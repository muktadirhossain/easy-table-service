import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link
        className='bg-violet-600 px-5 py-2 rounded-md'
        href={'/dashboard/users/create'}>Add User</Link>
    </div>
  )
}

export default page