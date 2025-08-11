import axios from "axios"
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../MainContext";

function SignUp() {
    const [form, setForm] = useState({ email: '', username: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { User, SetUser, notify } = useContext(MainContext)
    const Navigate = useNavigate()


    useEffect(() => {
        if (User) {
            Navigate("/")
        }
    }, [User])




    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const initialFormState = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Password not be match")
        } else {
            axios.post("http://localhost:3000/user/register", form, {
                withCredentials: true
            })
                .then((success) => {
                    if (success.status == 201) {
                        SetUser(success.data.user)
                        notify(success.data.msg, "success")
                        Navigate("/")
                    }
                    setForm(initialFormState)
                }).catch((err) => {
                    console.log(err)
                    setForm(initialFormState)
                })
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-black md:p-0 px-4">
            <div className="bg-[#0C0C0C] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-slate-50 text-center mb-2">Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-white mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-black text-[#24CFA6] border border-[#24CFA6] focus:outline-none focus:ring-2 focus:ring-[#24CFA6]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-black text-[#24CFA6] border border-[#24CFA6] focus:outline-none focus:ring-2 focus:ring-[#24CFA6]"
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black text-[#24CFA6] border border-[#24CFA6] focus:outline-none focus:ring-2 focus:ring-[#24CFA6]"
                                placeholder="Create a password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2 text-[#24CFA6] text-xs"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-white mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black text-[#24CFA6] border border-[#24CFA6] focus:outline-none focus:ring-2 focus:ring-[#24CFA6]"
                                placeholder="Confirm your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2 text-[#24CFA6] text-xs"
                                onClick={() => setShowConfirm((v) => !v)}
                            >
                                {showConfirm ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-2 bg-[#24CFA6] cursor-pointer text-black font-semibold py-2 rounded hover:bg-[#1fae8b] transition"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-center text-white text-sm mt-2">
                    Already have an account? <a href="/login" className="underline text-[#24CFA6]">Login</a>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
