import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
