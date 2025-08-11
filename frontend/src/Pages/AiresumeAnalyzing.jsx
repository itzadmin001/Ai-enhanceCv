import React, { useContext, useEffect, useState } from 'react';
import { FaFilePdf, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaUserTie, FaChartPie, FaBrain, FaTrophy, FaBriefcase, FaRocket, FaLightbulb, FaTag } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { MdWarning, MdCheckCircle, MdError } from 'react-icons/md';
import LoadingPage from '../Components/Loading';
import { MainContext } from '../MainContext';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';


function AiresumeAnalyzing() {
    const [Loading, SetLoading] = useState(true);
    const { ResumeData, User, notify } = useContext(MainContext);
    const Navigate = useNavigate()

    useEffect(() => {
        if (ResumeData != null) {
            SetLoading(false);
        }
    }, [ResumeData]);

    useEffect(() => {
        if (!User) {
            Navigate("/")
        }
    }, [User])



    if (Loading) return <LoadingPage />;

    const { matchScore, detectedJobs, skills, achievements, experience, projects, feedback } = ResumeData;

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row gap-8 p-6 md:p-12 ">
            {/* Left: Resume + Score */}
            <div className="bg-[#0C0C0C] rounded-2xl shadow-lg px-6 py-20 w-full md:w-1/3 flex flex-col items-center">
                <div className="w-full flex flex-col items-center">
                    {/* PDF Preview Placeholder */}
                    <div className="w-40 h-56  bg-[#1b1717d0] rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                        <FaFilePdf className="text-[#24CFA6] text-7xl animate-bounce" />
                        <span className="absolute bottom-2 right-2 text-xs text-slate-400">PDF</span>
                    </div>
                    {/* Score */}
                    <div className="text-center mb-4">
                        <div className="text-slate-500 text-lg font-medium">{matchScore}</div>
                        <div className="text-4xl font-extrabold text-orange-600 animate-pulse"><span>{matchScore}</span>/100</div>
                        <div className="text-slate-400 text-sm">{feedback?.length} Issues</div>
                    </div>
                    {/* Issue Breakdown */}
                    <div className="w-full mt-4">
                        <div className="font-semibold text-slate-700 mb-2">CONTENT <span className="ml-2 text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">{matchScore}%</span></div>
                        <ul>
                            {feedback?.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 mb-1 text-sm">
                                    {item.type === 'error' && <MdError className="text-red-500" />}
                                    {item.type === 'warning' && <MdWarning className="text-yellow-500" />}
                                    {item.type === 'info' && <FaInfoCircle className="text-blue-500" />}
                                    <span className={
                                        item.type === 'error' ? 'text-red-500' :
                                            item.type === 'warning' ? 'text-yellow-600' :
                                                'text-blue-600'
                                    }>
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        {/* Unlock Button */}
                        <button className="mt-6 w-full bg-[#24CFA6]  hover:bg-[#24CFA6] text-white cursor-pointer font-semibold py-2 rounded-lg transition shadow flex items-center justify-center gap-2">
                            Unlock Full Report <FaRocket />
                        </button>
                    </div>
                </div>
            </div>
            {/* Right: Details */}
            <div className="flex-1 flex flex-col gap-6 py-10">
                {/* Detected Fields */}
                <div className="bg-[#0C0C0C] not-[]: rounded-xl shadow p-5 flex flex-wrap gap-4 items-center">
                    <span className="font-semibold text-slate-100 flex items-center gap-2">
                        <FaUserTie className="text-indigo-500" /> Detected Job Field
                    </span>
                    {detectedJobs?.map((f, i) => (
                        <span key={i} className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {f}
                        </span>
                    ))}
                </div>
                {/* Match Score */}
                <div className="bg-[#0C0C0C] rounded-xl shadow p-5 flex items-center gap-6">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="absolute top-0 left-0" width="80" height="80">
                            <circle
                                cx="40" cy="40" r="34"
                                stroke="#e5e7eb" strokeWidth="8" fill="none"

                            />
                            <circle
                                cx="40" cy="40" r="34"
                                stroke="#6366f1" strokeWidth="8" fill="none"
                                strokeDasharray={2 * Math.PI * 34}
                                strokeDashoffset={2 * Math.PI * 34 * (1 - matchScore / 100)}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 1s' }}

                            />
                        </svg>
                        <span className="text-2xl font-bold text-indigo-600 animate-pulse">{matchScore}%</span>
                    </div>
                    <div>
                        <div className="font-semibold text-slate-100 flex items-center gap-2">
                            <FaChartPie className="text-indigo-500" />  Match Score
                        </div>
                        <div className="text-slate-300 text-sm">How well your resume matches the job</div>
                    </div>
                </div>
                {/* Skills */}
                <div className="bg-[#0C0C0C] rounded-xl shadow p-5">
                    <div className="font-semibold text-slate-100 flex items-center gap-2 mb-2">
                        <FaBrain className="text-indigo-500" /> Skills Extracted
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills?.map((skill, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm animate-pulse">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Achievements */}
                <div className="bg-[#0C0C0C] rounded-xl shadow p-5">
                    <div className="font-semibold text-slate-100 flex items-center gap-2 mb-2">
                        <FaTrophy className="text-yellow-500" /> Achievements
                    </div>
                    <ul className="list-disc list-inside text-slate-100">
                        {achievements?.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </div>
                {/* Experience */}
                <div className="bg-[#0C0C0C] rounded-xl shadow p-5">
                    <div className="font-semibold text-slate-100 flex items-center gap-2 mb-2">
                        <FaBriefcase className="text-indigo-500" /> Experience Summary
                    </div>
                    <div className="flex flex-col gap-2">
                        {experience && (
                            <div className="flex items-start gap-2">
                                <span className="text-sm text-slate-100">{experience}</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Projects */}
                <div className="bg-[#0C0C0C] rounded-xl shadow p-5">
                    <div className="font-semibold text-slate-100 flex items-center gap-2 mb-2">
                        <FaRocket className="text-pink-500" /> Projects
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {projects?.map((proj, i) => (
                            <div key={i} className="bg-pink-50 rounded-lg p-3 shadow flex flex-col min-w-[140px]">
                                <span className="font-semibold text-pink-700">{proj.title}</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {proj.stack?.map((tech, j) => (
                                        <span key={j} className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Feedback & Suggestions */}
                <div className="flex flex-col gap-3">
                    {feedback?.map((fb, i) => (
                        <div key={i} className={
                            "rounded-lg px-4 py-3 flex items-center gap-2 shadow " +
                            (fb.type === 'warning' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700')
                        }>
                            {fb.type === 'warning' ? <MdWarning className="text-yellow-500" /> : <FaInfoCircle className="text-blue-500" />}
                            <span>{fb}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AiresumeAnalyzing;
