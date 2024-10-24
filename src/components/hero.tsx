"use client"
import Link from "next/link"
import { Container } from "./Container";
import { Button, buttonVariants } from "@/components/ui/button"
const Hero = () => {

    return (
        
             <div className="flex items-center w-full lg:w-1/2 px-4 ">
          
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-5xl xl:text-6xl dark:text-white">
              Your Guide to Trusted Reviews
            </h1>
            <p className="py-5 text-xl leading-relaxed text-gray-500 lg:text-2xl dark:text-gray-300">
              Kibung Reviews is your go-to platform for discovering and rating local businesses. Whether you are exploring catering, crafting, or grocery services, easily share your feedback and help others find top-quality providers.
            </p>

            </div>
            </div> 
        
    );
};

export default Hero;