'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';


export default function NavLinks() {
  const pathname = usePathname()
  const {data: session} = useSession()
  const links = [
  { name: 'Home', href: `/dashboard/${session?.user?.email}`, icon: HomeIcon },
  {
    name: 'Goals',
    href: '/dashboard/goals',
    icon: DocumentDuplicateIcon,
  },
];
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-light-gray p-3 text-sm font-medium hover:bg-light-orange hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
            {'bg-light-orange text-black': pathname === link.href})}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
