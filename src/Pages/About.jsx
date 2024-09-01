import React from "react";

function About() {
  return (
    <>
      <div className="mainDiv">
        <div className="text-primary flex flex-col gap-4 gap-y-1 justify-start items-center min-h-screen text-[2rem] mt-20">
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-[1.5em] font-bold">
            Hi From About
          </h1>
          <h3 className="text-gray-600">
            I'm just a GEEK when it comes to coding 💻
          </h3>
        </div>
      </div>
    </>
  );
}

export default About;
