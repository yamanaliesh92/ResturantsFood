import { FC, PropsWithChildren } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AllEventsPage from "../page/allEvents.page";
import BestSellingPage from "../page/bestSelling.page";
import CreateEventPage from "../page/createEventPage";
import EventPage from "../page/event.page";

import Homepage from "../page/Home.page";

import ProductDetailsPage from "../page/productDeatils.page";
import ProfilePage from "../page/profile.page";

import ShopDashboardPage from "../page/DashboradPage";

import ChangePasswordPage from "../page/changePassword.page";
import AuthPage from "../page/auth.page";
import PublicRouter from "./public.router";
import PrivateRouter from "./private.router";
import CreateRestaurantPage from "../page/create-restaurant.page";

import MyOrdersPage from "../page/my-orders.page";
import OrderCategoryPage from "../page/order.page";
import RestaurantPage from "../page/restaurant.page";
import RestaurantInfoPage from "../page/restuarantInfo.page";
import OwnerRouter from "./owner.router";
import CreateOrderPage from "../page/CreateOrder.page";
import OrdersPage from "../page/bestSelling.page";

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
    element: (
      <PrivateRouter>
        <OrderCategoryPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/products",
    element: (
      <PrivateRouter>
        <OrdersPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/create-restaurant",
    element: (
      <PrivateRouter>
        <CreateRestaurantPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/best-selling",
    element: (
      <PrivateRouter>
        <BestSellingPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/events",
    element: (
      <PrivateRouter>
        <EventPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/products/:id",
    element: (
      <PrivateRouter>
        <ProductDetailsPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/profile",
    element: (
      <PrivateRouter>
        <ProfilePage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/restaurant/:id",
    element: (
      <PrivateRouter>
        <RestaurantPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <OwnerRouter>
        <ShopDashboardPage />,
      </OwnerRouter>
    ),
  },
  {
    path: "/dashboard/resInfo",
    element: (
      <OwnerRouter>
        <RestaurantInfoPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/dashboard-allOrder",
    element: (
      <OwnerRouter>
        <MyOrdersPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/dashboard-createProduct",
    element: (
      <OwnerRouter>
        <CreateOrderPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/dashboard-createEvent",
    element: (
      <OwnerRouter>
        <CreateEventPage />,
      </OwnerRouter>
    ),
  },
  {
    path: "/dashboard-allEvents",
    element: (
      <OwnerRouter>
        <AllEventsPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/dashboard-changePassword",
    element: (
      <PrivateRouter>
        <ChangePasswordPage />,
      </PrivateRouter>
    ),
  },

  {
    path: "/*",
    element: <Navigate to={"/"} />,
  },
]);

const IndexRouter: FC<PropsWithChildren<{}>> = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default IndexRouter;
