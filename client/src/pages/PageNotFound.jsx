// import React from "react";
// import { Link } from "react-router-dom";

// const PageNotFound = () => {
//   return (
//     <div className="mt-10">
//       <div className="flex flex-col min-h-screen bg-sky-200">
//         <div className="flex flex-1 items-center justify-center bg-slate-300-p-4">
//           <div className="w-full max-w-[290px] md:w-[450px] lg:max-w-500px] bg-white shadow-2xl rounded-lg p-6">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold font-serif">
//             That Page <span className="text-red-600">Is Not Found</span>
//           </h1 >
//           <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold mt-4 py-4">
//             4<span>0</span>4
//           </h1>
//           <p>
//             The link You clicked may be broken or the page has been removed. Try
//             again
//           </p>
//           <Link to={"/"}>Home Page</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageNotFound;
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-col min-h-screen bg-sky-200">
        <div className="flex flex-1 items-center justify-center bg-slate-300 p-4">
          <div className="w-full max-w-[290px] md:w-[450px] lg:max-w-[500px] bg-white shadow-2xl rounded-lg p-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif">
              That Page <span className="text-red-600">Is Not Found</span>
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 py-4">
              4<span className="text-red-600">0</span>4
            </h2>
            <p className="text-md md:text-lg mb-4">
              The link you clicked may be broken or the page has been removed.
              Try again or go back to the homepage.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
