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

import { VrpPage } from "./pages/vrp/VrpPage";
import { VrpDetailPage } from "./pages/vrp/VrpDetailPage";
import { LoginPage } from "./pages/authentication/login/LoginPage";
import { VrpListPage } from "./pages/vrpList/VrpListPage";
import { SparesPage } from "./pages/spares/SparesPage";
import { SpareListPage } from "./pages/spares/SpareListPage";
import { SpareDetailPage } from "./pages/spares/SpareDetailPage";
import { NewPhonePage } from "./pages/newPhones/NewPhonePage";
import { NewPhoneListPage } from "./pages/newPhones/NewPhoneListPage";
import { NewPhoneDetailPage } from "./pages/newPhones/newPhoneFilters/NewPhoneDetailPage";
import { OpenBoxPage } from "./pages/openBox/OpenBoxPage";
import { OpenBoxListPage } from "./pages/openBox/OpenBoxListPage";
import { OpenBoxDetailPage } from "./pages/openBox/openBoxFilters/OpenBoxDetailPage";
import { CartPage } from "./pages/cart/CartPage";
import { ProfileInfoPage } from "./pages/profileInfo/ProfileInfoPage";
import { ProfileNavigation } from "./components/profileInfo/ProfileNavigation";
import { AddressPage } from "./pages/address/AddressPage";
import { AddressOutlet } from "./pages/address/AddressOutlet";
import { AddressDetailPage } from "./pages/address/AddressDetailPage";
import { HelpPage } from "./pages/help/HelpPage";
import { CategoryPage } from "./pages/category/CategoryPage";
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
            element: <VrpPage />,
            children: [
              { index: true, element: <VrpListPage /> },
              { path: ":requestId", element: <VrpDetailPage /> },
            ],
          },
          {
            path: "spares",
            element: <SparesPage />,
            children: [
              { index: true, element: <SpareListPage /> },
              { path: ":requestId", element: <SpareDetailPage /> },
            ],
          },
          {
            path: "newPhone",
            element: <NewPhonePage />,
            children: [
              { index: true, element: <NewPhoneListPage /> },
              { path: ":requestId", element: <NewPhoneDetailPage /> },
            ],
          },
          {
            path: "openBox",
            element: <OpenBoxPage />,
            children: [
              { index: true, element: <OpenBoxListPage /> },
              { path: ":requestId", element: <OpenBoxDetailPage /> },
            ],
          },

          {
            path: "profileInfo",
            element: <ProfileInfoPage />,
            children: [
              { index: true, element: <ProfileNavigation /> },
              { path: "profile", element: <UserProfile /> },
              {
                path: "address",
                element: <AddressOutlet />,
                children: [
                  { index: true, element: <AddressPage /> },
                  { path: ":addressId", element: <AddressDetailPage /> },
                  { path: "add", element: <AddressDetailPage /> },
                ],
              },
            ],
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "help",
            element: <HelpPage />,
          },
          { path: "cart", element: <CartPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
