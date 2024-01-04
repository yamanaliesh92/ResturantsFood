import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import IndexRouter from "./router/index.router";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProviderContext } from "./context/user.context";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/to-top/scroleToTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ScrollToTop />
      <ProviderContext>
        <IndexRouter>
          <ToastContainer position={"top-center"} />
          <App />
        </IndexRouter>
      </ProviderContext>
    </Provider>
  </React.StrictMode>
);
