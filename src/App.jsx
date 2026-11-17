import Students from "./assets/login.jsx"
import Home from "./assets/home.jsx"
import AddStudent from "./assets/context.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/add", element: <AddStudent /> },
    { path: "/students", element: <Students /> },
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App