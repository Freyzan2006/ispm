
import { createBrowserRouter } from "react-router-dom";

import { ERouters } from "./ERouters.ts";

import App from '../App.tsx'
import { HomePage, AboutPage, SearchPage,
  LoginPage, UserPage, EditPage, DeletePage, 
  AddPage, NotFoundPage
} from "../pages/Page.ts";



const router = createBrowserRouter([
    {
      path: ERouters.APP,
      Component: App,
      children: [
        {
          path: ERouters.HOME,
          Component: HomePage
        },
  
        {
          path: ERouters.ABOUT,
          Component: AboutPage,
        },

        {
          path: ERouters.SEARCH,
          Component: SearchPage
        },

        {
          path: ERouters.LOGIN,
          Component: LoginPage
        },

        {
          path: ERouters.USER,
          Component: UserPage
        },

        {
          path: ERouters.EDIT,
          Component: EditPage
        },

        {
          path: ERouters.DELETE,
          Component: DeletePage
        },

        {
          path: ERouters.ADD,
          Component: AddPage
        },

        {
          path: ERouters.NotFoundPage,
          Component: NotFoundPage
        }
      ]
    },
]);

export default router;