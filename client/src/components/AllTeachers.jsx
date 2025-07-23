import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context.jsx";
import API from "../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import Slider from "react-slick";

function AllTeachers() {
 const [teacher, setTeacher] = useState([]);
  const { user } = useContext(Context);

  const fetchTeachers = async () => {
    try {
      const { data } = await API.get("/api/v1/teacher/get-teachers", {
        withCredentials: true,
      });
      setTeacher(data.teachers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="bg-gradient-to-tr from-blue-50 to-purple-200 py-10">
      <div className="max-w-[1440px] mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">
          Meet Our Teachers
        </h1>

        {teacher && teacher.length > 0 ? (
          <Slider {...settings}>
            {teacher.map((teacher) => (
              <div key={teacher._id} className="px-4">
                <div
                  className="bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105
                duration-300 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={user?.avatar?.url}
                      alt="Teacher avatar"
                      className="w-16 h-16 rounded-full border-2 border-indigo-400 object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-indigo-700">
                        {teacher?.userId?.name ||"Teacher Name"}
                      </h2>
                      <p className="text-sm text-gray-600 capitalize">
                       Subject: {teacher?.subject}
                      </p>
                      <p>Department:<span>{teacher?.department}</span></p>
                    </div>
                  </div>
               
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-lg text-red-600 mt-8">
            🪙No Teacher Found
          </p>
        )}
      </div>
    </div>
  );
};
export default AllTeachers