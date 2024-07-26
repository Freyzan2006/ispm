
import { createBrowserRouter } from "react-router-dom";



import App from '../App.tsx'
import HomePage from '../Pages/HomePage/HomePage.tsx';
import AboutPage from "../Pages/AboutPage/AboutPage.tsx";
import SearchPage from "../Pages/SearchPage/SearchPage.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";


const router = createBrowserRouter([
    {
      path: "*",
      Component: App,
      children: [
        {
          path: "",
          Component: HomePage
        },
  
        {
          path: "about",
          Component: AboutPage,
        },

        {
          path: "search",
          Component: SearchPage
        },

        {
          path: "login",
          Component: LoginPage
        }
      ]
    },
]);

export default router;