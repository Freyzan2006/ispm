
import { createBrowserRouter } from "react-router-dom";



import App from '../App.tsx'
import HomePage from '../Pages/HomePage/HomePage.tsx';
import AboutPage from "../Pages/AboutPage/AboutPage.tsx";
import SearchPage from "../Pages/SearchPage/SearchPage.tsx";
import LoginPage from "../Pages/LoginPage/LoginPage.tsx";
import UserPage from "../Pages/UserPage/UserPage.tsx";
import EditPage from "../Pages/EditPage/EditPage.tsx";
import DeletePage from "../Pages/DeletePage/DeletePage.tsx";


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
        },

        {
          path: "user",
          Component: UserPage
        },

        {
          path: "change/:id",
          Component: EditPage
        },

        {
          path: "delete/:id",
          Component: DeletePage
        }
      ]
    },
]);

export default router;