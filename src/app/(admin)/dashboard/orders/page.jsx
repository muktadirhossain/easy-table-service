import HeadingDashboard from '@/components/typography/HeadingDashboard'
import dayjs from 'dayjs'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getAllOrders } from '@/query/query'

export const dynamic = 'force-dynamic'

const Page = async () => {
    const data = await getAllOrders()
    return (
        <div>
            <HeadingDashboard>All Orders </HeadingDashboard>
            {
                data.length > 0 &&
                <section className="mt-20">

                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-pin-rows">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='prose-lg'>Order ID</th>
                                    <th className='prose-lg'>Date</th>
                                    <th className='prose-lg'>Sub Total</th>
                                    <th className='prose-lg'>Total</th>
                                    <th className='prose-lg'>Customer Name</th>
                                    <th className='prose-lg'>Status</th>
                                    <th className='prose-lg'>Category Name</th>

                                    <th className='prose-lg'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((category, idx) => <tr key={category._id}>
                                        <td className='text-xs'>{category?._id.toString()}</td>
                                        <td className='text-xs'>{dayjs(category?.createdAt).format('MMM DD, YYYY')}</td>

                                        <td>{category?.subTotalPrice}</td>
                                        <td>{category?.payableAmount}</td>
                                        <td className='capitalize'>{category?.customerName}</td>
                                        <td className={`capitalize mt-2 badge ${category?.orderStatus === 'canceled' ? 'badge-error' : "badge-success"}`}>{category?.orderStatus}</td>
                                        <td>{dayjs(category?.createdAt).format('DD/MM/YYYY')}</td>
                                        <td>
                                            <Link href={`/dashboard/orders/details/${category?._id}`}>
                                                <ArrowTopRightOnSquareIcon className='h-6 w-6 text-rose-500' />
                                            </Link>
                                        </td>

                                        {/* <td>
                                            <DeleteMenuItem id={JSON.stringify(category?._id)} />
                                        </td> */}
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </section>
            }

            {
                data.length === 0 && <h3 className='text-center font-medium text-2xl my-10'>No data Found 🙁</h3>
            }
        </div>
    )
}

export default Page