import React from "react";
import { FaBook,FaBasketballBall,FaDesktop } from "react-icons/fa";

const services = [
  {
    title: "Library Access",
    description: "A well equiped library with books",
    icon: <FaBook />,
  },
  {
    title: "Computer Lab",
    description: "Modern computer lab with internet",
    icon: <FaDesktop />,
  },
  {
    title: "Sports",
    description: " Wide range of sport.They include:volley ball, soccer, handball,table tennis, athletics",
    icon: <FaBasketballBall />,
  },
];
const Services = () => {
  return <div className="pt-20 pb-16 bg-gray-200">
    <div className="max-w-[1440px] mx-auto py-5">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-4">Our Services</h2>
      <p>We offer a range of services</p>
    </div>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service,index)=>(
        <div key={index} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-105 duration-150">
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
          <p className="text-gray-600 text-md md:text-lg">{service.description}</p>
        </div>
      ))}
    </div>
  </div>;
};

export default Services;
