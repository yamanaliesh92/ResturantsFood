import { FC, PropsWithChildren } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllCouponesPage from "../page/allCoupone.page";
import AllEventsPage from "../page/allEvents.page";
import BestSellingPage from "../page/bestSelling.page";
import CreateEventPage from "../page/createEventPage";
import EventPage from "../page/event.page";
import FaqPage from "../page/faq.page";
import Homepage from "../page/Home.page";

import ProductPage from "../page/order.page";
import ProductDetailsPage from "../page/productDeatils.page";
import ProfilePage from "../page/profile.page";

import ShopCreatePage from "../page/shopCreate.page";
import ShopCreateProductPage from "../page/shopCreateProduct.page";
import ShopDashboardPage from "../page/shopDashboradPage";
import ShopHomePage from "../page/shopHome.page";
import AddressPage from "../page/address.page";
import ChangePasswordPage from "../page/changePassword.page";
import AuthPage from "../page/auth.page";
import PublicRouter from "./public.router";
import PrivateRouter from "./private.router";
import CreateRestaurantPage from "../page/create-restaurant.page";

import MyOrdersPage from "../page/my-orders.page";
import OrderCategoryPage from "../page/order.page";
import RestaurantPage from "../page/restaurant.page";
import RestaurantInfoPage from "../page/restuarantInfo.page";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicRouter>
        <AuthPage />,
      </PublicRouter>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Homepage />,
      </PrivateRouter>
    ),
  },
  {
    path: "/orders",
    element: <OrderCategoryPage />,
  },

  {
    path: "/create-restaurant",
    element: <CreateRestaurantPage />,
  },

  {
    path: "/best-selling",
    element: <BestSellingPage />,
  },

  {
    path: "/events",
    element: <EventPage />,
  },

  {
    path: "/faq",
    element: <FaqPage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailsPage />,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },

  {
    path: "/shop-cart",
    element: <ShopCreatePage />,
  },

  {
    path: "/restaurant/:id",
    element: <RestaurantPage />,
  },

  {
    path: "/dashboard",
    element: <ShopDashboardPage />,
  },
  {
    path: "/dashboard/resInfo",
    element: <RestaurantInfoPage />,
  },

  {
    path: "/dashboard-allOrder",
    element: <MyOrdersPage />,
  },

  {
    path: "/shop",
    element: <ShopHomePage />,
  },
  {
    path: "/dashboard-createProduct",
    element: <ShopCreateProductPage />,
  },

  {
    path: "/dashboard-createEvent",
    element: <CreateEventPage />,
  },
  {
    path: "/dashboard-allEvents",
    element: <AllEventsPage />,
  },
  {
    path: "/dashboard-Coupon",
    element: <AllCouponesPage />,
  },

  {
    path: "/dashboard-address",
    element: <AddressPage />,
  },
  {
    path: "/dashboard-changePassword",
    element: <ChangePasswordPage />,
  },
]);

const IndexRouter: FC<PropsWithChildren<{}>> = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default IndexRouter;
