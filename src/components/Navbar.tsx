"use client"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
const Navbar = () => {

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
                    <img src ='home.png' width={16} height={16} className = "w-4 h-4"/>
                    <span>Homepage</span>
                    </Link>

                    <Link href ='/' className="flex gap-2 items-center">
                    <img src ='friends.png' width={16} height={16}  className = "w-4 h-4"/>
                    <span>Campaigns</span>
                    </Link>

                    <Link href ='/' className="flex gap-2 items-center">
                    <img src ='stories.png' width={16} height={16}  className = "w-4 h-4"/>
                    <span>Login</span>
                    </Link>
                    
                </div>
            </div>
              {/* RIGHT */}
            <div className=' w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
        

        <div className = "cursor-pointer">
            <img src="people.png" alt="" width={20} height={20}/>
        </div>

        <div className = "cursor-pointer">
            <img src="messages.png" alt="" width={20} height={20}/>
        </div>

        <div className = "cursor-pointer">
            <img src="notifications.png" alt="" width={20} height={20}/>
        </div>

                <MobileMenu/>
            </div>
        </div>
    );
};

export default Navbar;