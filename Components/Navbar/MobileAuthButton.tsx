'use client'

import { signOut } from '@/app/lib/auth-client';
import { UserType } from '@/type';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
import Swal from 'sweetalert2';

interface MobAuthType{
    setIsOpen : Dispatch<SetStateAction<boolean>>,
    user?: UserType | null
}

const MobileAuthButton = ({setIsOpen, user}:MobAuthType) => {
  const router = useRouter()
    return (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-2">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {
            user?.name ? 
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
            <Link
              href={'/profile'} 
              className='text-indigo-600 font-medium text-lg text-center'
              >
                {user?.name}
            </Link>
            <Button
              className="block text-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm w-full"
              onClick={() => {setIsOpen(false); signOut({
                fetchOptions: {
                  onSuccess: () => {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Logged out successfully.',
                      icon: "success",
                      confirmButtonColor: "#4f46e5", 
                    })
                    router.push("/login")
                  },
                },
              })}}
            >
              Logout
            </Button>
            </div>
            :
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
            <Link 
              href="/login"
              className="block text-center px-4 py-2 rounded-xl text-gray-700 border border-gray-200 font-medium text-sm"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="block text-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
          }
        </div>
    );
};

export default MobileAuthButton;