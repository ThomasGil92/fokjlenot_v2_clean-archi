
import { render } from "@testing-library/react";
// import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

// import { setupStore } from "@/infrastructure/store";
// import type { AppStore, RootState } from "@/infrastructure/store";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routesConfig } from "@/presentation/Router";
import { InitialEntry } from "@remix-run/router";
import { store } from "@/infrastructure/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
//   preloadedState?: Partial<RootState>;
//   store?: AppStore;
// }

export function renderWithProviders(
  path: InitialEntry="/",
  routes = routesConfig,
  // {
  //   preloadedState = {},
  //   // Automatically create a store instance if no store was passed in
  //   store = setupStore(preloadedState),
  //   ...renderOptions
  // }: ExtendedRenderOptions = {},
) {
  const router = createMemoryRouter([...routes], {
    initialEntries: [path],
    initialIndex: 1,
  });
  function Wrapper(): JSX.Element {
    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }
  return { store, ...render(Wrapper()),router };
}
