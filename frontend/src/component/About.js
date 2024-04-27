import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 p-8">
  <div className="flex items-center justify-between">
    <img
      src="https://img.freepik.com/premium-photo/man-working-laptop-spices-screen_771335-28192.jpg"
      alt="image"
      className="w-1/2 object-cover rounded-lg"
    />
    <div className="w-1/2 pl-8">
      <h1 className="text-orange-500 text-3xl">ABOUT US</h1>
      <p className="text-black text-base mt-4 font-verdana">
        Creating a blog website at the college level can be an exciting and rewarding, allowing you to showcase your thoughts and expertise on subjects that matter to you. Our website facilitates interprofessional activities for students. This networking can lead to valuable connections, mentorship, and collaborative opportunities. Opportunity for cost efficiencies, including resource sharing and the need for fewer faculty members.
      </p>
    </div>
  </div>
</div>

  );
};

export default About;
