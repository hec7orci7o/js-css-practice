import Link from 'next/link';
import {useRouter} from 'next/router';

const navigation = [
  {
    name: 'Archive',
    href: '/',
  },
  // {
  //   name: 'About',
  //   href: '/about',
  // },
];

export default function Navbar() {
  const router = useRouter();
  const {pathname} = router;

  return (
    <div className="w-full container mx-auto py-4 select-none">
      <nav className="flex items-center justify-center gap-x-6">
        {navigation.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${pathname === item.href ? 'text-white' : 'text-gray-400'} cursor-pointer`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
