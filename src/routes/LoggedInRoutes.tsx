import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { CreatePost } from "../components/create-post/CreatePost";
import { Navbar } from "../components/navigation/navbar";
import { Login } from "../pages/Login";
import { IPost } from "../redux/postSlice";

export interface appState {
  auth: {
    user: {
      sub: string;
      name: string;
      nickname: string;
      picture: string;
      updated_at: string;
      email: string;
      email_verified: string;
    };
  };

  data: { posts: IPost[] };
}

export const LoggedInRoutes = () => {
  const user = useSelector((state: appState) => state?.auth?.user);
  const [createPostModal, setCreatePostModal] = useState(false);
  return user ? (
    <>
      <Navbar toggleModal={setCreatePostModal} />
      {createPostModal && <CreatePost toggleModal={setCreatePostModal} />}
      <Outlet />
    </>
  ) : (
    <Login />
  );
};
