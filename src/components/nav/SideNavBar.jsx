
import NavigationLink from './NavigationLink'
import {
  ArchiveBoxArrowDownIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  ShoppingCartIcon,
  TagIcon,
  BookmarkIcon,
  BanknotesIcon,
  WalletIcon,
  PresentationChartLineIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ChevronDoubleLeftIcon
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
      navTitle: "Ingredients",
      link: "/dashboard/ingredients",
      icon: <BookmarkIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
    {
      navTitle: "Purchase",
      link: "/dashboard/purchase",
      icon: <BookmarkIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
    {
      navTitle: "Closing Stock",
      link: "/dashboard/closing-stock",
      icon: <BookmarkIcon className="md:h-6 md:w-6 h-4 w-4" />,
    },
  ]

  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.navTitle}>
          <NavigationLink item={item} />
        </li>
      ))}
    </ul>
  );
}
