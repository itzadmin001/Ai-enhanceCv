import { createBrowserRouter, RouterProvider } from "react-router-dom"
import WebsiteMain from "./Pages/WebsiteMain"
import Home from "./Pages/Home"
import AiresumeAnalyzing from "./Pages/AiresumeAnalyzing"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { MainContext } from "./MainContext"

function App() {
  const { SetUser, BackendUrl } = useContext(MainContext)


  useEffect(() => {
    axios.get(BackendUrl + "/me", {
      withCredentials: true
    }).then((success) => {
      SetUser(success.data.user)
    }).catch((err) => {

    })

  }, [])


  const route = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteMain />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/check-resume",
          element: <AiresumeAnalyzing />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ])

  return (
    <RouterProvider router={route} />
  )
}

export default App
