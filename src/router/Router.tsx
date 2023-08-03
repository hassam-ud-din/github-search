import { Route, Routes } from "react-router-dom"
import routes, { RouteType } from "./routesData"

const Router = () => {
  const pageRoutes = routes.map(({ path, title, element }: RouteType) => {
    return <Route key={title} path={`/${path}`} element={element} />
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router
