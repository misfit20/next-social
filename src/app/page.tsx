"use client"

import { Container } from "@/components/Container";
import { Restaurants } from "@/components/restaurants";
import { SectionTitle } from "@/components/SectionTitle";
import { Testimonials } from "@/components/testimonials";
import heroImage from "../../public/food.jpg";
import * as Separator from "@radix-ui/react-separator";
import { Cpu, Scissors, ShoppingCart, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import Hero from "@/components/hero";
const Home = () => {
    return (
  <div>
<div className="flex flex-wrap items-center justify-center lg:justify-between py-12">
  
  <div  style={{ backgroundImage: `url('../../public/food.jpg')` }}>
         <Hero/>
    </div>


    <div className="flex gap-6 items-center justify-center">
          <Link className={buttonVariants()} href="#"><UtensilsCrossed />Catering</Link>
          
          <Link className={buttonVariants()} href="#"><Scissors />Crafting</Link>

          <Link className={buttonVariants()} href="#"><ShoppingCart />Super Markets</Link> 

          <Link className={buttonVariants()} href="#"><Cpu />Tech</Link> 
          </div>
              
  <SectionTitle preTitle="Restaurants"  title="Top Restaurants Near You">
        Wanna check out some place to eat?
      </SectionTitle>
      <Restaurants/>

        </div>
          <SectionTitle
        preTitle="Reviews"
        title="Here are some of the Best Reviews"
      >
        Get to see what other customers had to say about some of the best service providers here.
      </SectionTitle>
          <Testimonials/>
        </div>    
    );
  };
  
  export default Home;
  