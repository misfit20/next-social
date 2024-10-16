'use client';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem,FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSigninButton from "../ui/GoogleSigninButton";
import { Mail, Lock} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is Required').email('Invalid email'),
  password: z.string().min(1, 'Password is Required').min(8, 'Password must have atleast 8 characters'),
})


const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/',  // Adjust if needed
      redirect: false,
    });
  
    if (signInData?.error) {
      console.log(signInData.error); 
    } else {
      router.push('/admin');
    }
  };
  



return (
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

    <div className="space-y-2">
      {/* Email Field */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <div className="flex gap-3">
              
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  value={field.value || ''}  
                />
                <Mail />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Password Field */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="flex gap-3">
                {/* Ensure the input always has a value */}
                <Input
                  placeholder="Enter Your Password Here"
                  {...field}
                  type="password"
                  value={field.value || ''} 
                />
                <Lock />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    {/* Submit Button */}
    <Button type="submit" className="w-full mt-6">
      Sign in
    </Button>

  </form>

  {/* Divider for alternative sign-in methods */}
  <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
    or
  </div>

  {/* Google Sign-in Button */}
  <GoogleSigninButton>Sign in with Google</GoogleSigninButton>

  {/* Sign-up Link */}
  <p>
    If you don&apos;t have an account, please&nbsp;
    <Link href="/api/signup" className="text-blue-500 hover:underline">
      Sign Up
    </Link>
  </p>
</Form>


)};

export default SignInForm;


