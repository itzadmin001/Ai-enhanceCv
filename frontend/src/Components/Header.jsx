import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainContext } from "../MainContext"
import { MdLogin, MdOutlineLogout } from "react-icons/md";
import axios from "axios";

function Header() {
    const Navigate = useNavigate()
    const { User, BackendUrl, SetUser, notify } = useContext(MainContext)

    const isAuthenticated = Boolean(User);


    const LogoutHandler = () => {
        axios.get(BackendUrl + "/user/logout", {
            withCredentials: true
        })
            .then((success) => {
                if (success.status === 200) {
                    notify(success.data.msg, "success")
                    SetUser(null)
                }
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className="w-full p-4 bg-gray-900/50 fixed  top-0  text-white flex items-center justify-between">
            <h1 className=" font-bold text-2xl cursor-pointer">
                Enhance cv
            </h1>

            {
                isAuthenticated === true ? <div onClick={LogoutHandler} className="flex   items-center gap-1 bg-red-400 py-2 px-6 rounded-lg font-semibold  cursor-pointer hover:bg-red-500 duration-300">
                    <button  >Logout</button>
                    <MdOutlineLogout size={20} />
                </div>
                    : <div className="flex  items-center gap-1 bg-[#24CFA6] py-2 px-6 rounded-lg font-semibold  cursor-pointer hover:bg-[#146351] duration-300 ">
                        <button onClick={() => Navigate('/login')} className=" ">Login</button>
                        <MdLogin size={20} />
                    </div>

            }
        </div>
    )
}

export default Header
