import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function About() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-slate-800 text-center mb-6">
        About <span className="text-blue-600">Narendra Kumar</span>
      </h1>
      <p className="text-slate-700 text-lg mb-8 text-center">
        A passionate Full Stack Developer with a focus on building intuitive and responsive real estate platforms.
      </p>

      {/* About Description */}
      <div className="text-slate-700 space-y-4 text-lg mb-10">
        <p>
          Hi, I'm Narendra Kumar, the creator of Sahand Estate, a fully functional full-stack real estate platform. With expertise in both front-end and back-end technologies, I aim to make property transactions seamless and accessible.
        </p>
        <p>
          I specialize in using <span className="font-semibold text-blue-600">React, Node.js, and Tailwind CSS</span> to build responsive, scalable applications. My focus is on creating clean, efficient, and user-friendly interfaces.
        </p>
        <p>
          Whether you're buying, selling, or renting properties, I believe in creating solutions that make the experience smooth and enjoyable.
        </p>
      </div>

      {/* Contact Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact Information</h2>
        <p className="text-slate-700 text-lg mb-2">
          <strong>Mobile:</strong> <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">+1 (234) 567-890</a>
        </p>
        <p className="text-slate-700 text-lg mb-2">
          <strong>Email:</strong> <a href="mailto:example@example.com" className="text-blue-600 hover:text-blue-800">example@example.com</a>
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Connect with Me</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/username" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-800">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-800">
            <FaLinkedin />
          </a>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-800">
            <FaGithub />
          </a>
          <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-800">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Projects Section */}
      <header className="py-6 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Projects</h1>
        <p className="text-sm font-light mt-2 text-slate-600">Explore some of my featured projects below.</p>
      </header>

      <section className="py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative p-5 rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-100 via-white to-blue-50 text-gray-800 hover:shadow-blue-300/50 hover:shadow-2xl"
              >
                <div className="relative h-40 mb-4 overflow-hidden rounded-lg group">
                  <img
                    src={project.logo}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                  />
                </div>
                <h2 className="text-lg font-bold text-center mb-2">{project.title}</h2>
                <p className="text-sm mb-3 text-center">{project.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium px-3 py-1 rounded-full text-gray-800 bg-gray-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center space-x-4">
                  <a
                    href={project.visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-lg text-sm font-medium shadow-md transform hover:scale-105 transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Preview
                  </a>
                  <a
                    href={project.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-lg text-sm font-medium shadow-md transform hover:scale-105 transition-all duration-300 bg-gray-700 hover:bg-gray-800 text-white"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: 'Responsive Portfolio',
    technologies: ['React', 'Tailwind CSS', 'Node.js'],
    description: 'A personal portfolio website showcasing projects, skills, and experiences. Designed with modern UI principles and responsive design.',
    logo: 'portfolio-logo-url',
    sourceLink: 'https://github.com/username/portfolio',
    visitLink: '/portfolio-demo',
  },
  {
    id: 2,
    title: 'Razor Pay Clone',
    technologies: ['JavaScript', 'HTML', 'Tailwind CSS'],
    description: 'The Razorpay Clone project is a replica of Razorpay, enabling secure online transactions through multiple payment methods.',
    logo: 'razorpay-logo-url',
    sourceLink: 'https://github.com/narendrakumar5264/Razor-Pay-Clone',
    visitLink: 'https://razorpay-clone.com',
  },
  // Add other projects as necessary
];
