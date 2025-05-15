import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/login.tsx";
import Blog from './pages/Blog.tsx';
import App from "./App.tsx";

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
    path: "/blog",
    element: <Blog />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <RouterProvider router={router} />
    {/* </BrowserRouter> */}
  </StrictMode>
);
