"use client"

import SignUpForm from '@/components/form/SignUpForm';

const page =() => {
    return (
        <div className="w-full flex justify-center items-center min-h-screen pt-20">
            
        <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
            <SignUpForm />
        </div>
    </div>
    );
}

export default page;