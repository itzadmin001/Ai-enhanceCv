// components/Footer.jsx

import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="  bg-black  text-white px-6 py-10">
            {/* Top section: Description + Start button */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                {/* Left: AI Resume Info */}
                <div className="text-center md:text-left max-w-md">
                    <h2 className="text-xl font-semibold mb-3 text-[#24CFA6]">AI Resume Enhancer</h2>
                    <p className="text-sm text-gray-100">
                        Enhance your resume with AI-powered suggestions tailored to your field, skills, achievements, and job roles.
                    </p>
                </div>

                {/* Right: Start Button */}
                <div>
                    <Link
                        onClick={scrollToTop}
                        className="bg-[#24CFA6] hover:bg-[#24cfa7dd] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 cursor-pointer"
                    >
                        🚀 Start
                    </Link>
                </div>
            </div>

            {/* Bottom section: Social icons */}
            <div className="mt-10 text-center space-x-6">
                <Link
                    to="https://www.instagram.com/itz__admin__01"
                    target="_blank"
                    className="inline-block hover:text-[#24CFA6] transition-colors"
                >
                    <FaInstagram size={24} />
                </Link>
                <Link
                    to="https://www.linkedin.com/in/yogesh-kumar-558b4b26b/"
                    target="_blank"
                    className="inline-block hover:text-blue-400 transition-colors"
                >
                    <FaLinkedin size={24} />
                </Link>
                <Link
                    to="https://github.com/itzadmin001"
                    target="_blank"
                    className="inline-block hover:text-gray-400 transition-colors"
                >
                    <FaGithub size={24} />
                </Link>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-center text-sm text-gray-100">
                © {new Date().getFullYear()} Yogesh | All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
