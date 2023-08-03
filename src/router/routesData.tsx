import SearchContainer from "../containers/SearchContainer"
import NotFound from "../components/NotFound"

export type RouteType = {
  title: string
  path: string
  element: JSX.Element
}

const routesData: Array<RouteType> = [
  {
    path: "/",
    element: <SearchContainer />,
    title: "Github Search",
  },
  {
    path: "*",
    element: <NotFound />,
    title: "404 - Page Not Found",
  },
]

export default routesData
