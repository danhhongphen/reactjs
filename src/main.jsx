import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UserPage from './pages/UserPage.jsx';
import BookPage from './pages/BookPage.jsx';
import "./styles/global.css"
import ToDoApp from './components/todo/ToDoApp.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { AuthWrapper } from './components/context/AuthContextComponent.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ToDoApp />
      },
      {
        path: "/users",
        element: <UserPage />
      },
      {
        path: "/books",
        element: <BookPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>

  //   {/* <App /> */}
  // </StrictMode>,
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

)
