
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import { Button, buttonVariants } from "@/components/ui/button"
import {LogIn, House, Rocket, Store, Star} from 'lucide-react';
import { ModeToggle } from "./ui/toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { signOut } from "next-auth/react";
import UserAccount from "./ui/UserAccount";

const Navbar = async() => {
    const session = await getServerSession(authOptions);
    return (
        <div className = 'h-24 flex items-center justify-between'>
            {/* LEFT */}
            <div className=' md:hidden lg:block w-[20%]'>
                <Link href = "/" className="font-bold text-xl text-blue-600">Kibung</Link>
            </div>
             {/* CENTER */}
            <div className='hidden md:flex w-[50%] text-sm'>
                {/* LINKS */}
                <div className='flex gap-6 text-gray-600'>
                    <Link href ='/' className="flex gap-2 items-center">
                    <House />
                    <span>Homepage</span>
                    </Link>

                    <Link href ='/api/business-reg' className="flex gap-2 items-center">
                    <Store />
                    <span>Add A Business</span>
                    </Link>

                    <Link href ='/' className="flex gap-2 items-center">
                    <Star />
                    <span>Drop a Review</span>
                    </Link>
                    
                </div>
            </div>
              {/* RIGHT */}
            <div className=' w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
        
        {/*
        <div className = "cursor-pointer">
            <img src="/people.png" alt="" width={20} height={20}/>
        </div>
        */}
        
         {/*
        <div className = "cursor-pointer">
            <img src="/messages.png" alt="" width={20} height={20}/>
        </div>         
         */}
        


         {/*
         <div className = "cursor-pointer">
            <img src="/notifications.png" alt="" width={20} height={20}/>
        </div>
         */}
        
         
       {session?.user ? (
        <div>
            <UserAccount/>
        </div>
       ) : (
         <Link className={buttonVariants()} href="/api/signin">Sign in</Link>
       )}
            
        <ul>
            <li>
                <ModeToggle/>
            </li>
        </ul>

                <MobileMenu/>
            </div>
        </div>
    );
};

export default Navbar;