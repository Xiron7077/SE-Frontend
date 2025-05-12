"use client"

import { FC } from "react"
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar: FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        {label: 'Home', href: '/'},
        { label: 'Services', href: '/services' },
        { label: 'Reviews', href: '/feedback' },
        { label: 'Company', href: '/about' },
    ];

    let currentPage: string;
    switch(pathname){
        case '/':
            currentPage = 'home';
            break;
        default:
            currentPage = 'other';
    }

    return(
        <div className={clsx(
            "fixed top-0 left-0 h-20 w-screen flex items-center z-10 px-28 my-10",
            currentPage !== 'home' && "bg-black"
        )}>
            <div onClick={() => router.push('/')} className="w-[60%] flex flex-row gap-2 items-center hover:cursor-pointer">
                <Image src='/logo.png' width={20} height={20} alt='Logo' className=""/>
                <h1 className="text-white font-bold text-3xl">
                    ShipNoxy
                </h1>
            </div>
            <div className="w-[40%] flex flex-row gap-16 items-center justify-end">
                {navItems.map((item) => (
                    <Link 
                        key={item.href}
                        href={item.href}
                        className="font-bold text-2xl text-center hover:text-green-400"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Navbar;
