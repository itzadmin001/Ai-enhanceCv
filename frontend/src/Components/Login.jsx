import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { MainContext } from '../MainContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { BackendUrl, SetUser, User, notify } = useContext(MainContext)

    const Navigate = useNavigate()

    useEffect(() => {
        if (User) {
            Navigate("/")
        }
    }, [User])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            identifier: e.target.identifier.value,
            password: e.target.password.value
        }
        if (!data.identifier || !data.password) {
            alert("all feilds are required")
            return;
        }
        axios.post(BackendUrl + "/user/login", data, {
            withCredentials: true
        })
            .then((success) => {
                SetUser(success.data.user)
                notify(success.data.msg, "success")
                Navigate("/")
            }).catch((err) => {
                console.log(err)
            })

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-[#0C0C0C] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-[#24CFA6] text-center mb-2">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-[#24CFA6] mb-1">Email or Username</label>
                        <input
                            type="text"
                            name="identifier"
                            className="w-full px-4 py-2 rounded bg-black text-[#24CFA6] border border-[#24CFA6] focus:outline-none focus:ring-2 focus:ring-[#24CFA6]"
                            placeholder="Enter your email or username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#24CFA6] mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="w-full px-4 py-2 rounded bg-black text-[#24CFA6] border border-[#24CFA6] focus:outline-none focus:ring-2 focus:ring-[#24CFA6]"
                                placeholder="Enter your password"
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
                    <button
                        type="submit"
                        className="mt-2 bg-[#24CFA6] text-black font-semibold py-2 rounded hover:bg-[#1fae8b] transition"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center text-[#24CFA6] text-sm mt-2">
                    Don't have an account? <a href="/signup" className="underline">Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
