import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Cafe from "./routes/Cafe";
import NaverConfirm from "./routes/Auth/NaverConfirm";
import KakaoConfirm from "./routes/Auth/KakaoConfirm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cafes/:cafePk",
        element: <Cafe />,
      },
      {
        path: "social",
        children: [
          {
            path: "naver",
            element: <NaverConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);
export default router;
