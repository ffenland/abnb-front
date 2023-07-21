import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Cafe from "./routes/Cafes/Cafe";
import NaverConfirm from "./routes/Auth/NaverConfirm";
import KakaoConfirm from "./routes/Auth/KakaoConfirm";
import CafeUpload from "./routes/Cafes/CafeUpload";
import PhotoUpload from "./routes/Cafes/PhotoUpload";
import Hello from "./routes/Welcome/Hello";
import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: "welcome",
    element: <Hello />,
  },
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
        path: "cafes/upload",
        element: <CafeUpload />,
      },
      {
        path: "cafes/:cafePk",
        element: <Cafe />,
      },
      {
        path: "cafes/:cafePk/photos",
        element: <PhotoUpload />,
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
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);
export default router;
