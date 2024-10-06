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
import { Mail, User, Lock, LockKeyhole } from "lucide-react";

const FormSchema = z.object({
  username:z.string().min(5, 'Username cannot contain less than 5 characters').max(30, 'Username must have less than 30 characters'),
  email: z.string().min(1, 'Email is Required').email('Invalid email'),
  password: z.string().min(1, 'Password is Required').min(8, 'Password must have atleast 8 characters'),
  confirmPassword:z.string().min(1,'Password Confirmation is required'),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwor does not match',
})


const SignUpForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

const onSubmit = (values:z.infer<typeof FormSchema>) => {
  console.log(values);
}



return (
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 py-2">

      <div className="space-y-2">

      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                <Input placeholder="johndoe" {...field} /><User />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
             
              <FormLabel>Email</FormLabel>
              <FormControl>
              <div className="flex gap-3">
                <Input placeholder="example@gmail.com" {...field} /><Mail/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <div className="flex gap-3">
                <Input placeholder="Enter Your Password Here" {...field} type="password" /><Lock />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



<FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-Enter your password</FormLabel>
              <FormControl>
              <div className="flex gap-3">
                <Input placeholder="Re-Enter Your Password Here" {...field} type="password" /><LockKeyhole />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
        
        
        
        <Button type="submit" className="w-full mt-6">Sign up</Button>
      </form>

      <div className=" mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

      <GoogleSigninButton>Sign Up with Google</GoogleSigninButton>

      <p> If you already have an account, please&nbsp;
        <Link href="/api/signin" className="text-blue-500 hover:underline">Sign In</Link>
      </p>
    </Form>

)};

export default SignUpForm;