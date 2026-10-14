'use client'

import { requestPasswordReset } from "@/app/lib/auth-client";
import {Button, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const ForgotPasswordPage = () => {

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData) as Record<string, string>;

    const { data, error } = await requestPasswordReset({
    email: userData.email, 
    redirectTo: "/reset-password", 
    });

    if(data){
        console.log(data)
        Swal.fire({
            title: 'Success!',
            text: 'Check your email to reset your password.',
            icon: 'success',
            confirmButtonColor: "#4f46e5"
        })
    }else if(error){
        console.log(error)
        Swal.fire({
            title: 'Error!',
            text: 'Error sending mail.',
            icon: 'error',
            confirmButtonColor: '#4f46e5'
        })
    }
  };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg">
            <KeyRound className="w-6 h-6" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          No worries! Enter your email address and we will send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
            
            {/* Email Field with HeroUI */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700">Email Address</Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none">
                  <Mail className="w-5 h-5" />
                </span>
                <Input 
                  placeholder="you@example.com" 
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                />
              </div>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer flex items-center justify-center"
            >
              Send Reset Link
            </Button>
          </Form>

          {/* Back to Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
    );
};

export default ForgotPasswordPage;