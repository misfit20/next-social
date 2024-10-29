'use client';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSigninButton from "../ui/GoogleSigninButton";
import { Mail, User, Briefcase, Text, ChartBarStacked, MapPinHouse } from "lucide-react"; // Added icons for business fields
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z.string().min(5, 'Username cannot contain less than 5 characters').max(30, 'Username must have less than 30 characters'),
  email: z.string().min(1, 'Email is Required').email('Invalid email'),
  businessName: z.string().min(1, 'Business Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  category: z.string().min(1, 'Category is required'),
  address: z.string().min(1, 'Address is required'),
})

const BusinessListingForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      businessName: '',
      description: '',
      category: '',
      address: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/listBusiness', { // Endpoint to handle business listing
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        businessName: values.businessName,
        description: values.description,
        category: values.category,
        address: values.address,
      })
    });
    if (response.ok) {
      router.push('/business-listing-success'); // Redirect after successful listing
    } else {
      console.error('Business listing failed');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 py-2">
        <div className="space-y-2">

         
        <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Input placeholder="Your Business Name" {...field} /><Briefcase />
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
                <FormLabel> Business Email</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Input placeholder="example@gmail.com" {...field} /><Mail />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Input placeholder="Short description of your business" {...field} /><Text />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Input placeholder="Business Category" {...field} /><ChartBarStacked />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <Input placeholder="Business Address" {...field} /><MapPinHouse />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        
        <Button type="submit" className="w-full mt-6">List Business</Button>
      </form>
    </Form>
  );
};

export default BusinessListingForm;
