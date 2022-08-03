import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { IPost } from "../redux/postSlice";
import { appState } from "../routes/LoggedInRoutes";
import Styles from "./home.module.scss";
const Post = lazy(() => import("../components/feed/Post"));

const userInfo = [
  {
    url: "https://i.picsum.photos/id/507/60/60.jpg?hmac=_c1piAsbM7w9g2s3SH6PnrTFmNUcPIWAw80JePnHnks",
    username: "iss",
    tag: "Popular",
  },
  {
    url: "https://i.picsum.photos/id/607/60/60.jpg?hmac=-CpFbGW9xAkDxWY14SOHGH5UKbSaabVMTaL562hXe1s",
    username: "tomholland2013",
    tag: "Popular",
  },
  {
    url: "https://i.picsum.photos/id/906/60/60.jpg?hmac=VsPaBYRVTwOrLj5ROg8LyXORcjX_XL092q6g3SBl2no",
    username: "tyrese",
    tag: "Followed by therock",
  },
  {
    url: "https://i.picsum.photos/id/165/60/60.jpg?hmac=5eHMBdm9t3nsZ9GtzhW7mbmT4-kTx3AAFmzywibQKc4",
    username: "kingjames",
    tag: "Followed by therock + 1 more",
  },
  {
    url: "https://i.picsum.photos/id/641/60/60.jpg?hmac=BQUvJKLx98JiS9tytQJJTNuoes_JdvU99VVVE33hn00",
    username: "mileycyrus",
    tag: "Popular",
  },
];

export const Home = () => {
  const state = useSelector((state: appState) => state);
  const { bottomBoundryRef, count } = useInfiniteScroll();
  const [posts, setPosts] = useState([] as IPost[]);

  useEffect(() => {
    console.log("setting", count);
    setPosts(state.data.posts.slice(0, count));
  }, [count, state.data.posts]);

  return (
    <main className={Styles.home_wrapper}>
      <section className={Styles.left_section}>
        <div className={Styles.posts_wrapper}>
          <Suspense fallback={<div>Loading...</div>}>
            {posts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </Suspense>
        </div>
        <div ref={bottomBoundryRef} className={Styles.ref_element} />
      </section>
      <section className={Styles.right_section}>
        <div className={Styles.user_info}>
          <div className={Styles.image_wrapper}>
            <img src={state?.auth?.user.picture} alt="avatar" />
          </div>
          <div className={Styles.nickname_wrapper}>
            <p>{state?.auth?.user.nickname}</p>
            <span>name</span>
          </div>
          <div className={Styles.account_switch}>
            <p>Switch</p>
          </div>
        </div>
        <div className={Styles.suggestions_header}>
          <p>Suggestions for you</p>
          <p>See All</p>
        </div>
        <div>
          {userInfo.map((user) => (
            <div className={Styles.suggestions_wrapper} key={user.username}>
              <div className={Styles.image_wrapper}>
                <img src={user.url} alt="avatar" />
              </div>
              <div className={Styles.nickname_wrapper}>
                <p>{user.username}</p>
                <span>{user.tag}</span>
              </div>
              <div className={Styles.follow_switch}>
                <p>Follow</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <ul className={Styles.links}>
            <li>About</li>
            <li>Help</li>
            <li>Press</li>
            <li>API</li>
            <li>Jobs</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Locations</li>
            <li>Language</li>
          </ul>
        </div>
        <p className={Styles.meta_copy}>© 2022 INSTAGRAM FROM META</p>
      </section>
    </main>
  );
};
