import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

export default function About() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className=" bg-slate-800 text-white text-center py-12 rounded-2xl shadow-lg mb-10">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
          About <span className="text-yellow-300">Narendra Kumar</span>
        </h1>
        <p className="text-xl animate-fade-in-delayed">
          A passionate Full Stack Developer with expertise in building intuitive, responsive, and scalable applications.
        </p>
      </div>

      {/* About Description */}
      <div className="text-slate-700 space-y-6 text-lg mb-12">
        <p>
          Hi, I'm Narendra Kumar, the creator of <span className="font-semibold text-blue-600">NKEstate</span>, a fully functional full-stack real estate platform. 
          I specialize in both front-end and back-end technologies, delivering seamless and user-friendly solutions for property transactions.
        </p>
        <p>
          My toolkit includes <span className="font-semibold text-blue-600">React, Tailwind CSS, Node.js, Express.js, and MongoDB</span>. From crafting visually appealing and responsive interfaces to building secure, efficient backend architectures, I ensure every project is optimized for performance and scalability.
        </p>
        <p>
          Whether you're buying, selling, or renting properties, I am passionate about creating solutions that make these processes smooth and enjoyable for users.
        </p>
      </div>

      {/* Contact Section */}
      <div className="mb-12 bg-slate-100 p-6 sm:p-8 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
    Contact Information
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center text-lg text-slate-700">
    {/* Phone Contact */}
    <a
      href="tel:9875709813"
      className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:bg-blue-50 w-full max-w-xs"
    >
      <FaPhone className="text-blue-600 text-3xl" />
      <span className="text-slate-800 font-medium">9875709813</span>
    </a>
    {/* Email Contact */}
    <a
      href="mailto:jangidnarendra858@gmail.com"
      className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:bg-blue-50 w-full max-w-xs"
    >
      <FaEnvelope className="text-blue-600 text-3xl" />
      <span className="text-slate-800 font-medium">jangidnarendra858@gmail.com</span>
    </a>
  </div>
</div>


      {/* Social Media Links */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Connect with Me</h2>
        <div className="flex justify-center space-x-6 text-blue-600">
          <a href="https://www.instagram.com/username" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-800">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-800">
            <FaLinkedin />
          </a>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-800">
            <FaGithub />
          </a>
          <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-800">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Check Out My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Cards */}
          {[
            {
              title: "Portfolio Website",
              description: "A fully functional and Responsive  portfolio built with HTML, Tailwind CSS and  ReactJs.",
              link: "https://react-portfolio-eight-livid.vercel.app/",
            },
            {
              title: "Razorpay Clone",
              description: "A responsive clone of Razorpay, built using HTML, Tailwind CSS, and JavaScript.",
              link: "https://razor-pay-clone-git-master-narendra-kumars-projects-5942db58.vercel.app/",
            },
            {
              title: "News Portal",
              description: "A dynamic news platform with real-time updates via APIs.",
              link: "https://github.com/narendrakumar5264/Responsive-News-Portal.git",
            },
          ].map((project, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{project.title}</h3>
              <p className="text-slate-600 mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-slate-600 mt-16">
        <p className="text-lg">Interested in collaborating? Let’s build something amazing together!</p>
        <h3 className=" hover:text-blue-800 font-semibold">
          Contact Me
          </h3>
      </footer>
    </div>
  );
}
