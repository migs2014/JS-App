import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context.jsx";
import API from "../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import Slider from "react-slick";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const { user } = useContext(Context);

  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/api/v1/student/get-all-students", {
        withCredentials: true,
      });
      setStudents(data.student);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchStudents();
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
          🧑‍🎓Best Students
        </h1>

        {students.length > 0 ? (
          <Slider {...settings}>
            {students.map((student) => (
              <div key={student._id} className="px-4">
                <div
                  className="bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105
                duration-300 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={student?.userId?.avatar?.url || user?.avatar?.url}
                      alt="student avatar"
                      className="w-16 h-16 rounded-full border-2 border-indigo-400 object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-indigo-700">
                        {student?.userId?.name}
                      </h2>
                      <p className="text-sm text-gray-600 capitalize">
                        {student?.userId?.gender}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>🧓Gender: {student?.userId?.gender}</p>
                    <p>🏛️Class: {student?.classId?.name}</p>
                    <p>🗞️Roll No: {student?.rollNumber}</p>
                    <p>📅Admission: {student?.admissionDate}</p>
                    <p>📝Guardian Name: {student?.guardianInfo?.name}</p>
                    <p>📞Guardian Phone: {student?.guardianInfo?.phone}</p>
                    <p>
                      🔗Guardian Relation: {student?.guardianInfo?.relation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-lg text-red-600 mt-8">
            🪙No Students Found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllStudent;
