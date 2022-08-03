import "./App.scss";
import { Signup } from "./pages/Signup";
import { Routes, Route} from "react-router-dom";
import { Login } from "./pages/Login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";
import {
  getUserWithRefreshToken,
  isAuthenticated,
  webAuth,
} from "./auth0/auth0";
import { LoggedInRoutes } from "./routes/LoggedInRoutes";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Loader } from "./components/loader/Loader";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function authenticate() {
      const isUserAuthenticated = isAuthenticated();
      // let authResult;
      if (isUserAuthenticated) {
        const refreshTokenResponse = await getUserWithRefreshToken();
        webAuth.client.userInfo(
          refreshTokenResponse.access_token,
          async (err: any, result: any) => {
            if (err) {
              console.error("Something went wrong: ", err);
              setIsLoading(false);
              return;
            }
            // authResult = { ...refreshTokenResponse, ...result };
            dispatch(login(result));
            setTimeout(() => {
              setIsLoading(false);
            }, 0);
          }
        );
      } else {
        setIsLoading(false);
      }
    }
    authenticate();
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route path="/" element={<Home />} />
            {["/:username", "/:username/saved", "/:username/tagged"].map(
              (path) => (
                <Route key={path} path={path} element={<Profile />} />
              )
            )}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accounts/password/reset" element={<ForgotPassword />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
