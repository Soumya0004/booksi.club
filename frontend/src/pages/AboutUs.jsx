import React from "react";
import { BookOpen, Users, Truck, HeartHandshake } from "lucide-react";
import Img from "./img/LOGO.png"
import {  motion } from "motion/react";

const AboutUs = () => {
  return (
    <div className="bg-zinc-900 text-white  ">
      <div className="relative h-[400px] flex items-center">
        <motion.div className="absolute inset-0"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        >  
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80"
            alt="Library interior"
            className="w-full h-full object-cover opacity-20"
          />
        </motion.div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 className=" text-4xl md:text-5xl font-bold mb-4 flex text-white"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
          >
            About
            <img
              src={Img}
              alt=""
              className=" md:w-[14rem] md:h-[3.5rem] w-[13rem]  h-[3rem]  object-cover pl-3 "
            />
          </motion.h1>
          <motion.p className="text-xl text-white max-w-2xl"
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.4, duration:2}}

          >
            Your premier destination for curated books and exceptional reading
            experiences. We're passionate about connecting readers with their
            next great adventure.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 md:px-16">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-20"
        initial={{opacity:0}}
        animate={{opacity:1 }}
        transition={{delay:.3, duration:0.8}}
        >
          <div
          
          >
            <h2 className="text-3xl font-bold mb-6 text-[#ff485c]">Our Story</h2>
            <p className="text-white mb-6">
              Founded in 2025, Booksi emerged from a simple yet powerful idea:
              to create a space where book lovers could discover carefully
              curated literature that enriches their lives. What started as a
              small online bookstore has grown into a thriving community of
              readers and literary enthusiasts.
            </p>
            <p className="text-white">
              We believe that books have the power to transform lives, spark
              imagination, and foster understanding. Our mission is to make
              quality literature accessible to everyone while supporting authors
              and publishers who share our passion for storytelling.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-dark-lighter p-6 rounded-lg">
              <div className="text-[#ff485c] text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-white">Active Readers</div>
            </div>
            <div className="bg-dark-lighter p-6 rounded-lg">
              <div className="text-[#ff485c] text-4xl font-bold text-primary mb-2">100K+</div>
              <div className="text-white">Books Sold</div>
            </div>
            <div className="bg-dark-lighter p-6 rounded-lg">
              <div className="text-[#ff485c] text-4xl font-bold text-primary mb-2">1K+</div>
              <div className="text-white">Authors</div>
            </div>
            <div className="bg-dark-lighter p-6 rounded-lg">
              <div className="text-[#ff485c] text-4xl font-bold text-primary mb-2">4.8</div>
              <div className="text-white">Average Rating</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-20"
        initial={{opacity:0}}
        animate={{opacity:1 }}
        transition={{delay:.3, duration:0.8}}
        viewport={{ once: true }}

        >
          <h2 className="text-3xl font-bold mb-12 text-center text-[#ff485c] ">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center ">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 ">
                <BookOpen className=" w-8 h-8 text-primary " />
              </div>
              <h3 className="text-[#ff485c]  text-xl font-semibold mb-4">Curated Selection</h3>
              <p className="text-white">
                Every book in our collection is hand-picked for quality and
                impact
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className=" w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[#ff485c]  text-xl font-semibold mb-4">Community Focus</h3>
              <p className="text-white">
                Join a vibrant community of book lovers and participate in
                discussions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className=" w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[#ff485c]  text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-white">
                Quick and reliable shipping to get books into your hands faster
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className=" w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[#ff485c]  text-xl font-semibold mb-4">Customer Care</h3>
              <p className="text-white">
                Dedicated support team to ensure your satisfaction
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-20" 
        initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-12 text-center text-[#ff485c] ">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder & CEO",
                image:"../../public/img2.jpg",
              },
              {
                name: "Marcus Rodriguez",
                role: "Head of Curation",
                image:
                  "../../public/img3.jpg",
              },
              {
                name: "Emily Thompson",
                role: "Community Manager",
                image: "../../public/img1.png"
                  ,
              },
              {
                name: "Emily Thompson",
                role: "Community Manager",
                image: "../../public/img4.jpg"
                  ,
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-dark-lighter rounded-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover h-[22rem]"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
