"use client";

import Link from "next/link";
import Image from "next/image";

import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";


const Nav = () => {

   const { data: session } = useSession();  

   const [providers, setProviders] = useState(null);
   const [toggleDropdown, setToggleDropdown] = useState(false)
   useEffect(() => {
      const setUpProviders = async () => {
         const response = await getProviders();

         setProviders(response);
      }

      setUpProviders();
   }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
       <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className="object-contain" />
            <p className="logo_text text-center">
               Promptopia
            </p>
       </Link>

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
          {session?.user ? (
               <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                       Create Post
                    </Link>
                    <button
                      type="button"
                      onClick={signOut}
                      className="outline_btn"
                    >
                         Sign Out
                    </button>
                    <Link href="/"> 
                       <Image src={session?.user.image} alt="Profile" width={37} height={37} className="rounded-full" onClick={() => setToggleDropdown((prev) => !prev)} />
                    </Link>
               </div>
          ): (
            <>
              {providers && 
                  Object.values(providers).map((provider) => (
                        <button
                           type="button"
                           key={provider.name}
                           onClick={() => signIn(provider.id)}
                           className="black_btn"
                        >
                            Sign In
                        </button>
                    ))}
            </>
          )}
      </div>
      
      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
         {session?.user ? (
             <div className="flex">
                     <Image src={session?.user.image} alt="Profile" width={37} height={37} className="rounded-full" onClick={() => setToggleDropdown((prev) => !prev)} />
                     {toggleDropdown && (
                         <div className="dropdown">
                            <Link href="/profile" className="dropdown_link">
                               My Profile
                            </Link>
                            <Link href="/create-prompt" className="dropdown_link">
                               Create Prompt
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                  setToggleDropdown(false);
                                  signOut();
                              }}
                              className="w-full mt-5 black_btn"
                            >
                                Sign Out
                            </button>
                         </div>
                     )}
             </div>
         ): (
          <>
          {providers && 
              Object.values(providers).map((provider) => (
                    <button
                       type="button"
                       key={provider.name}
                       onClick={() => signIn(provider.id)}
                       className="black_btn"
                    >
                        Sign In
                    </button>
                ))}
        </>
         )}
      </div>

    </nav>
  )
}

export default Nav