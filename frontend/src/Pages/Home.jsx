import { useState, useRef, useContext } from "react";
import { FaCloudUploadAlt, FaCheckCircle, FaBolt, FaUserTie, FaFilePdf, FaLock, FaRobot, FaChartLine, FaSearch, FaMagic, FaGraduationCap, FaBriefcase, FaStar, FaShieldAlt, FaDownload, FaPlay, FaUsers } from "react-icons/fa";
import axios from "axios";
import Loading from "../Components/Loading";
import { MainContext } from "../MainContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Silk from "../../ReactBits/Silk/Silk"

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

const floatingVariants = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

function EnhancedHome() {
    const [Loadingpage, SetLoding] = useState(false);
    const { ResumeData, SetResumeData, BackendUrl, User, notify } = useContext(MainContext);
    const Navigate = useNavigate();

    if (Loadingpage) return <Loading />;

    return (
        <div className="min-h-screen bg-resume-bg-primary relative overflow-hidden text-white">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0">

                <Silk
                    speed={7}
                    scale={2}
                    color="#0F211D"
                    noiseIntensity={1.2}
                    rotation={0}
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-resume-accent-primary/20 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            opacity: 0
                        }}
                        animate={{
                            y: [null, -100, (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 sm:py-12 lg:py-16">
                <motion.div
                    className="w-full max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Enhanced Hero Section */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12 lg:mb-20"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-6"
                        >
                            <span className="inline-block bg-resume-gradient-accent text-resume-text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-resume-glow">
                                🚀 AI-Powered Resume Analysis
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-resume-text-primary mb-6 tracking-tight leading-tight"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Is your resume ready to{" "}
                            <motion.span
                                className="bg-resume-gradient-primary bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{ backgroundSize: "200% 200%" }}
                            >
                                impress?
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl lg:text-2xl text-resume-text-secondary max-w-4xl mx-auto mb-8 leading-relaxed"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Our{" "}
                            <motion.span
                                className="text-red-400 font-bold"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                AI Resume Checker
                            </motion.span>{" "}
                            runs{" "}
                            <motion.span
                                className="text-resume-accent-primary font-bold"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                16 essential checks
                            </motion.span>{" "}
                            to make sure you stand out and land more interviews — instantly.
                        </motion.p>

                        {/* Stats Section */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto mb-12"
                            variants={containerVariants}
                        >
                            {[
                                { number: "50K+", label: "Resumes Analyzed", icon: FaUsers },
                                { number: "98%", label: "Accuracy Rate", icon: FaCheckCircle },
                                { number: "5s", label: "Analysis Time", icon: FaBolt },
                                { number: "16", label: "Quality Checks", icon: FaSearch }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-resume-bg-card/50 backdrop-blur-sm border border-resume-border-subtle rounded-xl p-4 sm:p-6 text-center"
                                >
                                    <stat.icon className="text-resume-accent-primary text-2xl sm:text-3xl mx-auto mb-2" />
                                    <div className="text-2xl sm:text-3xl font-bold text-resume-text-primary mb-1">{stat.number}</div>
                                    <div className="text-sm text-resume-text-muted">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={floatingVariants}
                            animate="animate"
                            className="flex justify-center mt-8"
                        >
                            <EnhancedAnimatedResumeSVG />
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Upload Section */}
                    <motion.div variants={itemVariants}>
                        <ResumeUpload
                            SetLoding={SetLoding}
                            SetResumeData={SetResumeData}
                            Navigate={Navigate}
                            User={User}
                            notify={notify}
                            BackendUrl={BackendUrl}
                        />
                    </motion.div>

                    {/* Enhanced Features Section */}
                    <motion.div variants={itemVariants}>
                        <EnhancedFeaturesSection />
                    </motion.div>

                    {/* What We Analyze Section */}
                    <motion.div variants={itemVariants}>
                        <WhatWeAnalyzeSection />
                    </motion.div>

                    {/* How It Works */}
                    <motion.div variants={itemVariants}>
                        <HowItWorks />
                    </motion.div>

                    {/* Success Stories */}
                    <motion.div variants={itemVariants}>
                        <SuccessStoriesSection />
                    </motion.div>

                    {/* Trust & Security */}
                    <motion.div variants={itemVariants}>
                        <TrustSection />
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div variants={itemVariants}>
                        <FAQSection />
                    </motion.div>

                    {/* Enhanced CTA */}
                    <motion.div variants={itemVariants}>
                        <CallToAction />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// Enhanced SVG Animation
const EnhancedAnimatedResumeSVG = () => (
    <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <svg width="240" height="160" viewBox="0 0 240 160" fill="none" className="drop-shadow-2xl">
            <motion.rect
                x="10"
                y="10"
                width="220"
                height="140"
                rx="20"
                fill="url(#resumeGradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
            />
            <motion.rect
                x="30"
                y="30"
                width="180"
                height="100"
                rx="10"
                fill="#ffffff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.rect
                x="50"
                y="50"
                width="140"
                height="12"
                rx="6"
                fill="#24CFA6"
                initial={{ width: 0 }}
                animate={{ width: 140 }}
                transition={{ delay: 0.6, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
            />
            <motion.rect
                x="50"
                y="70"
                width="100"
                height="10"
                rx="5"
                fill="#6366f1"
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
            />
            <motion.rect
                x="50"
                y="90"
                width="80"
                height="10"
                rx="5"
                fill="#a5b4fc"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
            />
            <motion.circle
                cx="190"
                cy="60"
                r="8"
                fill="#24CFA6"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
            />
            <defs>
                <linearGradient id="resumeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#24CFA6" />
                    <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
            </defs>
        </svg>
    </motion.div>
);

// Enhanced Upload Component
const ResumeUpload = ({ SetLoding, SetResumeData, Navigate, User, BackendUrl, notify }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analyzeButton, SetanalyzeButton] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
        SetanalyzeButton(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files[0] && files[0].type === "application/pdf") {
            setSelectedFile(files[0]);
            SetanalyzeButton(true);
        }
    };

    const AnalyzeHandler = (e) => {
        e.preventDefault();
        SetLoding(true);
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            axios.post(BackendUrl + "/resume", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })
                .then((success) => {
                    Navigate("/check-resume");
                    SetResumeData(success.data.result);
                    SetLoding(false);
                })
                .catch(() => SetLoding(false));
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-4xl mx-auto mb-16 lg:mb-24"
        >
            <motion.div
                className={`relative bg-resume-bg-card/70 backdrop-blur-sm border-2 border-dashed transition-all duration-300 rounded-2xl p-8 sm:p-12 text-center shadow-resume-card hover:shadow-resume-glow ${isDragOver
                    ? 'border-resume-accent-primary bg-resume-accent-primary/10'
                    : 'border-resume-border-subtle hover:border-resume-accent-primary/50'
                    }`}
                whileHover={{ scale: 1.02 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <motion.div
                    variants={pulseVariants}
                    animate="animate"
                    className="mb-6"
                >
                    <FaCloudUploadAlt size={64} className="text-resume-accent-tertiary mx-auto mb-4" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-bold text-resume-text-primary mb-2 uppercase tracking-wide">
                    Upload Your Resume
                </h3>
                <p className="text-resume-text-secondary text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                    Drag & drop your PDF file here, or click to browse.
                    Get instant AI analysis in seconds!
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />

                <div className="space-y-4">
                    {analyzeButton ? (
                        <motion.button
                            onClick={(e) => User ? AnalyzeHandler(e) : notify("Please login first!", "warning")}
                            className="bg-resume-gradient-primary text-resume-text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-resume-glow transition-all duration-300 text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <FaPlay className="inline mr-2" />
                            Analyze My Resume
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-resume-gradient-secondary text-resume-text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-resume-glow transition-all duration-300 text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaCloudUploadAlt className="inline mr-2" />
                            Choose PDF File
                        </motion.button>
                    )}

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-resume-text-muted">
                        <span className="flex items-center">
                            <FaFilePdf className="text-red-400 mr-1" />
                            PDF Only
                        </span>
                        <span className="flex items-center">
                            <FaShieldAlt className="text-green-400 mr-1" />
                            Max 5MB
                        </span>
                        <span className="flex items-center">
                            <FaLock className="text-blue-400 mr-1" />
                            100% Secure
                        </span>
                    </div>
                </div>

                {selectedFile && (
                    <motion.div
                        className="mt-6 flex items-center justify-center bg-resume-text-primary/10 rounded-xl px-4 py-3 max-w-md mx-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FaFilePdf className="text-red-400 mr-3 text-xl" />
                        <div className="flex-1 text-left">
                            <div className="text-resume-text-primary font-medium truncate">{selectedFile.name}</div>
                            <div className="text-resume-text-muted text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                        <FaCheckCircle className="text-green-400 ml-3 text-xl" />
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
};

// Enhanced Features Section
const EnhancedFeaturesSection = () => {
    const features = [
        {
            icon: FaCheckCircle,
            title: "16 Crucial Checks",
            desc: "Comprehensive analysis covering formatting, keywords, content structure, and ATS optimization.",
            color: "text-green-400",
            bgColor: "bg-green-400/10"
        },
        {
            icon: FaBolt,
            title: "Lightning Fast",
            desc: "Get detailed feedback and actionable recommendations in under 5 seconds.",
            color: "text-orange-400",
            bgColor: "bg-orange-400/10"
        },
        {
            icon: FaRobot,
            title: "AI Powered",
            desc: "Advanced machine learning algorithms trained on thousands of successful resumes.",
            color: "text-purple-400",
            bgColor: "bg-purple-400/10"
        },
        {
            icon: FaShieldAlt,
            title: "100% Secure",
            desc: "Your data is encrypted and never stored. Complete privacy guaranteed.",
            color: "text-blue-400",
            bgColor: "bg-blue-400/10"
        },
        {
            icon: FaMagic,
            title: "Smart Suggestions",
            desc: "Get personalized recommendations to improve your resume's impact.",
            color: "text-pink-400",
            bgColor: "bg-pink-400/10"
        },
        {
            icon: FaChartLine,
            title: "Success Tracking",
            desc: "Monitor your resume's performance and track improvements over time.",
            color: "text-cyan-400",
            bgColor: "bg-cyan-400/10"
        }
    ];

    return (
        <section className="py-16 lg:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-resume-accent-primary mb-6">
                    Why Choose Our Resume Checker?
                </h2>
                <p className="text-xl text-resume-text-secondary max-w-3xl mx-auto">
                    Join thousands of professionals who've boosted their career prospects with our AI-powered analysis.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        className="group bg-resume-bg-card/70 backdrop-blur-sm border border-resume-border-subtle rounded-2xl p-6 lg:p-8 shadow-resume-card hover:shadow-resume-glow transition-all duration-300"
                    >
                        <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`${feature.color} text-2xl`} />
                        </div>
                        <h3 className="text-xl font-bold text-resume-text-primary mb-3 group-hover:text-resume-accent-primary transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-resume-text-secondary leading-relaxed">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// What We Analyze Section
const WhatWeAnalyzeSection = () => {
    const analysisPoints = [
        { category: "Format & Design", points: ["ATS Compatibility", "Visual Layout", "Font Consistency", "Section Organization"] },
        { category: "Content Quality", points: ["Keyword Optimization", "Action Verbs Usage", "Quantifiable Results", "Skill Relevance"] },
        { category: "Professional Standards", points: ["Grammar & Spelling", "Professional Language", "Industry Standards", "Contact Information"] },
        { category: "Career Impact", points: ["Achievement Highlighting", "Career Progression", "Skills Assessment", "Market Alignment"] }
    ];

    return (
        <section className="py-16 lg:py-24 bg-resume-bg-secondary/50 rounded-3xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-resume-text-primary mb-6">
                    What We Analyze
                </h2>
                <p className="text-xl text-resume-text-secondary max-w-3xl mx-auto">
                    Our AI examines every aspect of your resume to ensure maximum impact and ATS compatibility.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {analysisPoints.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-resume-bg-card border border-resume-border-subtle rounded-2xl p-6 hover:shadow-resume-glow transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-resume-accent-primary mb-4">
                            {category.category}
                        </h3>
                        <ul className="space-y-3">
                            {category.points.map((point, pointIndex) => (
                                <motion.li
                                    key={pointIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index * 0.1) + (pointIndex * 0.05) }}
                                    className="flex items-center text-resume-text-secondary"
                                >
                                    <FaCheckCircle className="text-resume-accent-primary mr-3 flex-shrink-0" />
                                    {point}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Enhanced How It Works Section
const HowItWorks = () => {
    const steps = [
        {
            step: "1",
            title: "Upload Your Resume",
            description: "Simply drag and drop your PDF resume or click to browse and select your file.",
            icon: FaCloudUploadAlt,
            color: "text-blue-400"
        },
        {
            step: "2",
            title: "AI Analysis Begins",
            description: "Our advanced AI algorithms analyze your resume across 16 key factors in seconds.",
            icon: FaRobot,
            color: "text-purple-400"
        },
        {
            step: "3",
            title: "Get Detailed Report",
            description: "Receive instant feedback with your score and comprehensive improvement suggestions.",
            icon: FaChartLine,
            color: "text-green-400"
        },
        {
            step: "4",
            title: "Improve & Succeed",
            description: "Apply our recommendations and watch your interview opportunities multiply.",
            icon: FaStar,
            color: "text-yellow-400"
        }
    ];

    return (
        <section className="py-16 lg:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-resume-accent-primary mb-6">
                    How It Works
                </h2>
                <p className="text-xl text-resume-text-secondary max-w-3xl mx-auto">
                    Get professional resume feedback in just 4 simple steps.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative text-center"
                        >
                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-resume-accent-primary/30 transform -translate-y-1/2 z-0"></div>
                            )}

                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-resume-gradient-primary flex items-center justify-center text-2xl font-bold text-resume-text-primary shadow-resume-glow`}
                            >
                                {step.step}
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-resume-bg-card border border-resume-border-subtle rounded-2xl p-6 hover:shadow-resume-glow transition-all duration-300"
                            >
                                <step.icon className={`${step.color} text-3xl mx-auto mb-4`} />
                                <h3 className="text-xl font-bold text-resume-text-primary mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-resume-text-secondary">
                                    {step.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Success Stories Section
const SuccessStoriesSection = () => {
    const stories = [
        {
            name: "Sarah Johnson",
            role: "Marketing Manager",
            company: "Tech Corp",
            improvement: "87% → 94%",
            quote: "The AI suggestions helped me land 3 interviews in one week!",
            avatar: "SJ"
        },
        {
            name: "Michael Chen",
            role: "Software Engineer",
            company: "StartupXYZ",
            improvement: "72% → 91%",
            quote: "Amazing insights that I never would have thought of myself.",
            avatar: "MC"
        },
        {
            name: "Emily Rodriguez",
            role: "Project Manager",
            company: "Fortune 500",
            improvement: "69% → 96%",
            quote: "Finally got past ATS filters and landed my dream job!",
            avatar: "ER"
        }
    ];

    return (
        <section className="py-16 lg:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-resume-text-primary mb-6">
                    Success Stories
                </h2>
                <p className="text-xl text-resume-text-secondary max-w-3xl mx-auto">
                    See how our AI-powered analysis helped professionals like you boost their resume scores and land better opportunities.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {stories.map((story, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="bg-resume-bg-card border border-resume-border-subtle rounded-2xl p-6 hover:shadow-resume-glow transition-all duration-300"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-resume-gradient-primary flex items-center justify-center text-resume-text-primary font-bold mr-4">
                                {story.avatar}
                            </div>
                            <div>
                                <h4 className="text-resume-text-primary font-bold">{story.name}</h4>
                                <p className="text-resume-text-muted text-sm">{story.role} at {story.company}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="text-2xl font-bold text-resume-accent-primary">{story.improvement}</div>
                            <div className="text-resume-text-muted text-sm">Resume Score Improvement</div>
                        </div>

                        <blockquote className="text-resume-text-secondary italic">
                            "{story.quote}"
                        </blockquote>

                        <div className="flex text-yellow-400 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Enhanced Trust Section
const TrustSection = () => {
    const trustFeatures = [
        {
            icon: FaLock,
            title: "Secure & Private",
            description: "End-to-end encryption with zero data retention policy",
            color: "text-green-400"
        },
        {
            icon: FaRobot,
            title: "Advanced AI",
            description: "Powered by cutting-edge machine learning algorithms",
            color: "text-purple-400"
        },
        {
            icon: FaChartLine,
            title: "Data-Driven",
            description: "Insights based on analysis of 100K+ successful resumes",
            color: "text-blue-400"
        },
        {
            icon: FaUsers,
            title: "Trusted by 50K+",
            description: "Join thousands of professionals who've improved their careers",
            color: "text-orange-400"
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-resume-bg-secondary/50 rounded-3xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-resume-text-primary mb-6">
                    Trusted by Professionals Worldwide
                </h2>
                <p className="text-xl text-resume-text-secondary max-w-3xl mx-auto">
                    Your privacy and success are our top priorities. Here's why thousands trust us with their career advancement.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {trustFeatures.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center group"
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`w-20 h-20 mx-auto mb-6 rounded-full bg-resume-bg-card border-2 border-resume-border-subtle flex items-center justify-center group-hover:border-resume-accent-primary transition-all duration-300`}
                        >
                            <feature.icon className={`${feature.color} text-3xl`} />
                        </motion.div>
                        <h3 className="text-xl font-bold text-resume-text-primary mb-3 group-hover:text-resume-accent-primary transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-resume-text-secondary">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// FAQ Section
const FAQSection = () => {
    const faqs = [
        {
            question: "How accurate is the AI analysis?",
            answer: "Our AI has been trained on over 100,000 successful resumes and maintains a 98% accuracy rate in identifying improvement areas."
        },
        {
            question: "Is my resume data secure?",
            answer: "Absolutely. We use end-to-end encryption and have a zero data retention policy. Your resume is analyzed and immediately deleted from our servers."
        },
        {
            question: "What file formats do you support?",
            answer: "Currently, we only support PDF files up to 5MB in size. This ensures the best analysis quality and maintains formatting integrity."
        },
        {
            question: "How long does the analysis take?",
            answer: "Our AI analysis typically completes in under 5 seconds, providing you with instant feedback and actionable recommendations."
        },
        {
            question: "Can I analyze multiple resumes?",
            answer: "Yes! You can analyze as many resumes as you need. We recommend testing different versions to see which performs best."
        },
        {
            question: "Do you offer ATS compatibility checking?",
            answer: "Yes, ATS compatibility is one of our 16 core analysis points. We ensure your resume can pass through applicant tracking systems effectively."
        }
    ];

    return (
        <section className="py-16 lg:py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-resume-text-primary mb-6">
                    Frequently Asked Questions
                </h2>
                <p className="text-xl text-resume-text-secondary max-w-3xl mx-auto">
                    Get answers to the most common questions about our AI resume analysis service.
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-resume-bg-card border border-resume-border-subtle rounded-2xl p-6 hover:shadow-resume-glow transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-resume-text-primary mb-3">
                            {faq.question}
                        </h3>
                        <p className="text-resume-text-secondary leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Enhanced CTA Section
const CallToAction = () => (
    <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 lg:py-24 text-center"
    >
        <motion.div
            className="bg-resume-gradient-accent rounded-3xl p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto shadow-resume-glow"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <motion.h2
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-resume-text-primary mb-6"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                Ready to Transform Your Career?
            </motion.h2>

            <motion.p
                className="text-xl lg:text-2xl text-resume-text-primary/90 mb-10 max-w-3xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                Join 50,000+ professionals who've boosted their resume scores and landed better opportunities.
                Get your instant AI analysis now!
            </motion.p>

            <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                <motion.a
                    href="#"
                    className="bg-resume-text-primary text-resume-bg-primary px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaPlay className="mr-2" />
                    Start Free Analysis
                </motion.a>

                <motion.a
                    href="#"
                    className="border-2 border-resume-text-primary text-resume-text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-resume-text-primary hover:text-resume-bg-primary transition-all duration-300 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaDownload className="mr-2" />
                    View Sample Report
                </motion.a>
            </motion.div>

            <motion.div
                className="mt-8 flex flex-wrap justify-center gap-6 text-resume-text-primary/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
            >
                <span className="flex items-center">
                    <FaCheckCircle className="mr-2" />
                    100% Free
                </span>
                <span className="flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Instant Results
                </span>
                <span className="flex items-center">
                    <FaCheckCircle className="mr-2" />
                    No Sign-up Required
                </span>
            </motion.div>
        </motion.div>
    </motion.section>
);

export default EnhancedHome;
