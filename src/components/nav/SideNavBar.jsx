
import LogOutSideNav from './LogOutSideNav';
import NavigationLink from './NavigationLink'
import {
  HomeIcon,
  TagIcon,
  BookmarkIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/solid";







export default function SideNavBar() {

  const navItems = [
    {
      navTitle: "Home",
      link: "/dashboard/home",
      icon: <HomeIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
    {
      navTitle: "Category",
      link: "/dashboard/category",
      icon: <TagIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
    {
      navTitle: "Menu Items",
      link: "/dashboard/menu-items",
      icon: <BookmarkIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
    {
      navTitle: "Users",
      link: "/dashboard/users",
      icon: <UserIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
  ]

  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.navTitle}>
          <NavigationLink item={item} />
        </li>
      ))}
      <LogOutSideNav />
    </ul>
  );
}
