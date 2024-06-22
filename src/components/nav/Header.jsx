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
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
                        viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
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