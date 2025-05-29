import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/login.tsx";
import Blog from './pages/Blog.tsx';
import App from "./App.tsx";
import CreateBlogForm from "./components/newBlog.tsx";
import Signup from "./components/signup.tsx";
import Profile from './pages/Profile' ;
import BlogDetail from './components/BlogDetail.tsx';
import Contact from "./components/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path:"/newblog",
    element:<CreateBlogForm />
  },
    {
    path:"/profile",
    element:<Profile />
  },
 {
  path: "/blog/title/:title",
  element: <BlogDetail />
},
 {
  path: "/contact",
  element: <Contact />
}

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <RouterProvider router={router} />
    {/* </BrowserRouter> */}
  </StrictMode>
);
