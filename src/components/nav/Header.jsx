import Link from 'next/link'
import MenuLink from './MenuLink'
import CONSTANTS from '@/assets/constants';
import { cookies } from 'next/headers';
import verifyJWT from '@/utils/verifyJWT';
import LogOutSideNav from './LogOutSideNav';

async function Header() {
    const cookieStore = cookies();
    const token = cookieStore.get(CONSTANTS?.cookieName)?.value;
    const user = await verifyJWT(token, CONSTANTS?.tokenSecret);

    const links = [
        {
            link: '/',
            label: 'Home',
        },
        {
            link: '/cart',
            label: 'Cart'
        },
        {
            link: '/dashboard/home',
            label: 'Dashboard'
        },

    ]
    return (
        <header className="text-gray-600 body-font border-b dark:border-b-gray-500">
            <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                    <svg width="50" height="50" viewBox="0 0 300 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.23858 0 0 2.23858 0 5V165C0 167.761 2.23857 170 5 170H295C297.761 170 300 167.761 300 165V5C300 2.23858 297.761 0 295 0H5ZM222.375 99.9001C220.908 98.0667 219.625 96.0134 218.525 93.7401L201.035 105.4C202.428 109.507 204.628 113.137 207.635 116.29C210.642 119.443 214.235 121.863 218.415 123.55C222.668 125.31 227.325 126.227 232.385 126.3C237.738 126.3 242.872 125.31 247.785 123.33C252.772 121.423 256.988 118.6 260.435 114.86C263.955 111.047 266.118 106.353 266.925 100.78C267.438 96.9667 267.145 93.5201 266.045 90.4401C265.018 87.2867 263.258 84.5367 260.765 82.1901C258.272 79.7701 255.118 77.8634 251.305 76.4701C249.838 75.8834 248.188 75.3334 246.355 74.8201C244.595 74.2334 242.945 73.6101 241.405 72.9501C239.865 72.2167 238.655 71.4101 237.775 70.5301C236.895 69.5767 236.602 68.5134 236.895 67.3401C237.115 66.4601 237.592 65.7634 238.325 65.2501C239.058 64.6634 239.938 64.2601 240.965 64.0401C241.992 63.7467 242.982 63.6001 243.935 63.6001C245.475 63.6001 246.868 63.8934 248.115 64.4801C249.362 64.9934 250.498 65.8 251.525 66.9001C252.625 67.9267 253.615 69.2101 254.495 70.7501L273.195 61.0701C271.875 57.9167 269.968 55.0567 267.475 52.4901C265.055 49.8501 262.048 47.7601 258.455 46.2201C254.862 44.6067 250.608 43.8001 245.695 43.8001C240.562 43.7267 235.612 44.5701 230.845 46.3301C226.152 48.0901 222.155 50.6934 218.855 54.1401C215.555 57.5867 213.538 61.84 212.805 66.9001C212.365 70.2734 212.585 73.3167 213.465 76.0301C214.345 78.6701 215.628 81.0534 217.315 83.1801C219.075 85.2334 221.018 87.0301 223.145 88.5701C225.345 90.0367 227.545 91.2467 229.745 92.2001C232.385 93.2267 234.658 94.1801 236.565 95.0601C238.545 95.8667 240.012 96.7101 240.965 97.5901C241.918 98.4701 242.212 99.6067 241.845 101C241.625 102.1 241.075 103.017 240.195 103.75C239.388 104.41 238.398 104.923 237.225 105.29C236.125 105.583 234.988 105.73 233.815 105.73C231.468 105.73 229.342 105.217 227.435 104.19C225.528 103.163 223.842 101.733 222.375 99.9001ZM61.36 103.75H92.93L89.52 123H58.06H51.46H35.29L48.49 46.0001H64.77H71.26H102.83L99.42 65.2501H67.96L66.4514 74.0501H95.9L92.6 92.7501H63.2457L61.36 103.75ZM121.553 67.4501L125.293 46.0001H191.843L188.103 67.4501H166.873L157.303 123H133.433L143.003 67.4501H121.553Z" fill="#00FF99" />
                    </svg>
                    {/* <span>Easy Table services</span> */}
                    <span className="ml-3 text-xl">Logo</span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    {
                        links.map((link) => <MenuLink key={link?.link} {...link} />)
                    }
                </nav>
                {
                    !user?.id && !user?.role ?

                        <Link href={'/login'} className="inline-flex items-center bg-violet-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-violet-800 rounded text-base mt-4 md:mt-0">Login
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                        :
                        <LogOutSideNav />
                }
            </div>
        </header>
    )
}

export default Header