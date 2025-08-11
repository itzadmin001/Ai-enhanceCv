import { useState, useRef, useContext, useEffect } from "react";
import { FaCloudUploadAlt, FaCheckCircle, FaBolt, FaUserTie, FaFilePdf } from "react-icons/fa";
import axios from "axios"
import Loading from "../Components/Loading";
import { MainContext } from "../MainContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const [Loadingpage, SetLoding] = useState(false)
    const { ResumeData, SetResumeData, User, notify } = useContext(MainContext)
    const Navigate = useNavigate()



    if (Loadingpage) return <Loading />;


    return (
        <div className="min-h-screen  bg-black flex items-center justify-center px-8 py-20">
            <div className="w-full max-w-3xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-4 tracking-tight">
                        Is your resume good enough?
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-6">
                        A free and fast <b className="text-red-300">AI resume checker</b> doing <b className="text-[#24CFA6]">16 crucial checks</b> to ensure your resume is ready to perform and get you interview callbacks.
                    </p>
                    <div className="flex justify-center mb-4">
                        <AnimatedResumeSVG />
                    </div>
                </div>
                <ResumeUpload SetLoding={SetLoding} SetResumeData={SetResumeData} Navigate={Navigate} User={User} notify={notify} />
                <AboutSection />
            </div>
        </div>
    );
}

// Animated SVG for visual appeal
const AnimatedResumeSVG = () => (
    <svg width="200" height="120" viewBox="0 0 220 140" fill="none">
        <rect x="10" y="10" width="200" height="120" rx="20" fill="#24CFA6" />
        <rect x="30" y="30" width="160" height="80" rx="10" fill="#fff" />
        <rect x="50" y="50" width="120" height="12" rx="6" fill="#6366f1">
            <animate attributeName="width" values="120;140;120" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="50" y="70" width="90" height="10" rx="5" fill="#60a5fa">
            <animate attributeName="width" values="90;10;90" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="50" y="90" width="60" height="10" rx="5" fill="#a5b4fc">
            <animate attributeName="width" values="60;100;60" dur="2s" repeatCount="indefinite" />
        </rect>
    </svg>
);





const ResumeUpload = ({ SetLoding, SetResumeData, Navigate, User, notify }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analyzeButton, SetanalyzeButton] = useState(false)
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
        SetanalyzeButton(true)
    };
    const AnalyzeHandler = (e) => {
        e.preventDefault()
        SetLoding(true)
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            axios.post('http://localhost:3000/resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
                withCredentials: true
            }).then((success) => {
                console.log(success)
                Navigate("/check-resume")
                SetResumeData(success.data.result)
                SetLoding(false)
            }).catch((err) => {
                console.log(err)
                SetLoding(false)
            })
        }
    }




    return (
        <section className="w-full bg-[#0C0C0C] rounded-xl shadow-sm  p-8 mb-10 flex flex-col items-center duration-500 hover:shadow-[0_0_15px_2px_rgba(36,207,166,0.6),0_0_30px_10px_rgba(36,207,166,0.3)] ">
            <FaCloudUploadAlt size={48} className="text-indigo-500 mb-2" />
            <h3 className="text-xl font-semibold text-slate-100 mb-1 uppercase">Upload your resume</h3>
            <p className="text-slate-300 text-sm mb-4">
                Only PDF files are supported. Max size: 5MB.
            </p>
            <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            {
                analyzeButton === true ? <button
                    onClick={(e) => {
                        if (User) {
                            AnalyzeHandler(e);
                        } else {
                            notify("Please login first!", "warning")
                        }
                    }}

                    className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow hover:scale-105 transition mb-2"
                >
                    Analyze PDF File
                </button> : <button
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="bg-gradient-to-r cursor-pointer from-indigo-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow hover:scale-105 transition mb-2"
                >
                    Choose PDF File
                </button>
            }

            <div className="text-red-300 text-xs mb-2">
                Note: User can upload file only in <b>.pdf</b> format.
            </div>
            {selectedFile && (
                <div className="mt-2 flex items-center bg-slate-100 rounded px-3 py-2 ">
                    <FaFilePdf className="text-red-500 mr-2" />
                    <span className="text-slate-700 font-medium">{selectedFile.name}</span>
                </div>
            )}
        </section>
    );
}; 1

// About section with icons and details
const AboutSection = () => {
    const aboutChecks = [
        {
            icon: <FaCheckCircle className="text-green-500" size={22} />,
            title: "16 Crucial Checks",
            desc: "From formatting to keywords, we analyze all important aspects."
        },
        {
            icon: <FaBolt className="text-orange-400" size={22} />,
            title: "Lightning Fast",
            desc: "Get instant feedback on your resume in seconds."
        },
        {
            icon: <FaUserTie className="text-indigo-500" size={22} />,
            title: "AI Powered",
            desc: "Advanced AI ensures your resume stands out to recruiters."
        },
        {
            icon: <FaFilePdf className="text-red-500" size={22} />,
            title: "PDF Only",
            desc: "Your data is safe. We only accept PDF files."
        }
    ];

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold text-[#24CFA6] mb-4 text-center">
                Why use our Resume Checker?
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
                {aboutChecks.map((item, idx) => (
                    <div key={idx} className="bg-[#0C0C0C] rounded-lg shadow p-5 w-72 flex gap-3 items-start hover:shadow-[0_0_15px_2px_rgba(36,207,166,0.6),0_0_30px_10px_rgba(36,207,166,0.3)] duration-300">
                        <div>{item.icon}</div>
                        <div>
                            <div className="font-semibold text-white uppercase">{item.title}</div>
                            <div className="text-slate-300 text-sm mt-2">{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-10 text-slate-100 text-sm max-w-lg mx-auto text-center">
                <h3 className="text-[#24CFA6] font-semibold mb-2">How it works?</h3>
                <ul className="text-left list-disc list-inside mx-auto max-w-full text-xl">
                    <li>1. Upload your resume in PDF format.</li>
                    <li>2. Our AI analyzes your resume for 16 key factors.</li>
                    <li>3. Get instant feedback and actionable tips.</li>
                    <li>4. Improve your resume and boost your interview chances!</li>
                </ul>
            </div>
        </section>
    );
};

export default Home;
