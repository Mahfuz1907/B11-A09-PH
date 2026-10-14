"use client";

import { User, Mail, ShieldCheck, ShieldAlert, Save } from "lucide-react";
import Swal from "sweetalert2";
import { updateUser, useSession } from "@/app/lib/auth-client";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function ProfilePage() {
  const {data:session} = useSession()
  const user = session?.user

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData) as Record<string, string>

    const {data, error} = await updateUser({
        name: userData.name
    })

    if(data){
        Swal.fire({
            title: 'Success!',
            text: 'Name updated successfully.',
            icon: 'success',
            confirmButtonColor: '#4f46e5'
        })
    }else if(error){
        Swal.fire({
            title: 'Error!',
            text: 'Name not updated.',
            icon: 'error',
            confirmButtonColor: '#4f46e5'
        })
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-8 text-white">
          <h1 className="text-2xl font-bold tracking-tight">{user?.name}</h1>
          <p className="text-indigo-100 text-sm mt-1">
            Manage your account details and update your personal information.
          </p>
        </div>

        {/* Profile Details & Form */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Email & Verified Badge Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 gap-3">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
              </div>
            </div>

            <div>
              {user?.emailVerified ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  <ShieldAlert className="w-4 h-4 mr-1.5 text-amber-600" />
                  Unverified
                </span>
              )}
            </div>
          </div>

          {/* Update Name Form */}
           <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
            <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User className="w-5 h-5" />
            </div>
            <Input 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="Enter your name" />
            </div>
            <FieldError />
          </TextField>
          <Fieldset.Actions>
          <Button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
            >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
            </Button>
        </Fieldset.Actions>
      </Fieldset>
           </Form>


        </div>
      </div>
    </div>
  );
}