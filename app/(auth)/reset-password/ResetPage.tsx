"use client";
import { resetPassword } from "@/app/lib/auth-client";
import { SubscriptionContext } from "@/Context/SubscriptionContext";
import {Eye, EyeSlash, Check} from "@gravity-ui/icons";
import {Button, Description, Form, Label, TextField, InputGroup, FieldError} from "@heroui/react";
import { KeyRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {useContext, useState} from "react";
import React from 'react';
import Swal from "sweetalert2";

const ResetPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [isResVisible, setIsResVisible] = useState(false)
    const {resPass, setResPass} = useContext(SubscriptionContext)
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

    if (!token) {
        console.log('Invalid or missing token')
        return
    }

    const { data, error } = await resetPassword({
        newPassword: userData.password,
        token
    });

    if(data){
        Swal.fire({
            title: 'Success!',
            text: 'Your password is reset successfully.',
            icon: 'success',
            confirmButtonColor: '#4f46e5'
        })
        router.push('/login')
    }else if(error){
        Swal.fire({
            title: 'Error!',
            text: 'Your password reset failed.',
            icon: 'error',
            confirmButtonColor: '#4f46e5'
        })
    }

  };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Top Icon Branding */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg">
            <KeyRound className="w-6 h-6" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your new secure password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100 flex flex-col items-center">
          
          <div className="mx-auto my-2 w-full flex justify-center">
            <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>  
              <TextField 
                isRequired
                className="w-full" 
                name="password"
                onChange={(val) => setResPass(val)}
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Password</Label>
                
                <InputGroup className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 bg-white">
                  <InputGroup.Input
                    className="w-full px-3 py-2.5 text-sm bg-transparent outline-none border-none focus:ring-0 text-gray-900"
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <InputGroup.Suffix className="pe-2 flex items-center">
                    <Button
                      isIconOnly
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisible(!isVisible)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>

                <Description className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </Description>
                
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
              <TextField 
                isRequired
                className="w-full" 
                name="confirm-password"
                validate={(value) => {
                  if (value !== resPass) {
                    return "Password doesn't match";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</Label>
                
                <InputGroup className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 bg-white">
                  <InputGroup.Input
                    className="w-full px-3 py-2.5 text-sm bg-transparent outline-none border-none focus:ring-0 text-gray-900"
                    type={isResVisible ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <InputGroup.Suffix className="pe-2 flex items-center">
                    <Button
                      isIconOnly
                      aria-label={isResVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsResVisible(!isResVisible)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      {isResVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
                
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <div className="flex gap-3 justify-center items-center mt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="size-5" />
                  Submit
                </Button>
              </div>

            </Form>
          </div>

        </div>
      </div>
    </div>
    );
};

export default ResetPage;