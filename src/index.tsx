import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { persistor, store } from "./app/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import NotFound from "./components/NotFound"
import ThemeProvider from "./components/ThemeProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
