import React from "react";
import { createRoot } from "react-dom/client";

import { store } from "@/infrastructure/store/index.ts";
import { Provider } from "react-redux";
import RouteProvider from "./presentation/Router";
import "@/presentation/components/styles/globals.scss"
const deferRender = async () => {
  if (import.meta.env.VITE_ENABLE_MSW === "false") {
    return;
  }
  const { browserWorker } = await import("@/__tests__/msw/browser");
  return browserWorker.start();
};
deferRender().then(() => {
 createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouteProvider />
      </Provider>
    </React.StrictMode>,
  );
});
