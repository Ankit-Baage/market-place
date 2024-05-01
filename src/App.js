import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./pages/RootLayout";
import { Authentication } from "./pages/authentication/Authentication";

import { OtpVerification } from "./pages/authentication/otpVerification/OtpVerification";
import { DevTool } from "@hookform/devtools";
import { HomePage } from "./pages/home/homePage/HomePage";

import { Home } from "./pages/home/Home";
import { Error } from "./components/error/Error";
import { ProtectedOtpRoute } from "./route-guard/auth/ProtectedOtpRoute";
import { UserProfile } from "./pages/home/profile/UserProfile";
import "./App.css";


import { Vrp } from "./pages/vrp/Vrp";
import { VrpDetailPage } from "./pages/vrp/VrpDetailPage";
import { LoginPage } from "./pages/authentication/login/LoginPage";
import { VrpListPage } from "./pages/vrpList/VrpListPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Authentication />,

        children: [
          { index: true, element: <LoginPage /> },
          {
            path: "otpVerification",
            element: <ProtectedOtpRoute element={<OtpVerification />} />,
          },
        ],
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "vrp",
            element: <Vrp />,
            children: [{ index: true, element: <VrpListPage /> },
            { path: ":requestId", element: <VrpDetailPage /> }],
          },

          { path: "profile", element: <UserProfile /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
