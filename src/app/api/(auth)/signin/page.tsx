"use client"

import SignInForm from '@/components/form/SignInForm';

const page = () => {
    return (
        <div className="w-full flex justify-center items-center min-h-screen pt-20">
            
            <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                <SignInForm />
            </div>
        </div>
    );
};

export default page;