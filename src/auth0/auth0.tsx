import auth0 from "auth0-js";
import axios from "axios";

export const webAuth = new auth0.WebAuth({
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
  responseType: `${process.env.REACT_APP_AUTH0_RESPONSE_TYPE}`,
  redirectUri: `${process.env.REACT_APP_REDIRECT_URL}`,
  responseMode: `${process.env.REACT_APP_AUTH0_RESPONSE_MODE}`,
  scope: "openid profile email offline_access",
});

export const isAuthenticated = () => {
  const date = sessionStorage.getItem("expiresAt");
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (date && refreshToken) {
    const expiresAt = JSON.parse(date);
    if (!refreshToken || new Date().getTime() > expiresAt) {
      console.log("storage cleared");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("expiresAt");
      return false;
    }
    return true;
  }
  return false;
};

export const getUserWithRefreshToken = async () => {
  const response = await axios.post(
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
    {
      grant_type: "refresh_token",
      client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      refresh_token: sessionStorage.getItem("refreshToken"),
      client_secret: `${process.env.REACT_APP_AUTH0_CLIENT_SECRET}`,
    },
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(response.data);
  return response.data;
};