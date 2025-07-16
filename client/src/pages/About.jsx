import React from "react";
import { FaSchool } from "react-icons/fa";
const About = () => {
  return (
    <div>
      <div className="max-w-[1440px] mx-auto py-5 mt-5">
        <div className="md:flex justify-around gap-3 py-20">
          <p className="text-md px-2 md:px-0 md:text-xl font-sans text-gray-700 line-clamp-6">
            Welcome to Junior School, where young minds begin their journey of
            discovery, creativity, and growth! We are a vibrant junior school
            dedicated to nurturing children from their earliest years through a
            safe, supportive, and inspiring environment. Our mission is to spark
            curiosity, build character, and lay the foundation for lifelong
            learning.
          </p>
          <p className="text-md px-2 md:px-0 md:text-xl font-sans text-gray-700 line-clamp-6">
            At Junior School, learning goes beyond the classroom walls. We
            believe in the power of play and exploration to fuel imagination and
            deepen understanding. Through engaging educational games, hands-on
            science experiments, and our annual Science and Engineering Fair,
            students are encouraged to think critically, solve problems
            creatively, and showcase their innovative ideas. Whether they're
            building simple machines, coding their first programs, or inventing
            new ways to recycle, our learners are constantly inspired to dream
            big and explore the world with curiosity and confidence. 
          </p>
        </div>
        <img
          src="https://c1.wallpaperflare.com/preview/372/574/461/boys-kids-children-happy.jpg"
          alt=""
          className=" rounded-md py-4 md:py-0 cursor-pointer"
        />
      </div>
      <div className="md:flex justify-between gap-3 items-center ml-10 md:ml-0 py-4 md:py-0">
        <div className="px-4 bg-amber-700 text-white w-[240px] h-[200px] rounded-2xl shadow-2xl hover:scale-105 hover:duration-300 cursor-pointer">
          <FaSchool size={60} className="ml-15 mt-2"/>
          <h1 className="text-center text-3xl font-bold cursor-pointer py-2 text-black">600+</h1>
          <h3 className="text-center text-xl cursor-pointer font-semibold">Students</h3>
        </div>
        <div className="px-4 bg-amber-700 text-white w-[240px] h-[200px] rounded-2xl shadow-2xl hover:scale-105 hover:duration-300 cursor-pointer">
          <FaSchool size={60} className="ml-15 mt-2" />
          <h1 className="text-center text-3xl font-bold cursor-pointer py-2 text-black">30+</h1>
         <h3 className="text-center text-xl cursor-pointer font-semibold">Teachers</h3>
        </div>
        <div className="px-4 bg-amber-700 text-white w-[240px] h-[200px] rounded-2xl shadow-2xl hover:scale-105 hover:duration-300 cursor-pointer">
          <FaSchool size={60} className="ml-15 mt-2"/>
          <h1 className="text-center text-3xl font-bold cursor-pointer py-2 text-black">20+</h1>
          <h3 className="text-center text-xl cursor-pointer font-semibold">Subjects</h3>
        </div>
        <div className="px-4 bg-amber-700 text-white w-[240px] h-[200px] rounded-2xl shadow-2xl hover:scale-105 hover:duration-300 cursor-pointer">
          <FaSchool size={60} className="ml-15 mt-2" />
          <h1 className="text-center text-3xl font-bold cursor-pointer py-2 text-black">10+</h1>
          <h3 className="text-center text-xl cursor-pointer font-semibold">Labs</h3>
        </div>
        <div className="px-4 bg-amber-700 text-white w-[240px] h-[200px] rounded-2xl shadow-2xl hover:scale-105 hover:duration-300 cursor-pointer">
          <FaSchool size={60} className="ml-15 mt-2" />
          <h1 className="text-center text-3xl font-bold cursor-pointer py-2 text-black">10+</h1>
          <h3 className="text-center text-xl cursor-pointer font-semibold">Alumni</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
