'use client'

import { signOut } from '@/app/lib/auth-client';
import { UserType } from '@/type';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

interface AuthButtonsType{
  user?: UserType | null
}

const AuthButtons = ({user}:AuthButtonsType) => {
  const router = useRouter()
    return (
        <div className="hidden md:flex items-center space-x-3">
          {
            user?.name ? 
            <>
              <Link
              href={'/profile'} 
              className='text-indigo-600 font-medium text-lg'
              >
                {user?.name}
              </Link>
              <Button
              onClick={() => signOut({
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
              })}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm hover:shadow-indigo-200 hover:shadow-lg transition-all text-sm"
            >
              Logout
            </Button>
            </>
            :
            <>
            <Link 
              href="/login"
              className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-indigo-600 font-medium transition-colors text-sm"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm hover:shadow-indigo-200 hover:shadow-lg transition-all text-sm"
            >
              Register
            </Link>
            </>
          }
        </div>
    );
};

export default AuthButtons;