import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
const MainContext = createContext()

function Main(props) {
    const [ResumeData, SetResumeData] = useState(null)
    const [User, SetUser] = useState(null)

    const BackendUrl = import.meta.env.VITE_BACKEND_URL;


    const notify = (msg, flag) => toast(msg, {
        type: flag,
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });






    return (
        <MainContext.Provider value={{ ResumeData, SetResumeData, User, BackendUrl, SetUser, notify }}>
            <ToastContainer />
            {props.children}
        </MainContext.Provider>
    )
}

export default Main
export { MainContext }