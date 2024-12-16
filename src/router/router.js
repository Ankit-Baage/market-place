import { RootLayout } from "../pages/RootLayout";
import { Authentication } from "../pages/authentication/Authentication";

import { OtpVerification } from "../pages/authentication/otpVerification/OtpVerification";
import { HomePage } from "../pages/home/homePage/HomePage";

import { Error } from "../components/error/Error";
import { ProtectedOtpRoute } from "../route-guard/auth/ProtectedOtpRoute";
import { UserProfile } from "../pages/profile/UserProfile";

import { VrpPage } from "../pages/vrp/VrpPage";
import { VrpDetailPage } from "../pages/vrp/VrpDetailPage";
import { LoginPage } from "../pages/authentication/login/LoginPage";
import { VrpListPage } from "../pages/vrpList/VrpListPage";
import { SparesPage } from "../pages/spares/SparesPage";
import { SpareListPage } from "../pages/spares/SpareListPage";
import { SpareDetailPage } from "../pages/spares/SpareDetailPage";
import { NewPhonePage } from "../pages/newPhones/NewPhonePage";
import { NewPhoneListPage } from "../pages/newPhones/NewPhoneListPage";
import { NewPhoneDetailPage } from "../pages/newPhones/newPhoneFilters/NewPhoneDetailPage";
import { OpenBoxPage } from "../pages/openBox/OpenBoxPage";
import { OpenBoxListPage } from "../pages/openBox/OpenBoxListPage";
import { OpenBoxDetailPage } from "../pages/openBox/openBoxFilters/OpenBoxDetailPage";
import { CartPage } from "../pages/cart/CartPage";
import { ProfileInfoPage } from "../pages/profileInfo/ProfileInfoPage";
import { ProfileNavigation } from "../components/profileNavigation/ProfileNavigation";
import { AddressPage, checkAuthLoader } from "../pages/address/AddressPage";
import { AddressOutlet } from "../pages/address/AddressOutlet";
import { AddressDetailPage } from "../pages/address/AddressDetailPage";
import { HelpPage } from "../pages/help/HelpPage";
import { LaterPage } from "../pages/later/LaterPage";
import { WishListPage } from "../pages/wishList/WishListPage";
import { CouponsPage } from "../pages/coupons/CouponsPage";
import { ReviewPage } from "../pages/review/ReviewPage";
import { OrdersPage } from "../pages/order/OrdersPage";

import { OrderSuccess } from "../components/orderSuccess/OrderSuccess";
import { Help } from "../components/help/Help";
import { ProfileStaticOutlet } from "../pages/profileStatic/ProfileStaticOutlet";
import { HelpCategory } from "../components/help/helpCategory/HelpCategory";
import { OtherDetails } from "../components/profileInfoStatic/OtherDetails";
import { CategoryPage } from "../pages/category/CategoryPage";


export const mainRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
          {
            path: "profile",
            element: <UserProfile />,
            loader: checkAuthLoader,
          },
          { path: "later", element: <LaterPage />, loader: checkAuthLoader },
          {
            path: "wishList",
            element: <WishListPage />,
            loader: checkAuthLoader,
          },
          {
            path: "address",
            element: <AddressOutlet />,
            loader: checkAuthLoader,
            children: [
              { index: true, element: <AddressPage /> },
              { path: ":addressId", element: <AddressDetailPage /> },
              { path: "add", element: <AddressDetailPage /> },
            ],
          },
          { path: "orders", element: <OrdersPage />, loader: checkAuthLoader },
        ],
      },

      {
        path: "cart",
        element: <CartPage />,
      },
      { path: "coupons", element: <CouponsPage /> },
      {
        path: "address",
        element: <AddressOutlet />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <AddressPage /> },
          { path: ":addressId", element: <AddressDetailPage /> },
          { path: "add", element: <AddressDetailPage /> },
        ],
      },
      { path: "review", element: <ReviewPage /> },
      { path: "success", element: <OrderSuccess /> },
      {
        path: "category",
        element: <CategoryPage />,
      },

      {
        path: "help",
        element: <HelpPage />,
        children: [
          { index: true, element: <Help /> },
          { path: ":helpCategory", element: <HelpCategory /> },
        ],
      },

      {
        path: "otherDetails",
        element: <ProfileStaticOutlet />,
        children: [{ path: ":detailCategory", element: <OtherDetails /> }],
      },
      
    ],
  },

  {
    path: "authentication",
    element: <Authentication />,

    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "otpVerification",
        element: <ProtectedOtpRoute element={<OtpVerification />} />,
      },
    ],
  },
];
