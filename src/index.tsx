import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { persistor, store } from "./app/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <p>404 - Page Not Found</p>,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
