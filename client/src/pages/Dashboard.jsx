import React, { useContext, useState } from "react";
import { Context } from "../Context.jsx";
import { Navigate } from "react-router-dom";
import D_Students from "../components/D_Students.jsx";
import D_Teachers from "../components/D_Teachers.jsx";
import D_Results from "../components/D_Results.jsx";
import D_Fees from "../components/D_Fees.jsx";
import D_Classes from "../components/D_Classes.jsx";
import D_Subjects from "../components/D_Subjects.jsx";
import D_Attendace from "../components/D_Attendace.jsx";

const Dashboard = () => {
  const { isAuth, user } = useContext(Context);
  const [components, setComponents] = useState("Profile");
  if (!isAuth || user?.role !== "Admin") {
    return <Navigate to="/profile" />;
  }
  //render all components
  const renderComponent = () => {
    switch (components) {
      case "Students":
        return <D_Students />;
      case "Teachers":
        return <D_Teachers />;
      case "Result":
        return <D_Results />;
      case "Fees":
        return <D_Fees />;
      case "Class":
        return <D_Classes />;
      case "Subjects":
        return <D_Subjects />;
      case "Attendance":
        return <D_Attendace />;
      case "Exams":
        return <D_Exams />;
      case "Profile":
        return <Profile />;
      default:
        return (
          <div className="text-center text-red-600 text-xl mt-10">
            <p>Components not found</p>
          </div>
        );
    }
  };
  return (
    <div>
      <Sidebar setComponents={setComponents} />
      <div>{renderComponent}</div>
    </div>
  );
};

export default Dashboard;
