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

import ProfilePage from "../page/profile.page";

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
import OrderDetailsPage from "../page/orderDeatils.page";

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
    path: "/dashboard/events",
    element: (
      <PrivateRouter>
        <AllEventsPage />,
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
    path: "/dashboard/orders",
    element: (
      <OwnerRouter>
        <MyOrdersPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/dashboard/products/new",
    element: (
      <OwnerRouter>
        <CreateOrderPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/products/:id",
    element: (
      <PrivateRouter>
        <OrderDetailsPage />,
      </PrivateRouter>
    ),
  },
  {
    path: "/dashboard/events/new",
    element: (
      <OwnerRouter>
        <CreateEventPage />,
      </OwnerRouter>
    ),
  },

  {
    path: "/events",
    element: (
      <OwnerRouter>
        <EventPage />
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
    path: "/*",
    element: <Navigate to={"/"} />,
  },
]);

const IndexRouter: FC<PropsWithChildren<{}>> = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default IndexRouter;
